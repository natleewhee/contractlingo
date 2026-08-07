"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const ok = await login(password);
      if (ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setBusy(false);
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(true);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passphrase"
        autoFocus
        className="rounded-2xl border border-frame-border bg-card px-4 py-3 text-center font-display text-sm font-semibold text-ink outline-none"
      />
      {error && <p className="text-xs font-semibold text-coral">Wrong passphrase — try again.</p>}
      <button
        type="submit"
        disabled={busy || !password}
        className="rounded-2xl bg-gold px-4 py-3 font-display text-sm font-bold text-[#21284A] disabled:opacity-60"
      >
        {busy ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
