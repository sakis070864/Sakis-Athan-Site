/**
 * Gemini API Key Validation Test
 * --------------------------------
 * Verifies that GEMINI_API_KEY is set in the environment and that it can
 * successfully reach the Gemini 3 Flash Preview endpoint with a minimal prompt.
 */
import { describe, it, expect } from "vitest";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Use the exact model confirmed available on this account
const GEMINI_MODEL = "gemini-3-flash-preview";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

describe("Gemini API Key & Model", () => {
  it("GEMINI_API_KEY environment variable is set and non-empty", () => {
    expect(GEMINI_API_KEY).toBeDefined();
    expect(typeof GEMINI_API_KEY).toBe("string");
    expect((GEMINI_API_KEY as string).trim().length).toBeGreaterThan(10);
  });

  it(
    "can reach Gemini 3 Flash Preview API with a minimal prompt",
    async () => {
      if (!GEMINI_API_KEY) {
        console.warn("Skipping live API test — GEMINI_API_KEY not set");
        return;
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Reply with exactly the word: OK" }] }],
          generationConfig: { maxOutputTokens: 10, temperature: 0 },
        }),
      });

      expect(response.status).toBe(200);

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
        }>;
        error?: { message: string };
      };

      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }

      expect(data.candidates).toBeDefined();
      expect(data.candidates!.length).toBeGreaterThan(0);
      const text = data.candidates![0]?.content?.parts?.[0]?.text ?? "";
      expect(text.trim().length).toBeGreaterThan(0);
      console.log(`✓ Gemini 3 Flash responded: "${text.trim()}"`);
    },
    20000 // 20s timeout for network call
  );
});
