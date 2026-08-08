"use server";

import { cookies } from "next/headers";
import * as db from "@/lib/db";
import { getUserId, USER_ID_COOKIE } from "@/lib/identity";

const ID_PATTERN = /^[a-zA-Z0-9_-]{3,40}$/;
const ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years, matches proxy.ts's initial assignment

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

  const currentId = await getUserId();
  if (newId === currentId) return { ok: true };

  const available = await db.isUserIdAvailable(newId);
  if (!available) {
    return { ok: false, error: "That id is already taken" };
  }

  await db.changeUserId(currentId, newId);
  await setUserIdCookie(newId);
  return { ok: true };
}

// Points this browser at an id the visitor already has - e.g. one they set
// up and copied from another device. No data migration: this just switches
// which existing id the browser resumes as.
export async function resumeUserId(idRaw: string): Promise<{ ok: boolean; error?: string }> {
  const id = idRaw.trim();
  if (!ID_PATTERN.test(id)) {
    return { ok: false, error: "That doesn't look like a valid id" };
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
