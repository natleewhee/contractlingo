"use server";

import * as db from "@/lib/db";
import { getUserId } from "@/lib/identity";

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
