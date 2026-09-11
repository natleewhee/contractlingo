"use client";

import Link from "next/link";
import { useState } from "react";
import { Button3D } from "@/components/Button3D";
import { EntryMark } from "@/components/EntryMark";
import { HeroAvatar } from "@/components/HeroAvatar";
import { QueueDots } from "@/components/QueueDots";
import { recordAnswer, recordFlag, recordSessionComplete } from "@/app/actions";
import { FLAG_REASONS } from "@/lib/flagReasons";
import type { Question } from "@/lib/questions";

type Phase = "incoming" | "battle" | "resolution" | "recap";

const AVATAR_PREVIEW_CAP = 8;

export function SessionView({
  initialPool,
  heroScheme = "marker-yellow",
}: {
  initialPool: Question[];
  heroScheme?: string;
}) {
  const [pool] = useState(initialPool);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [streak, setStreak] = useState(0);
  const [frozeStreak, setFrozeStreak] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const total = pool.length;
  const question = pool[index];
  const caseWord = total === 1 ? "case" : "cases";
  const isCorrect = selected !== null && selected === question.correctIndex;

  function answer(choice: 0 | 1) {
    setSelected(choice);
    const correct = choice === question.correctIndex;
    if (correct) setCorrectCount((c) => c + 1);
    setPhase("resolution");
    // Sends the selected option's text, not a client-asserted "was this
    // right" boolean - the server derives correctness itself from the
    // canonical (non-randomized) question record. The local `correct`
    // above is only ever used for this device's own immediate UI feedback.
    recordAnswer(question.id, question.options[choice]).catch((err) => {
      console.error("Failed to record answer", err);
    });
  }

  async function next() {
    setReportOpen(false);
    setReportSent(false);
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(null);
      setPhase("battle");
      return;
    }

    setSubmitting(true);
    try {
      const result = await recordSessionComplete(total);
      setStreak(result.streak);
      setFrozeStreak(result.frozeStreak);
    } catch (err) {
      console.error("Failed to record session completion", err);
    } finally {
      setSubmitting(false);
    }
    setPhase("recap");
  }

  function flag(reason: string) {
    setReportOpen(false);
    setReportSent(true);
    recordFlag(question.id, reason).catch((err) => {
      console.error("Failed to record flag", err);
    });
  }

  return (
    <div className="flex flex-1 justify-center px-4 py-6">
      <main className="flex w-full max-w-md flex-col">
        {phase === "incoming" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <span className="font-body text-lg font-bold">
              {total} {caseWord} incoming!
            </span>
            <div className="flex items-center justify-center gap-4">
              <div className="flex max-w-[220px] flex-wrap justify-center gap-2">
                {pool.slice(0, AVATAR_PREVIEW_CAP).map((q) => (
                  <EntryMark key={q.id} size={24} />
                ))}
                {pool.length > AVATAR_PREVIEW_CAP && (
                  <span className="flex h-6 items-center rounded-full bg-card px-2 font-display text-[0.65rem] font-bold text-ink-soft border border-frame-border">
                    +{pool.length - AVATAR_PREVIEW_CAP}
                  </span>
                )}
              </div>
              <HeroAvatar size={46} scheme={heroScheme} />
            </div>
            <Button3D tone="coral" onClick={() => setPhase("battle")}>
              START
            </Button3D>
          </div>
        )}

        {(phase === "battle" || phase === "resolution") && (
          <div className="flex flex-1 flex-col py-4">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-ink-soft border border-frame-border"
                aria-label="Back to home"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
              <div className="overflow-x-auto">
                <QueueDots total={total} currentIndex={index} />
              </div>
            </div>

            <div className="relative mt-3 flex flex-col items-center gap-2 rounded-2xl bg-card px-4 py-5 text-center border border-frame-border">
              <span className="font-stamp text-[0.6rem] font-bold tracking-[0.2em] text-coral uppercase">
                Your Call
              </span>
              <EntryMark size={36} />
              <h1 className="font-body text-base font-bold text-ink">{question.scenario}</h1>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {question.options.map((opt, i) => {
                const isAnswered = phase === "resolution";
                const isCorrectOpt = i === question.correctIndex;
                const isChosen = i === selected;

                // bg-mint/bg-coral are "ink" colors tuned to work as TEXT on
                // paper (dark in light mode, brightened in dark mode) - using
                // either as a solid fill needs a text color that flips
                // opposite to it, which var(--accent-text) (fixed dark, only
                // right for the accent/gold fill) does not do. A light tint
                // of the fill instead keeps var(--ink) reliably readable in
                // both themes.
                let toneClasses = "bg-card text-ink border-2 border-frame-border";
                if (isAnswered && isCorrectOpt) {
                  toneClasses = "bg-mint/15 text-ink border-2 border-mint";
                } else if (isAnswered && isChosen && !isCorrectOpt) {
                  toneClasses = "bg-card text-coral border-2 border-coral";
                }

                return (
                  <button
                    key={opt}
                    aria-disabled={isAnswered}
                    onClick={() => {
                      if (!isAnswered) answer(i as 0 | 1);
                    }}
                    className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-left font-display text-sm font-semibold ${toneClasses}`}
                  >
                    {opt}
                    {isAnswered && isCorrectOpt && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <path d="M4 12l5 5L20 6" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {phase === "resolution" && (
              <div
                role="status"
                aria-live="polite"
                className="mt-auto rounded-t-2xl border-t border-frame-border bg-card-alt px-4 py-4"
              >
                <span
                  className={`inline-block rounded-md border-2 px-3 py-1 font-stamp text-sm font-bold tracking-[0.15em] uppercase [transform:rotate(-3deg)] ${
                    isCorrect ? "border-mint text-mint" : "border-coral text-coral"
                  }`}
                >
                  {isCorrect ? "Approved" : "Queried"}
                </span>
                <p className="mt-2 font-display text-sm font-bold text-ink">
                  {isCorrect ? "Nice! That's correct." : "Not quite."}
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-ink-soft">{question.explanation}</p>

                {!reportOpen && !reportSent && (
                  <button
                    onClick={() => setReportOpen(true)}
                    className="mt-2 flex min-h-11 items-center gap-1 font-display text-[0.65rem] font-semibold text-ink-soft"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 3v18M5 4h13l-3 4 3 4H5" />
                    </svg>
                    Something off? Report this case
                  </button>
                )}

                {reportOpen && (
                  <div className="mt-3 rounded-xl border border-frame-border bg-card p-3 text-ink">
                    <p className="text-center font-display text-xs font-semibold">
                      What&apos;s wrong with this one?
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {FLAG_REASONS.map((reason) => (
                        <button
                          key={reason}
                          onClick={() => flag(reason)}
                          className="rounded-full border border-frame-border px-2.5 py-1.5 font-display text-[0.6rem] font-semibold text-ink-soft"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {reportSent && <p className="mt-2 text-xs text-ink-soft">Flagged — thanks, I&apos;ll take a look.</p>}

                <Button3D tone="white" className="mt-3" onClick={next} disabled={submitting}>
                  {submitting ? "..." : "CONTINUE"}
                </Button3D>
              </div>
            )}
          </div>
        )}

        {phase === "recap" && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-frame-border bg-card-alt px-4 py-16 text-center">
            <span className="inline-block rounded-lg border-2 border-mint px-4 py-1.5 font-stamp text-3xl font-bold text-mint [transform:rotate(-3deg)]">
              {correctCount}/{total}
            </span>
            <span className="mt-1 font-display text-xs font-semibold tracking-wide uppercase text-ink-soft">
              Logged
            </span>
            <div className="mt-2 flex items-center gap-1.5 rounded-full border border-frame-border bg-card px-3 py-1 font-display text-xs font-semibold text-ink">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-flicker"
                aria-hidden="true"
              >
                <path
                  d="M12 2c1 3-3 4-3 7.5A3.5 3.5 0 0012 13a3.5 3.5 0 003-5.3c1.5 1 2.5 3 2.5 5a5.5 5.5 0 11-11 0C6.5 8 9 5.5 12 2z"
                  fill="var(--gold)"
                />
              </svg>
              {streak} day streak
            </div>
            {frozeStreak && (
              <div className="mt-1.5 flex items-center gap-1 font-display text-[0.65rem] font-semibold text-ink-soft">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />
                </svg>
                Missed a day, but your streak is protected
              </div>
            )}
            <HeroAvatar size={70} scheme={heroScheme} className="mt-3" />
            <div className="mt-4 w-full max-w-[200px]">
              <Button3D tone="white" href="/">
                DONE
              </Button3D>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
