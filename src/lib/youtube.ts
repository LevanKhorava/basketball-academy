// Strict YouTube URL handling. Unlike a loose "take the last path segment"
// parser, this one only trusts an exact hostname allowlist and a strict
// 11-character video-id format, so arbitrary external URLs never end up in an
// embed iframe. Keep the allowlist in sync with the youtube_url CHECK
// constraint in supabase/schema.sql.

export const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
]);

const PATH_PREFIXES = new Set(["shorts", "embed", "live", "v"]);

/**
 * Accepts the common YouTube link shapes (extra query params, hashes and a
 * missing scheme are fine) and returns the 11-char video id, or null:
 *   youtube.com/watch?v=<id>     youtube.com/shorts/<id>
 *   youtube.com/embed/<id>       youtube.com/live/<id>
 *   youtu.be/<id>[?t=...]        m.youtube.com/watch?v=<id>
 */
export function parseYoutubeVideoId(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (!YOUTUBE_HOSTS.has(host)) return null;

  const candidates: string[] = [];
  const fromQuery = url.searchParams.get("v");
  if (fromQuery) candidates.push(fromQuery);

  const segments = url.pathname.split("/").filter(Boolean);
  if (host.endsWith("youtu.be")) {
    if (segments[0]) candidates.push(segments[0]);
  } else if (segments.length >= 2 && PATH_PREFIXES.has(segments[0])) {
    candidates.push(segments[1]);
  }

  for (const candidate of candidates) {
    if (YOUTUBE_ID_RE.test(candidate)) return candidate;
  }
  return null;
}

export const isValidYoutubeUrl = (raw: string): boolean =>
  parseYoutubeVideoId(raw) !== null;

/** The stored form of the link: trimmed and https-prefixed. */
export function normalizeYoutubeUrl(raw: string): string {
  const value = raw.trim();
  if (/^https:\/\//i.test(value)) return value;
  if (/^http:\/\//i.test(value)) return `https://${value.slice("http://".length)}`;
  return `https://${value}`;
}

export const embedUrl = (videoId: string, opts?: { autoplay?: boolean }): string =>
  `https://www.youtube.com/embed/${videoId}?rel=0${opts?.autoplay ? "&autoplay=1" : ""}`;

export const thumbnailUrl = (videoId: string): string =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

export const watchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;
