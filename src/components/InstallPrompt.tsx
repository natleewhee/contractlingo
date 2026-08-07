"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "cl-install-dismissed";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  // Capturing `beforeinstallprompt` is a genuinely async browser event (may
  // fire seconds after mount, or never), so an effect-registered listener is
  // the right tool here - same "async external event" reasoning as the push
  // subscription check in NotificationPrompt.
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (isStandalone || localStorage.getItem(DISMISSED_KEY)) return;

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-[0_3px_0_var(--frame-border)]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#21284A" strokeWidth="2.4">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" />
          </svg>
        </span>
        <p className="flex-1 font-display text-xs font-semibold leading-snug">
          Add ContractLingo to your home screen for quicker daily sessions
        </p>
        <div className="flex shrink-0 flex-col gap-1">
          <button
            onClick={install}
            className="rounded-xl bg-gold px-3 py-1.5 font-display text-[0.65rem] font-bold text-[#21284A]"
          >
            Install
          </button>
          <button
            onClick={dismiss}
            className="font-display text-[0.6rem] font-semibold text-ink-soft"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
