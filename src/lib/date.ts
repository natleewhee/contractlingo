// Singapore-local calendar dates for streak/activity tracking. PSSCOC /
// Singapore is this app's home market, and computing "today" from raw UTC
// (new Date().toISOString().slice(0, 10)) meant anyone practising before
// ~8am local time got their session attributed to the wrong calendar day -
// see docs/solutions/ for the streak-freeze and weekly-heatmap bugs this
// replaced.
export const APP_TIMEZONE = "Asia/Singapore";

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: APP_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// "en-CA" formats as YYYY-MM-DD directly - no manual reassembly needed.
export function dateKeyInAppTimezone(date: Date): string {
  return dateKeyFormatter.format(date);
}

export function todayKey(): string {
  return dateKeyInAppTimezone(new Date());
}

export function daysAgoKey(days: number): string {
  return dateKeyInAppTimezone(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
}
