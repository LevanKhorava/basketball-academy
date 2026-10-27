import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../config";

// Settings are hardcoded in src/config.ts (by request). The publishable key
// is safe to ship in the bundle; data rules live in supabase/schema.sql.
const isUsableUrl = (value: string): boolean => /^https:\/\/.+/i.test(value.trim());

function createSupabaseClient(): SupabaseClient | null {
  if (!isUsableUrl(SUPABASE_URL) || !SUPABASE_PUBLISHABLE_KEY.trim()) {
    return null;
  }
  try {
    return createClient(SUPABASE_URL.trim(), SUPABASE_PUBLISHABLE_KEY.trim());
  } catch (error) {
    console.error("[supabase] client could not be created:", error);
    return null;
  }
}

/** `null` while src/config.ts has no credentials — callers handle that state. */
export const supabase = createSupabaseClient();

export const isSupabaseConfigured = supabase !== null;
