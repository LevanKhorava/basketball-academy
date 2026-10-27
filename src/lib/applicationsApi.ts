import { supabase } from "./supabaseClient";
import { devMocksEnabled, mockApplicationsStore } from "./devMode";
import { normalizePhone } from "./validation";
import { normalizeYoutubeUrl, parseYoutubeVideoId } from "./youtube";
import { content } from "../data/content";

export type ApplicationStatus = "pending" | "reviewing" | "reviewed";

export const APPLICATION_STATUSES: readonly ApplicationStatus[] = [
  "pending",
  "reviewing",
  "reviewed",
];

/** Row shape as stored in Postgres (snake_case, mirrors schema.sql). */
interface ApplicationRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  youtube_url: string;
  youtube_video_id: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  youtubeUrl: string;
}

/** Every api call resolves (never throws); `message` is user-ready Georgian. */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

const toApplication = (row: ApplicationRow): Application => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  phone: row.phone,
  youtubeUrl: row.youtube_url,
  youtubeVideoId: row.youtube_video_id,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

interface ErrorLike {
  code?: string;
  message?: string;
}

const asErrorLike = (error: unknown): ErrorLike =>
  typeof error === "object" && error !== null ? (error as ErrorLike) : {};

/** Maps Supabase/network failures onto the Georgian strings users see. */
function toGeorgianMessage(error: unknown, scope: "submit" | "admin"): string {
  console.error(`[applications:${scope}] request failed:`, error);
  const submit = scope === "submit";
  const s = content.form.submitErrors;
  const a = content.admin.errors;

  const { code = "", message = "" } = asErrorLike(error);
  const text = `${message} ${error instanceof Error ? error.message : ""}`.toLowerCase();

  if (
    text.includes("failed to fetch") ||
    text.includes("networkerror") ||
    text.includes("fetch failed") ||
    text.includes("load failed")
  ) {
    return submit ? s.network : a.network;
  }
  // Postgres: check violation / not-null / value too long / invalid syntax / unique.
  if (["23514", "23502", "22001", "22P02", "23505"].includes(code)) {
    return submit ? s.validation : a.generic;
  }
  if (code === "42501" || text.includes("row-level security") || text.includes("permission denied")) {
    return submit ? s.generic : a.permission;
  }
  if (code === "PGRST301" || text.includes("jwt")) {
    return submit ? s.generic : a.session;
  }
  return submit ? s.generic : a.generic;
}

/**
 * Public submission. Succeeds ONLY when the database confirms the insert —
 * the success modal must never show otherwise. Never uses dev mocks.
 */
export async function submitApplication(input: ApplicationInput): Promise<ApiResult<null>> {
  if (!supabase) {
    return { ok: false, message: content.form.submitErrors.notConfigured };
  }

  const videoId = parseYoutubeVideoId(input.youtubeUrl);
  if (!videoId) {
    return { ok: false, message: content.form.errors.youtubeInvalid };
  }

  const row = {
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: normalizePhone(input.phone.trim()),
    youtube_url: normalizeYoutubeUrl(input.youtubeUrl),
    youtube_video_id: videoId,
  };

  try {
    // NOTE: no `.select()` here — anon has no SELECT grant/policy, so asking
    // for the inserted row back would make a successful insert look like a
    // failure. Without it supabase-js sends `Prefer: return=minimal`.
    const { error } = await supabase.from("applications").insert(row);
    if (error) return { ok: false, message: toGeorgianMessage(error, "submit") };
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, message: toGeorgianMessage(error, "submit") };
  }
}

/** Admin: list all applications, newest first. */
export async function listApplications(): Promise<ApiResult<Application[]>> {
  if (devMocksEnabled) {
    return { ok: true, data: mockApplicationsStore.list() };
  }
  if (!supabase) {
    return { ok: false, message: content.admin.errors.notConfigured };
  }
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return { ok: false, message: toGeorgianMessage(error, "admin") };
    return { ok: true, data: ((data ?? []) as ApplicationRow[]).map(toApplication) };
  } catch (error) {
    return { ok: false, message: toGeorgianMessage(error, "admin") };
  }
}

/** Admin: change an application's status (the only column admins may update). */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<ApiResult<null>> {
  if (devMocksEnabled) {
    return mockApplicationsStore.updateStatus(id, status)
      ? { ok: true, data: null }
      : { ok: false, message: content.admin.errors.notFound };
  }
  if (!supabase) {
    return { ok: false, message: content.admin.errors.notConfigured };
  }
  try {
    // Only `status` is sent — the column-level grant in schema.sql rejects
    // any other column, even with a valid admin session.
    const { error, count } = await supabase
      .from("applications")
      .update({ status }, { count: "exact" })
      .eq("id", id);
    if (error) return { ok: false, message: toGeorgianMessage(error, "admin") };
    if (!count) return { ok: false, message: content.admin.errors.notFound };
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, message: toGeorgianMessage(error, "admin") };
  }
}

/** Admin: delete an application (does not affect the video on YouTube). */
export async function deleteApplication(id: string): Promise<ApiResult<null>> {
  if (devMocksEnabled) {
    return mockApplicationsStore.remove(id)
      ? { ok: true, data: null }
      : { ok: false, message: content.admin.errors.notFound };
  }
  if (!supabase) {
    return { ok: false, message: content.admin.errors.notConfigured };
  }
  try {
    const { error, count } = await supabase
      .from("applications")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) return { ok: false, message: toGeorgianMessage(error, "admin") };
    if (!count) return { ok: false, message: content.admin.errors.notFound };
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, message: toGeorgianMessage(error, "admin") };
  }
}
