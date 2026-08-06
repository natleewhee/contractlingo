import { useSyncExternalStore } from "react";

export type Progress = {
  streak: number;
  totalCleared: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
};

const STORAGE_KEY = "contractlingo:progress";

const DEFAULT_PROGRESS: Progress = {
  streak: 0,
  totalCleared: 0,
  lastCompletedDate: null,
};

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function todayKey(): string {
  return dateKey(new Date());
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

// Cached snapshot so repeated reads return the same object reference when
// the underlying storage hasn't changed - required for useSyncExternalStore,
// which otherwise treats a fresh object on every call as a change and loops.
let cachedRaw: string | null | undefined;
let cachedProgress: Progress = DEFAULT_PROGRESS;

function readSnapshot(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedProgress;
  cachedRaw = raw;
  try {
    cachedProgress = raw ? { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } : DEFAULT_PROGRESS;
  } catch {
    cachedProgress = DEFAULT_PROGRESS;
  }
  return cachedProgress;
}

function getServerSnapshot(): Progress {
  return DEFAULT_PROGRESS;
}

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);
}

// Call once when a session's Recap screen is reached. Bumps the streak by
// one calendar day (never more than once per day) and adds to the running
// total of cases faced.
export function recordSessionComplete(clearedCount: number): Progress {
  const current = readSnapshot();
  const today = todayKey();

  let streak = current.streak;
  if (current.lastCompletedDate === today) {
    // Already logged a session today - streak doesn't move twice in a day.
  } else if (current.lastCompletedDate === yesterdayKey()) {
    streak += 1;
  } else {
    streak = 1;
  }

  const next: Progress = {
    streak,
    totalCleared: current.totalCleared + clearedCount,
    lastCompletedDate: today,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  cachedRaw = JSON.stringify(next);
  cachedProgress = next;
  emitChange();
  return next;
}
