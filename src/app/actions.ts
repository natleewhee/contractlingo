"use server";

import { cookies } from "next/headers";
import * as db from "@/lib/db";
import { requireUserId, USER_ID_COOKIE, USER_ID_COOKIE_OPTIONS } from "@/lib/identity";
import { AVATAR_SCHEMES, DEFAULT_AVATAR_SCHEME } from "@/lib/avatarSchemes";
import { FLAG_REASONS, type FlagReason } from "@/lib/flagReasons";

const ID_PATTERN = /^[a-zA-Z0-9_-]{3,40}$/;
const MAX_DISPLAY_NAME_LENGTH = 24;

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
  cookieStore.set(USER_ID_COOKIE, id, USER_ID_COOKIE_OPTIONS);
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

  const currentId = await requireUserId();
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
  const userId = await requireUserId();
  return db.recordSessionComplete(userId, clearedCount);
}

// questionId and reason are both validated server-side - a Server Action is
// a public POST endpoint regardless of what the report-this-case UI offers,
// so nothing stops a direct caller from sending an arbitrary question id or
// an unlimited freeform reason string otherwise.
export async function recordFlag(questionId: string, reason: string) {
  if (!FLAG_REASONS.includes(reason as FlagReason)) return;
  const question = await db.getQuestionById(questionId);
  if (!question) return;
  await db.recordFlag(questionId, reason);
}

export async function resetProgress() {
  const userId = await requireUserId();
  await db.resetProgress(userId);
}

export async function saveProfile(displayName: string, avatarScheme: string) {
  const userId = await requireUserId();
  const trimmedName = displayName.trim().slice(0, MAX_DISPLAY_NAME_LENGTH);
  const scheme = AVATAR_SCHEMES.some((s) => s.id === avatarScheme) ? avatarScheme : DEFAULT_AVATAR_SCHEME;
  await db.saveProfile(userId, trimmedName, scheme);
}

// Takes the selected option's text, not a boolean/topic the caller asserts
// - correctness and topic are both derived here from the canonical question
// record, never trusted from the client. selectedOption is matched against
// the bank's own (non-randomized) option text, so this works regardless of
// how the session randomized display order for this particular load.
export async function recordAnswer(questionId: string, selectedOption: string) {
  const userId = await requireUserId();
  const question = await db.getQuestionById(questionId);
  if (!question) return;
  const correct = question.options[question.correctIndex] === selectedOption;
  await db.recordAnswer(userId, questionId, correct, question.topic);
}

export async function subscribeToPush(sub: db.PushSubscriptionRecord) {
  const userId = await requireUserId();
  await db.saveSubscription(userId, sub);
}

export async function unsubscribeFromPush(endpoint: string) {
  await db.removeSubscription(endpoint);
}
