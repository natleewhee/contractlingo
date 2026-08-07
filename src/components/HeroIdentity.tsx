"use client";

import { useState } from "react";
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
  const isFirstRun = initialName === null;
  const [editing, setEditing] = useState(isFirstRun);
  const [name, setName] = useState(initialName ?? "");
  const [scheme, setScheme] = useState(initialScheme);
  const [saving, setSaving] = useState(false);

  async function save() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      await saveProfile(trimmed, scheme);
      setEditing(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save profile", err);
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <div className="mt-3 flex items-center gap-3">
        <HeroAvatar size={58} scheme={initialScheme} />
        <div className="flex flex-col">
          <span className="font-display text-sm font-bold">{initialName}</span>
          <button
            onClick={() => setEditing(true)}
            className="text-left font-display text-[0.65rem] font-medium text-ink-soft underline decoration-dotted"
          >
            Edit hero
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-[0_2px_0_var(--frame-border)]">
      <div className="flex items-center gap-3">
        <HeroAvatar size={50} scheme={scheme} />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={24}
          className="flex-1 rounded-xl border border-frame-border bg-bg px-3 py-2 font-display text-sm font-semibold text-ink outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {AVATAR_SCHEMES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScheme(s.id)}
            aria-label={s.label}
            aria-pressed={scheme === s.id}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-bg ${
              scheme === s.id ? "outline outline-2 outline-offset-2 outline-[var(--gold)]" : ""
            }`}
          >
            <HeroAvatar size={30} scheme={s.id} animate={false} cape={false} />
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving || !name.trim()}
          className="flex-1 rounded-xl bg-gold px-3 py-2 font-display text-xs font-bold text-[#21284A] disabled:opacity-60"
        >
          {saving ? "Saving…" : isFirstRun ? "Start defending" : "Save"}
        </button>
        {!isFirstRun && (
          <button
            onClick={() => {
              setName(initialName ?? "");
              setScheme(initialScheme);
              setEditing(false);
            }}
            className="rounded-xl px-3 py-2 font-display text-xs font-semibold text-ink-soft"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
