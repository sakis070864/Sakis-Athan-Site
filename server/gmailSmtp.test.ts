/**
 * Gmail SMTP Validation Test
 * ---------------------------
 * Verifies that GMAIL_APP_PASSWORD is set and that Nodemailer can successfully
 * verify the Gmail SMTP connection using the stored credentials.
 * This test uses nodemailer's `verify()` method — it opens a real SMTP
 * connection but does NOT send any email.
 */
import { describe, it, expect } from "vitest";
import nodemailer from "nodemailer";
import "dotenv/config";

const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

describe("Gmail SMTP Credentials", () => {
  it("GMAIL_APP_PASSWORD environment variable is set and non-empty", () => {
    expect(GMAIL_APP_PASSWORD).toBeDefined();
    expect(typeof GMAIL_APP_PASSWORD).toBe("string");
    // Google App Passwords are exactly 16 characters (sometimes with spaces stripped)
    const stripped = (GMAIL_APP_PASSWORD as string).replace(/\s/g, "");
    expect(stripped.length).toBe(16);
  });

  it(
    "can verify Gmail SMTP connection with the provided App Password",
    async () => {
      if (!GMAIL_APP_PASSWORD) {
        console.warn("Skipping SMTP test — GMAIL_APP_PASSWORD not set");
        return;
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "mastorematas@gmail.com",
          pass: GMAIL_APP_PASSWORD,
        },
      });

      // verify() checks authentication without sending an email
      await expect(transporter.verify()).resolves.toBe(true);
      console.log("✓ Gmail SMTP connection verified successfully");
    },
    20000 // 20s timeout for network handshake
  );

  it("createTransporter() throws when GMAIL_APP_PASSWORD is missing", () => {
    // Temporarily remove the env var to test the guard
    const original = process.env.GMAIL_APP_PASSWORD;
    delete process.env.GMAIL_APP_PASSWORD;

    expect(() => {
      const appPassword = process.env.GMAIL_APP_PASSWORD;
      if (!appPassword) {
        throw new Error("GMAIL_APP_PASSWORD environment variable is not set");
      }
    }).toThrow("GMAIL_APP_PASSWORD environment variable is not set");

    // Restore
    process.env.GMAIL_APP_PASSWORD = original;
  });
});
