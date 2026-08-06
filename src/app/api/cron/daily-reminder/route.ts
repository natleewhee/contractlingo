import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { getAllSubscriptions, getDueQuestionIds, removeSubscription } from "@/lib/db";
import { SESSION_QUESTIONS } from "@/lib/questions";

const ALL_QUESTION_IDS = SESSION_QUESTIONS.map((q) => q.id);

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

  const dueIds = await getDueQuestionIds(ALL_QUESTION_IDS);
  if (dueIds.length === 0) {
    return NextResponse.json({ sent: 0, skipped: "nothing due today" });
  }

  const subscriptions = await getAllSubscriptions();
  const payload = JSON.stringify({
    title: "ContractLingo",
    body: `${dueIds.length} case${dueIds.length === 1 ? "" : "s"} waiting for you today.`,
    url: "/session",
  });

  let sent = 0;
  let removed = 0;
  await Promise.all(
    subscriptions.map(async (sub) => {
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

  return NextResponse.json({ sent, removed, dueToday: dueIds.length });
}
