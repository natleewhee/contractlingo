"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroAvatar } from "@/components/HeroAvatar";
import { saveProfile } from "@/app/actions";
import { AVATAR_SCHEMES } from "@/lib/avatarSchemes";

type Props = {
  initialName: string | null;
  initialScheme: string;
};

export function HeroIdentity({ initialName, initialScheme }: Props) {
  const router = useRouter();
  const nameInputId = useId();
  const isFirstRun = initialName === null;
  const [editing, setEditing] = useState(isFirstRun);
  const [name, setName] = useState(initialName ?? "");
  const [scheme, setScheme] = useState(initialScheme);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    setError(null);
    try {
      await saveProfile(trimmed, scheme);
      setEditing(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save profile", err);
      setError("Couldn't save right now - try again in a moment.");
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <div className="mt-3 flex items-center gap-3">
        <HeroAvatar size={52} scheme={initialScheme} />
        <div className="flex flex-col">
          <span className="font-display text-sm font-bold">{initialName}</span>
          <button
            onClick={() => setEditing(true)}
            className="flex min-h-11 items-center text-left font-display text-[0.68rem] font-medium text-ink-soft underline decoration-dotted"
          >
            Edit badge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-frame-border bg-card p-4">
      <div className="flex items-center gap-3">
        <HeroAvatar size={48} scheme={scheme} />
        <div className="flex-1">
          <label htmlFor={nameInputId} className="sr-only">
            Your name
          </label>
          <input
            id={nameInputId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={24}
            className="w-full rounded-xl border border-frame-border bg-bg px-3 py-2.5 font-display text-sm font-semibold text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {AVATAR_SCHEMES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScheme(s.id)}
            aria-label={s.label}
            aria-pressed={scheme === s.id}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-bg outline-offset-2 ${
              scheme === s.id ? "outline outline-2 outline-gold" : ""
            }`}
          >
            <HeroAvatar size={30} scheme={s.id} />
          </button>
        ))}
      </div>

      {error && <p className="text-xs font-semibold text-ink">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving || !name.trim()}
          className="min-h-11 flex-1 rounded-xl bg-gold px-3 py-2 font-display text-xs font-bold text-[var(--accent-text)] disabled:opacity-60"
        >
          {saving ? "Saving…" : isFirstRun ? "Start logging" : "Save"}
        </button>
        {!isFirstRun && (
          <button
            onClick={() => {
              setName(initialName ?? "");
              setScheme(initialScheme);
              setEditing(false);
            }}
            className="min-h-11 rounded-xl px-3 py-2 font-display text-xs font-semibold text-ink-soft"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
