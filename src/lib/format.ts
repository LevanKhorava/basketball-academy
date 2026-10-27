// Hand-rolled Georgian date formatting: Intl's "ka" locale silently falls
// back to English in some browsers, and every user-facing string must be
// Georgian, so the month names are spelled out here deterministically.
const GEORGIAN_MONTHS = [
  "იან",
  "თებ",
  "მარ",
  "აპრ",
  "მაი",
  "ივნ",
  "ივლ",
  "აგვ",
  "სექ",
  "ოქტ",
  "ნოე",
  "დეკ",
] as const;

/** "26 ოქტ. 2026, 19:40" (local time, 24-hour clock). */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${date.getDate()} ${GEORGIAN_MONTHS[date.getMonth()]}. ${date.getFullYear()}, ${hours}:${minutes}`;
}
