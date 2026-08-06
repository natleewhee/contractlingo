import { getDueQuestionIds } from "@/lib/db";
import { SESSION_QUESTIONS } from "@/lib/questions";
import { SessionView } from "./SessionView";

// Reads live due-question state from Neon on every request.
export const dynamic = "force-dynamic";

export default async function SessionPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  let pool = topic ? SESSION_QUESTIONS.filter((q) => q.topic === topic) : SESSION_QUESTIONS;
  if (pool.length === 0) pool = SESSION_QUESTIONS;

  if (!topic) {
    // "Face them all" narrows to what's actually due for spaced-repetition
    // review, falling back to the full bank if nothing is due yet so
    // there's always something to do.
    const dueIds = await getDueQuestionIds(pool.map((q) => q.id));
    const due = pool.filter((q) => dueIds.includes(q.id));
    if (due.length > 0) pool = due;
  }

  return <SessionView initialPool={pool} />;
}
