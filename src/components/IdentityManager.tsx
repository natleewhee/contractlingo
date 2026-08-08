"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { changeUserId, resumeUserId } from "@/app/actions";

type Mode = "view" | "rename" | "resume";

export function IdentityManager({ userId }: { userId: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("view");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy id", err);
    }
  }

  function openMode(next: Mode) {
    setMode(next);
    setInput("");
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = mode === "rename" ? await changeUserId(input) : await resumeUserId(input);
      if (result.ok) {
        setMode("view");
        router.push("/");
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to update id", err);
      setError("Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl bg-card p-4 shadow-[0_2px_0_var(--frame-border)]">
      <h2 className="font-display text-sm font-bold">Your id</h2>
      <p className="mt-1 text-xs text-ink-soft">
        Copy this to pick up your progress on another device, or set a custom one to remember.
      </p>

      <div className="mt-2 flex items-center gap-2">
        <code className="flex-1 truncate rounded-xl bg-bg px-3 py-2 font-display text-xs text-ink">
          {userId}
        </code>
        <button
          onClick={copyId}
          className="shrink-0 rounded-xl bg-gold px-3 py-2 font-display text-xs font-bold text-[#21284A]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {mode === "view" && (
        <div className="mt-2 flex gap-3">
          <button
            onClick={() => openMode("rename")}
            className="font-display text-[0.68rem] font-semibold text-ink-soft underline decoration-dotted"
          >
            Set a custom id
          </button>
          <button
            onClick={() => openMode("resume")}
            className="font-display text-[0.68rem] font-semibold text-ink-soft underline decoration-dotted"
          >
            Resume a different id
          </button>
        </div>
      )}

      {mode !== "view" && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
          <p className="text-xs text-ink-soft">
            {mode === "rename"
              ? "Pick something memorable — this becomes your new id, and your current progress moves with it."
              : "Enter an id you've used before to switch this device to it."}
          </p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "rename" ? "your-custom-id" : "id to resume"}
            maxLength={40}
            autoFocus
            className="rounded-xl border border-frame-border bg-bg px-3 py-2 font-display text-sm font-semibold text-ink outline-none"
          />
          {error && <p className="text-xs font-semibold text-coral">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex-1 rounded-xl bg-gold px-3 py-2 font-display text-xs font-bold text-[#21284A] disabled:opacity-60"
            >
              {busy ? "Saving…" : mode === "rename" ? "Save" : "Resume"}
            </button>
            <button
              type="button"
              onClick={() => openMode("view")}
              className="rounded-xl px-3 py-2 font-display text-xs font-semibold text-ink-soft"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
