/**
 * Tests for the HumanVerifyChallenge logic
 * - validateAnswer correctness
 * - CHALLENGE_POOL integrity (no duplicate IDs, all have valid answers)
 * - getRandomChallenge returns a valid challenge
 */
import { describe, it, expect } from "vitest";
import {
  CHALLENGE_POOL,
  validateAnswer,
  getRandomChallenge,
  type Challenge,
} from "../client/src/components/HumanVerifyChallenge";

describe("CHALLENGE_POOL integrity", () => {
  it("has at least 20 questions", () => {
    expect(CHALLENGE_POOL.length).toBeGreaterThanOrEqual(20);
  });

  it("has no duplicate IDs", () => {
    const ids = CHALLENGE_POOL.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every challenge has a non-empty question", () => {
    for (const c of CHALLENGE_POOL) {
      expect(c.question.trim().length).toBeGreaterThan(0);
    }
  });

  it("every challenge has at least one accepted answer", () => {
    for (const c of CHALLENGE_POOL) {
      expect(c.answers.length).toBeGreaterThan(0);
    }
  });

  it("all answers are lowercase strings", () => {
    for (const c of CHALLENGE_POOL) {
      for (const a of c.answers) {
        expect(a).toBe(a.toLowerCase());
      }
    }
  });
});

describe("validateAnswer", () => {
  const mathChallenge: Challenge = {
    id: 999,
    question: "What is 7 + 5?",
    answers: ["12"],
  };

  it("accepts correct exact answer", () => {
    expect(validateAnswer("12", mathChallenge)).toBe(true);
  });

  it("accepts correct answer with leading/trailing spaces", () => {
    expect(validateAnswer("  12  ", mathChallenge)).toBe(true);
  });

  it("rejects wrong answer", () => {
    expect(validateAnswer("11", mathChallenge)).toBe(false);
  });

  it("rejects empty answer", () => {
    expect(validateAnswer("", mathChallenge)).toBe(false);
  });

  it("is case-insensitive for word answers", () => {
    const wordChallenge: Challenge = {
      id: 998,
      question: "What planet do we live on?",
      answers: ["earth"],
    };
    expect(validateAnswer("Earth", wordChallenge)).toBe(true);
    expect(validateAnswer("EARTH", wordChallenge)).toBe(true);
    expect(validateAnswer("earth", wordChallenge)).toBe(true);
  });

  it("accepts multiple valid answers", () => {
    const multiChallenge: Challenge = {
      id: 997,
      question: "How many days in a week?",
      answers: ["7", "seven"],
    };
    expect(validateAnswer("7", multiChallenge)).toBe(true);
    expect(validateAnswer("seven", multiChallenge)).toBe(true);
    expect(validateAnswer("Seven", multiChallenge)).toBe(true);
    expect(validateAnswer("8", multiChallenge)).toBe(false);
  });
});

describe("getRandomChallenge", () => {
  it("returns a valid challenge from the pool", () => {
    const c = getRandomChallenge();
    expect(c).toBeDefined();
    expect(c.id).toBeGreaterThan(0);
    expect(c.question.length).toBeGreaterThan(0);
    expect(c.answers.length).toBeGreaterThan(0);
  });

  it("returns different challenges over multiple calls (probabilistic)", () => {
    const results = new Set<number>();
    for (let i = 0; i < 50; i++) {
      results.add(getRandomChallenge().id);
    }
    // With 30 questions and 50 draws, we should see at least 5 unique ones
    expect(results.size).toBeGreaterThan(5);
  });
});
