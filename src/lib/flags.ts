export type Flag = {
  questionId: string;
  reason: string;
  createdAt: string;
};

const STORAGE_KEY = "contractlingo:flags";

// Best-effort local record of "report this case" taps. No backend yet, so
// this is just enough to not lose the signal before Supabase/Postgres is
// wired up - inspect via localStorage until then.
export function recordFlag(questionId: string, reason: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const flags: Flag[] = raw ? JSON.parse(raw) : [];
    flags.push({ questionId, reason, createdAt: new Date().toISOString() });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    // Storage can fail (private browsing, quota) - flagging is best-effort,
    // never worth breaking the session over.
  }
}
