// ===========================================================================
// ყველა კონფიგურაცია ერთ ადგილას / All configuration, hardcoded by request.
//
// SUPABASE — paste your values here (Supabase Dashboard → Project Settings →
// API):
//   * SUPABASE_URL              → "Project URL"  (https://xxxx.supabase.co)
//   * SUPABASE_PUBLISHABLE_KEY  → "publishable" key (sb_publishable_…);
//                                 the legacy "anon public" key also works.
// Leave both empty until you have them — the site then runs in a graceful
// "not configured" mode and never fakes a successful submission.
//
// NOTE: everything in this file ships inside the public JS bundle. The
// publishable key is designed for that; the admin credentials are NOT a
// real security boundary (see README → Security).
// ===========================================================================

export const SUPABASE_URL = "https://hhnsvdilwehavpgijwcp.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1Q2b6rSUZo9bR68V8GF5Ng_3U0GudPj";

// /admin login (static, checked in the browser).
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin123";

// While Supabase is NOT configured, show clearly-labelled demo data in /admin
// so the dashboard can be previewed. Auto-disables once Supabase is set up.
export const USE_DEV_MOCKS = true;
