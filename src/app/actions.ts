"use server";

import { cookies } from "next/headers";
import * as db from "@/lib/db";
import { getUserId, USER_ID_COOKIE } from "@/lib/identity";

const ID_PATTERN = /^[a-zA-Z0-9_-]{3,40}$/;
const ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years, matches proxy.ts's initial assignment

// Names nobody should be able to claim or resume as - "default" especially,
// since it's the id proxy.ts silently migrates the original single-user
// owner's browser onto. Checked case-insensitively against both the rename
// and resume flows: renaming *to* one of these would let a stranger claim
// it going forward, and resuming *as* one would hand over whoever's data
// already lives there today.
const RESERVED_IDS = new Set([
  "default",
  "admin",
  "administrator",
  "root",
  "system",
  "support",
  "help",
  "test",
  "user",
  "guest",
  "null",
  "undefined",
  "owner",
]);

async function setUserIdCookie(id: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_ID_COOKIE, id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ID_COOKIE_MAX_AGE,
    path: "/",
  });
}

// Renames the current visitor's id, migrating their existing data to it.
// Rejected if the id is already in use by someone else - use resumeUserId
// to deliberately switch a browser onto an id you already own instead.
export async function changeUserId(newIdRaw: string): Promise<{ ok: boolean; error?: string }> {
  const newId = newIdRaw.trim();
  if (!ID_PATTERN.test(newId)) {
    return { ok: false, error: "Use 3-40 letters, numbers, - or _" };
  }
  if (RESERVED_IDS.has(newId.toLowerCase())) {
    return { ok: false, error: "That id isn't available" };
  }

  const currentId = await getUserId();
  if (newId === currentId) return { ok: true };

  // A pre-check narrows the common case with a clearer error, but the real
  // guarantee against two people claiming the same id at once comes from
  // db.changeUserId()'s transaction, not from this check alone - see there.
  const available = await db.isUserIdAvailable(newId);
  if (!available) {
    return { ok: false, error: "That id is already taken" };
  }

  const result = await db.changeUserId(currentId, newId);
  if (result === "taken") {
    return { ok: false, error: "That id is already taken" };
  }
  await setUserIdCookie(newId);
  return { ok: true };
}

// Points this browser at an id the visitor already has - e.g. one they set
// up and copied from another device. No data migration: this just switches
// which existing id the browser resumes as. Rejected if the id has no
// existing data - typing a typo would otherwise silently and invisibly
// start the visitor over on a brand-new empty id.
export async function resumeUserId(idRaw: string): Promise<{ ok: boolean; error?: string }> {
  const id = idRaw.trim();
  if (!ID_PATTERN.test(id)) {
    return { ok: false, error: "That doesn't look like a valid id" };
  }
  if (RESERVED_IDS.has(id.toLowerCase())) {
    return { ok: false, error: "That id isn't available" };
  }

  const available = await db.isUserIdAvailable(id);
  if (available) {
    return { ok: false, error: "No progress found for that id - check the spelling" };
  }

  await setUserIdCookie(id);
  return { ok: true };
}

export async function recordSessionComplete(clearedCount: number) {
  const userId = await getUserId();
  return db.recordSessionComplete(userId, clearedCount);
}

export async function recordFlag(questionId: string, reason: string) {
  await db.recordFlag(questionId, reason);
}

export async function resetProgress() {
  const userId = await getUserId();
  await db.resetProgress(userId);
}

export async function saveProfile(displayName: string, avatarScheme: string) {
  const userId = await getUserId();
  await db.saveProfile(userId, displayName, avatarScheme);
}

export async function recordAnswer(questionId: string, correct: boolean, topic: string) {
  const userId = await getUserId();
  await db.recordAnswer(userId, questionId, correct, topic);
}

export async function subscribeToPush(sub: db.PushSubscriptionRecord) {
  const userId = await getUserId();
  await db.saveSubscription(userId, sub);
}

export async function unsubscribeFromPush(endpoint: string) {
  await db.removeSubscription(endpoint);
}

export async function isSubscribedToPush(endpoint: string) {
  return db.getSubscription(endpoint);
}
