"use server";

import * as db from "@/lib/db";

export async function recordSessionComplete(clearedCount: number) {
  return db.recordSessionComplete(clearedCount);
}

export async function recordFlag(questionId: string, reason: string) {
  await db.recordFlag(questionId, reason);
}

export async function resetProgress() {
  await db.resetProgress();
}

export async function recordAnswer(questionId: string, correct: boolean, topic: string) {
  await db.recordAnswer(questionId, correct, topic);
}

export async function subscribeToPush(sub: db.PushSubscriptionRecord) {
  await db.saveSubscription(sub);
}

export async function unsubscribeFromPush(endpoint: string) {
  await db.removeSubscription(endpoint);
}

export async function isSubscribedToPush(endpoint: string) {
  return db.getSubscription(endpoint);
}
