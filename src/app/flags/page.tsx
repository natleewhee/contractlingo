import Link from "next/link";
import { getAllQuestions, getFlags } from "@/lib/db";
import { isAdminSecretValid } from "@/lib/adminAuth";

// Reads live data from Neon on every request.
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

// Operator tool, not a user feature - content reports from every visitor,
// unfiltered. Visit with ?key=<ADMIN_SECRET>.
export default async function FlagsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!isAdminSecretValid(key)) {
    return (
      <div className="flex flex-1 justify-center px-4 py-6">
        <main className="flex w-full max-w-md flex-col items-center gap-2 py-16 text-center">
          <p className="font-display text-sm font-bold">Not available</p>
          <p className="text-xs text-ink-soft">This page needs an operator key.</p>
          <Link href="/progress" className="mt-2 text-xs font-semibold text-ink-soft underline">
            Back to progress
          </Link>
        </main>
      </div>
    );
  }

  const [flags, questions] = await Promise.all([getFlags(), getAllQuestions()]);
  const questionById = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="flex flex-1 justify-center px-4 py-6">
      <main className="flex w-full max-w-md flex-col">
        <div className="flex items-center gap-2">
          <Link
            href="/progress"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-frame-border bg-card text-ink-soft"
            aria-label="Back to progress"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="text-lg font-extrabold">Reported cases</h1>
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {flags.length === 0 ? "Nothing reported yet." : `${flags.length} report${flags.length === 1 ? "" : "s"}`}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {flags.map((flag) => {
            const question = questionById.get(flag.questionId);
            return (
              <div
                key={flag.id}
                className="rounded-2xl border border-frame-border bg-card px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-coral px-2.5 py-1 font-display text-[0.6rem] font-bold text-coral">
                    {flag.reason}
                  </span>
                  <span className="text-[0.65rem] text-ink-soft">{formatDate(flag.createdAt)}</span>
                </div>
                {question ? (
                  <>
                    <p className="mt-2 font-display text-[0.6rem] font-semibold tracking-wide text-ink-soft/70">
                      {question.topic} · {question.id}
                    </p>
                    <p className="mt-1 text-sm font-bold">{question.scenario}</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-ink-soft">
                    Question {flag.questionId} (no longer in the current bank)
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
