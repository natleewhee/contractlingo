"use server";

import * as db from "@/lib/db";

export async function recordSessionComplete(clearedCount: number) {
  return db.recordSessionComplete(clearedCount);
}

export async function recordFlag(questionId: string, reason: string) {
  await db.recordFlag(questionId, reason);
}
