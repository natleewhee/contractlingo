import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { getAllQuestions, getAllSubscriptions, getDueQuestionIds, removeSubscription } from "@/lib/db";

// Triggered daily by Vercel Cron (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET` automatically when that env var is
// set on the project - this rejects anyone else hitting the route.
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) {
    return NextResponse.json({ error: "VAPID keys not configured" }, { status: 500 });
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);

  const allQuestions = await getAllQuestions();
  const allQuestionIds = allQuestions.map((q) => q.id);
  const subscriptions = await getAllSubscriptions();

  // Progress is per-user now, not one shared count - each subscriber gets
  // their own due count in their own notification.
  let sent = 0;
  let removed = 0;
  let skippedNothingDue = 0;
  await Promise.all(
    subscriptions.map(async (sub) => {
      const dueIds = await getDueQuestionIds(sub.userId, allQuestionIds);
      if (dueIds.length === 0) {
        skippedNothingDue += 1;
        return;
      }

      const payload = JSON.stringify({
        title: "ContractLingo",
        body: `${dueIds.length} case${dueIds.length === 1 ? "" : "s"} waiting for you today.`,
        url: "/session?minutes=10",
      });

      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent += 1;
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await removeSubscription(sub.endpoint);
          removed += 1;
        } else {
          console.error("Push send failed", err);
        }
      }
    })
  );

  return NextResponse.json({ sent, removed, skippedNothingDue, totalSubscribers: subscriptions.length });
}
