// ---------------------------------------------------------------------------
// Demo data for the /admin dashboard while Supabase is NOT configured.
// Activates only when src/config.ts has USE_DEV_MOCKS = true AND no Supabase
// credentials; a prominent banner marks the mode. Nothing is ever saved, and
// the public registration form never touches this module — submitting while
// unconfigured returns an honest error, not a fake success.
// ---------------------------------------------------------------------------

import { isSupabaseConfigured } from "./supabaseClient";
import { USE_DEV_MOCKS } from "../config";
import { mockApplications } from "../data/mockApplications";
import type { Application, ApplicationStatus } from "./applicationsApi";

export const devMocksEnabled: boolean = !isSupabaseConfigured && USE_DEV_MOCKS;

// In-memory store (admin reads/mutations only; resets on reload).
let mockRows: Application[] | null = null;

const seed = (): Application[] => mockApplications.map((row) => ({ ...row }));

export const mockApplicationsStore = {
  list(): Application[] {
    if (!mockRows) mockRows = seed();
    return mockRows.map((row) => ({ ...row }));
  },
  updateStatus(id: string, status: ApplicationStatus): boolean {
    if (!mockRows) mockRows = seed();
    const row = mockRows.find((item) => item.id === id);
    if (!row) return false;
    row.status = status;
    row.updatedAt = new Date().toISOString();
    return true;
  },
  remove(id: string): boolean {
    if (!mockRows) mockRows = seed();
    const before = mockRows.length;
    mockRows = mockRows.filter((item) => item.id !== id);
    return mockRows.length < before;
  },
};
