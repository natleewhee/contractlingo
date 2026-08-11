import { getAllQuestions, getDueQuestionIds, getProfile } from "@/lib/db";
import { getUserId } from "@/lib/identity";
import type { Question } from "@/lib/questions";
import { SessionView } from "./SessionView";

// Reads live due-question state from Neon on every request.
export const dynamic = "force-dynamic";

const ALLOWED_MINUTES = [5, 10, 15];
const DEFAULT_CAP_MINUTES = 10;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Every question in the bank is authored with the correct answer first
// (correctIndex: 0) - left as-is, this makes the quiz trivially gameable
// ("always pick the first one"). Randomize display order per load instead
// of touching all 239 authored entries.
function randomizeOptionOrder(questions: Question[]): Question[] {
  return questions.map((q) => {
    if (Math.random() >= 0.5) return q;
    const [a, b] = q.options;
    return { ...q, options: [b, a] as [string, string], correctIndex: q.correctIndex === 0 ? 1 : 0 };
  });
}

// A flat shuffle of the due pool is random, but with only a handful of
// topics actually attempted so far, small sessions can still land almost
// entirely on whichever topics happen to dominate the due pool right now.
// Round-robin across topics (each shuffled internally) instead, so a
// capped session pulls from as many distinct topics as it has room for
// before repeating any of them.
function distributeAcrossTopics(questions: Question[], count: number): Question[] {
  const byTopic = new Map<string, Question[]>();
  for (const q of questions) {
    const list = byTopic.get(q.topic);
    if (list) list.push(q);
    else byTopic.set(q.topic, [q]);
  }
  for (const [topicKey, list] of byTopic) {
    byTopic.set(topicKey, shuffle(list));
  }

  const topicOrder = shuffle([...byTopic.keys()]);
  const result: Question[] = [];
  let round = 0;
  while (result.length < count) {
    let addedThisRound = false;
    for (const topicKey of topicOrder) {
      const list = byTopic.get(topicKey)!;
      if (round < list.length) {
        result.push(list[round]);
        addedThisRound = true;
        if (result.length >= count) break;
      }
    }
    if (!addedThisRound) break;
    round++;
  }
  return result;
}

export default async function SessionPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; minutes?: string }>;
}) {
  const { topic, minutes } = await searchParams;
  const userId = await getUserId();
  const [profile, allQuestions] = await Promise.all([getProfile(userId), getAllQuestions()]);

  let pool = topic ? allQuestions.filter((q) => q.topic === topic) : allQuestions;
  if (pool.length === 0) pool = allQuestions;

  // Narrows to what's actually due for spaced-repetition review - for both
  // "face them all" and a specific topic - falling back to the (possibly
  // topic-filtered) full bank if nothing is due yet so there's always
  // something to do.
  const dueIds = await getDueQuestionIds(userId, pool.map((q) => q.id));
  const due = pool.filter((q) => dueIds.includes(q.id));
  if (due.length > 0) pool = due;

  // A picked session length (5/10/15 min) caps the batch to roughly one
  // question per minute, spread across as many distinct topics as
  // possible. An unset or invalid `minutes` param still gets a default cap
  // - there is no path that sends the whole bank into one session.
  const parsedMinutes = Number(minutes);
  const cap = ALLOWED_MINUTES.includes(parsedMinutes) ? parsedMinutes : DEFAULT_CAP_MINUTES;
  pool = pool.length > cap ? distributeAcrossTopics(pool, cap) : shuffle(pool);

  pool = randomizeOptionOrder(pool);

  return <SessionView initialPool={pool} heroScheme={profile.avatarScheme} />;
}
