import { NextRequest, NextResponse } from "next/server";
import { getAdminStats } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";

// Operator-only visibility into usage and content quality. Visit with
// ?key=<ADMIN_SECRET> or an `Authorization: Bearer <ADMIN_SECRET>` header.
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const stats = await getAdminStats();
  return NextResponse.json(stats);
}
