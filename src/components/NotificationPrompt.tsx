"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { subscribeToPush, unsubscribeFromPush } from "@/app/actions";

type Status = "checking" | "off" | "on" | "busy";

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// Push support and the current permission are both plain synchronous
// browser reads (unlike the actual subscription state below, which needs a
// real async API call) - useSyncExternalStore handles the SSR-vs-client
// snapshot split safely (server never has `navigator`/`Notification`) and,
// unlike reading them in an effect, doesn't need a setState call that
// itself triggers an extra render.
function noopSubscribe() {
  return () => {};
}
function getSupportSnapshot() {
  return "serviceWorker" in navigator && "PushManager" in window;
}
function getServerSupportSnapshot() {
  return false;
}
function getPermissionSnapshot(): NotificationPermission {
  return typeof Notification === "undefined" ? "default" : Notification.permission;
}
function getServerPermissionSnapshot(): NotificationPermission {
  return "default";
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
  const permission = useSyncExternalStore(noopSubscribe, getPermissionSnapshot, getServerPermissionSnapshot);
  const [status, setStatus] = useState<Status>("checking");

  // Actual subscription status is genuinely async (a real browser API call),
  // unlike the two synchronous reads above - a legitimate use of an effect.
  useEffect(() => {
    if (!isSupported || permission === "denied") return;
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setStatus(sub ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, [isSupported, permission]);

  async function enable() {
    if (!publicKey) return;
    setStatus("busy");
    try {
      const result = await Notification.requestPermission();
      if (result !== "granted") {
        // A state change forces a re-render, which re-reads the permission
        // snapshot below and picks up the denial then - requestPermission()
        // itself doesn't notify useSyncExternalStore.
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

  // No key configured means push can never work here - a visible control
  // that silently does nothing on tap is worse than no control at all.
  if (!publicKey || !isSupported || status === "checking") return null;

  if (permission === "denied") {
    return (
      <p className="mt-2 flex min-h-11 items-center gap-1.5 font-display text-[0.68rem] font-semibold text-ink-soft">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        Reminders blocked - enable notifications for this site in your browser settings
      </p>
    );
  }

  return (
    <div className="mt-2">
      {status === "off" && (
        <p className="mb-1 font-body text-[0.7rem] text-ink-soft">A nudge each morning when cases are due.</p>
      )}
      <button
        onClick={status === "on" ? disable : enable}
        disabled={status === "busy"}
        className="flex min-h-11 items-center gap-1.5 font-display text-[0.68rem] font-semibold text-ink-soft disabled:opacity-60"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {status === "on" ? "Daily reminder on" : "Enable daily reminder"}
      </button>
    </div>
  );
}
