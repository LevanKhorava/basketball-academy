// ---------------------------------------------------------------------------
// Static admin access (by request): the /admin gate compares the typed
// credentials with the constants in src/config.ts and remembers the unlock in
// sessionStorage (cleared when the browser tab closes, or via logout).
//
// LIMITATION, documented on purpose: this check runs entirely in the browser,
// so it protects the UI only — anyone can read the credentials in the bundle.
// Whatever the `applications` table allows for key-holders is defined in
// supabase/schema.sql, not here. See README → Security.
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from "react";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../config";
import { content } from "../data/content";

const SESSION_KEY = "bf.admin.session";

let listeners: Array<() => void> = [];
const notify = () => {
  for (const listener of listeners) listener();
};

const subscribe = (callback: () => void): (() => void) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
};

const isUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

/** Reactive unlock state; survives refreshes within the same browser tab. */
export function useAdminUnlocked(): boolean {
  return useSyncExternalStore(subscribe, isUnlocked);
}

export function signInAdmin(
  username: string,
  password: string,
): { ok: true } | { ok: false; message: string } {
  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage unavailable (private mode etc.) — unlock just won't survive
      // a refresh.
    }
    notify();
    return { ok: true };
  }
  return { ok: false, message: content.admin.login.invalidCredentials };
}

export function signOutAdmin(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  notify();
}
