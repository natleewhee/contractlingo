"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetProgress } from "@/app/actions";

export function ResetProgressButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    const confirmed = window.confirm(
      "Reset all progress? This clears your streak, total cases, question history, and due dates. This can't be undone."
    );
    if (!confirmed) return;

    setBusy(true);
    try {
      await resetProgress();
      router.refresh();
    } catch (err) {
      console.error("Failed to reset progress", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="mt-6 self-center font-display text-[0.68rem] font-semibold text-coral disabled:opacity-60"
    >
      {busy ? "Resetting…" : "Reset all progress"}
    </button>
  );
}
