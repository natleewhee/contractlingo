"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { subscribeToPush, unsubscribeFromPush } from "@/app/actions";

type Status = "checking" | "off" | "on" | "busy";

// Push support never changes during a session, so this is a plain
// synchronous browser capability check - useSyncExternalStore handles the
// SSR-vs-client snapshot split safely (server never has `navigator`).
function noopSubscribe() {
  return () => {};
}
function getSupportSnapshot() {
  return "serviceWorker" in navigator && "PushManager" in window;
}
function getServerSupportSnapshot() {
  return false;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export function NotificationPrompt() {
  const isSupported = useSyncExternalStore(noopSubscribe, getSupportSnapshot, getServerSupportSnapshot);
  const [status, setStatus] = useState<Status>("checking");

  // Actual subscription status is genuinely async (a real browser API call),
  // unlike the support check above - a legitimate use of an effect.
  useEffect(() => {
    if (!isSupported) return;
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setStatus(sub ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, [isSupported]);

  async function enable() {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) return;
    setStatus("busy");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("off");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const json = sub.toJSON();
      await subscribeToPush({
        endpoint: sub.endpoint,
        p256dh: json.keys?.p256dh ?? "",
        auth: json.keys?.auth ?? "",
      });
      setStatus("on");
    } catch (err) {
      console.error("Failed to enable notifications", err);
      setStatus("off");
    }
  }

  async function disable() {
    setStatus("busy");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await unsubscribeFromPush(sub.endpoint);
        await sub.unsubscribe();
      }
      setStatus("off");
    } catch (err) {
      console.error("Failed to disable notifications", err);
      setStatus("on");
    }
  }

  if (!isSupported || status === "checking") return null;

  return (
    <button
      onClick={status === "on" ? disable : enable}
      disabled={status === "busy"}
      className="mt-2 flex items-center gap-1.5 font-display text-[0.68rem] font-semibold text-ink-soft disabled:opacity-60"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
      {status === "on" ? "Daily reminder on" : "Enable daily reminder"}
    </button>
  );
}
