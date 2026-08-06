import { getAllQuestions, getDueQuestionIds, getProfile } from "@/lib/db";
import type { Question } from "@/lib/questions";
import { SessionView } from "./SessionView";

// Reads live due-question state from Neon on every request.
export const dynamic = "force-dynamic";

const ALLOWED_MINUTES = [5, 10, 15];

function shuffle(questions: Question[]): Question[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default async function SessionPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; minutes?: string }>;
}) {
  const { topic, minutes } = await searchParams;
  const [profile, allQuestions] = await Promise.all([getProfile(), getAllQuestions()]);

  let pool = topic ? allQuestions.filter((q) => q.topic === topic) : allQuestions;
  if (pool.length === 0) pool = allQuestions;

  if (!topic) {
    // "Face them all" narrows to what's actually due for spaced-repetition
    // review, falling back to the full bank if nothing is due yet so
    // there's always something to do.
    const dueIds = await getDueQuestionIds(pool.map((q) => q.id));
    const due = pool.filter((q) => dueIds.includes(q.id));
    if (due.length > 0) pool = due;
  }

  // A picked session length (5/10/15 min) caps the batch to roughly one
  // question per minute, shuffled so a big due pile doesn't always hand
  // back the same first N questions every day.
  const cap = Number(minutes);
  if (ALLOWED_MINUTES.includes(cap) && pool.length > cap) {
    pool = shuffle(pool).slice(0, cap);
  }

  return <SessionView initialPool={pool} heroScheme={profile.avatarScheme} />;
}
