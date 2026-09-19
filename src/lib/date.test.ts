import { describe, expect, it } from "vitest";
import { dateKeyInAppTimezone, daysAgoKey, todayKey } from "./date";

describe("dateKeyInAppTimezone", () => {
  it("rolls over to the next SGT calendar day before UTC midnight", () => {
    // 2024-01-01T16:30:00Z is 2024-01-02T00:30 in Asia/Singapore (UTC+8) -
    // the exact case that broke when this used raw UTC dates.
    expect(dateKeyInAppTimezone(new Date("2024-01-01T16:30:00Z"))).toBe("2024-01-02");
  });

  it("stays on the same SGT calendar day just before the rollover", () => {
    // One minute earlier in UTC is still 2024-01-01T23:59 in Singapore.
    expect(dateKeyInAppTimezone(new Date("2024-01-01T15:59:00Z"))).toBe("2024-01-01");
  });
});

describe("daysAgoKey", () => {
  it("returns the same key as todayKey() for 0 days ago", () => {
    expect(daysAgoKey(0)).toBe(todayKey());
  });

  it("returns a key one calendar day before todayKey() for 1 day ago", () => {
    const today = new Date(`${todayKey()}T12:00:00+08:00`);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    expect(daysAgoKey(1)).toBe(dateKeyInAppTimezone(yesterday));
  });
});
