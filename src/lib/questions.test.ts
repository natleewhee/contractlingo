import { describe, expect, it } from "vitest";
import { SESSION_QUESTIONS } from "./questions";

describe("SESSION_QUESTIONS content invariants", () => {
  it("has a non-trivial bank with unique ids", () => {
    const ids = SESSION_QUESTIONS.map((q) => q.id);
    expect(SESSION_QUESTIONS.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every question exactly two non-empty options and a valid correctIndex", () => {
    for (const q of SESSION_QUESTIONS) {
      expect(q.options, `question ${q.id}`).toHaveLength(2);
      expect(q.options[0].length, `question ${q.id} option 0`).toBeGreaterThan(0);
      expect(q.options[1].length, `question ${q.id} option 1`).toBeGreaterThan(0);
      expect([0, 1], `question ${q.id} correctIndex`).toContain(q.correctIndex);
      expect(q.scenario.length, `question ${q.id} scenario`).toBeGreaterThan(0);
      expect(q.explanation.length, `question ${q.id} explanation`).toBeGreaterThan(0);
    }
  });

  // Regression guard for a real bug: every single question once had
  // correctIndex === 0, so tapping the first option every time scored
  // 100% without reading anything. This doesn't demand an exact split,
  // just that the answer position isn't a static tell.
  it("does not put the correct answer at the same position for every question", () => {
    const correctIndices = new Set(SESSION_QUESTIONS.map((q) => q.correctIndex));
    expect(correctIndices.size).toBe(2);

    const zeroCount = SESSION_QUESTIONS.filter((q) => q.correctIndex === 0).length;
    const oneCount = SESSION_QUESTIONS.length - zeroCount;
    const minoritySharePercent = (100 * Math.min(zeroCount, oneCount)) / SESSION_QUESTIONS.length;
    expect(minoritySharePercent).toBeGreaterThan(30);
  });
});
