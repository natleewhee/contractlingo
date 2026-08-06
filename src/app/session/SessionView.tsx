"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button3D } from "@/components/Button3D";
import { HeroAvatar } from "@/components/HeroAvatar";
import { MinionAvatar } from "@/components/MinionAvatar";
import { QueueDots } from "@/components/QueueDots";
import { recordFlag, recordSessionComplete } from "@/app/actions";
import { SESSION_QUESTIONS } from "@/lib/questions";

type Phase = "incoming" | "battle" | "resolution" | "recap";
const REASONS = ["Answer feels wrong", "Too easy", "Not relevant", "Other"];

export function SessionView() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  const pool = useMemo(() => {
    if (!topic) return SESSION_QUESTIONS;
    const filtered = SESSION_QUESTIONS.filter((q) => q.topic === topic);
    return filtered.length > 0 ? filtered : SESSION_QUESTIONS;
  }, [topic]);

  const [phase, setPhase] = useState<Phase>("incoming");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [streak, setStreak] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const total = pool.length;
  const question = pool[index];
  const caseWord = total === 1 ? "case" : "cases";

  function answer(choice: 0 | 1) {
    setSelected(choice);
    if (choice === question.correctIndex) setCorrectCount((c) => c + 1);
    setPhase("resolution");
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
            <span className="text-lg font-extrabold">
              {total} {caseWord} incoming!
            </span>
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-2">
                {pool.map((q, i) => (
                  <MinionAvatar
                    key={q.id}
                    size={24}
                    className="[animation-duration:1s]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="[transform:scaleX(-1)]">
                <HeroAvatar size={46} />
              </div>
            </div>
            <Button3D tone="coral" onClick={() => setPhase("battle")}>
              DEFEND
            </Button3D>
          </div>
        )}

        {(phase === "battle" || phase === "resolution") && (
          <div className="flex flex-1 flex-col py-4">
            <QueueDots total={total} currentIndex={index} />

            <div className="relative mt-3 flex flex-col items-center gap-2 rounded-2xl bg-card px-4 py-5 text-center shadow-[0_3px_0_var(--frame-border)]">
              <span className="font-display text-[0.6rem] font-semibold tracking-wide text-coral uppercase">
                Your Call
              </span>
              <MinionAvatar size={42} />
              <p className="font-extrabold">{question.scenario}</p>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {question.options.map((opt, i) => {
                const isAnswered = phase === "resolution";
                const isCorrectOpt = i === question.correctIndex;
                const isChosen = i === selected;

                let tone = "bg-card text-ink-soft shadow-[0_3px_0_var(--frame-border)]";
                if (isAnswered && isCorrectOpt) {
                  tone = "bg-mint text-white shadow-[0_3px_0_var(--mint-dark)]";
                } else if (isAnswered && isChosen && !isCorrectOpt) {
                  tone = "bg-card text-coral shadow-[0_3px_0_var(--coral)] outline outline-2 outline-[var(--coral)]";
                }

                return (
                  <button
                    key={opt}
                    disabled={isAnswered}
                    onClick={() => answer(i as 0 | 1)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left font-display text-sm font-semibold ${tone}`}
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
              <div className="mt-auto rounded-t-2xl bg-mint px-4 py-4 text-white">
                <p className="font-display text-sm font-bold">
                  {selected === question.correctIndex ? "Nice! That's correct." : "Not quite."}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/90">{question.explanation}</p>

                {!reportOpen && !reportSent && (
                  <button
                    onClick={() => setReportOpen(true)}
                    className="mt-2 flex items-center gap-1 font-display text-[0.65rem] font-semibold text-white/85"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 3v18M5 4h13l-3 4 3 4H5" />
                    </svg>
                    Something off? Report this case
                  </button>
                )}

                {reportOpen && (
                  <div className="mt-3 rounded-xl bg-white p-3 text-ink">
                    <p className="text-center font-display text-xs font-semibold">
                      What&apos;s wrong with this one?
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {REASONS.map((reason) => (
                        <button
                          key={reason}
                          onClick={() => flag(reason)}
                          className="rounded-full border border-frame-border px-2.5 py-1 font-display text-[0.6rem] font-semibold text-ink-soft"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {reportSent && (
                  <p className="mt-2 text-xs text-white/85">Flagged — thanks, I&apos;ll take a look.</p>
                )}

                <Button3D tone="white" className="mt-3" onClick={next} disabled={submitting}>
                  {submitting ? "..." : "CONTINUE"}
                </Button3D>
              </div>
            )}
          </div>
        )}

        {phase === "recap" && (
          <div
            className="relative flex flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-16 text-center"
            style={{ background: "linear-gradient(180deg, var(--coral), var(--gold))" }}
          >
            <span className="font-display text-4xl font-bold text-white [text-shadow:0_3px_0_rgba(0,0,0,0.12)]">
              {correctCount}/{total}
            </span>
            <span className="font-display text-xs font-semibold tracking-wide text-white uppercase">
              Defended
            </span>
            <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 font-display text-xs font-semibold text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2c1 3-3 4-3 7.5A3.5 3.5 0 0012 13a3.5 3.5 0 003-5.3c1.5 1 2.5 3 2.5 5a5.5 5.5 0 11-11 0C6.5 8 9 5.5 12 2z"
                  fill="#fff"
                />
              </svg>
              {streak} day streak
            </div>
            <HeroAvatar size={70} className="mt-3" />
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
