import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { getAllQuestions, getSubscriptionsWithDueCounts, removeSubscription } from "@/lib/db";

// Triggered daily by Vercel Cron (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET` automatically when that env var is
// set on the project - this rejects anyone else hitting the route.
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

const PUSH_BATCH_SIZE = 20;

function chunk<T>(items: T[], size: number): T[][] {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size) batches.push(items.slice(i, i + size));
  return batches;
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
  // One grouped query for every subscriber's due count, instead of a
  // per-subscriber round trip each carrying the full question bank as a
  // parameter - see getSubscriptionsWithDueCounts in src/lib/db.ts.
  const subscriptions = await getSubscriptionsWithDueCounts(allQuestions.length);

  let sent = 0;
  let removed = 0;
  let skippedNothingDue = 0;

  // Sent in bounded batches rather than one unbounded Promise.all - at a
  // large subscriber count, firing every push concurrently in one shot
  // risks tripping the platform's own execution/concurrency limits.
  for (const batch of chunk(subscriptions, PUSH_BATCH_SIZE)) {
    await Promise.all(
      batch.map(async (sub) => {
        if (sub.dueCount === 0) {
          skippedNothingDue += 1;
          return;
        }

        const payload = JSON.stringify({
          title: "ContractLingo",
          body: `${sub.dueCount} case${sub.dueCount === 1 ? "" : "s"} waiting for you today.`,
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
  }

  return NextResponse.json({ sent, removed, skippedNothingDue, totalSubscribers: subscriptions.length });
}
