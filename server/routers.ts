import { z } from "zod";
import nodemailer from "nodemailer";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

// ─── Gmail SMTP transporter (Nodemailer) ─────────────────────────────────────
// Credentials are stored securely as environment variables.
// GMAIL_USER  = mastorematas@gmail.com (SMTP sender)
// GMAIL_APP_PASSWORD = 16-char Google App Password (never hardcoded)
function createTransporter() {
  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    throw new Error("GMAIL_APP_PASSWORD environment variable is not set");
  }
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: "mastorematas@gmail.com",
      pass: appPassword,
    },
  });
}

// ─── Gemini 3 Flash — direct REST integration (no SDK needed) ───────────────
// API key is stored securely as GEMINI_API_KEY environment variable.
// On self-hosted servers, set it in your .env file.
const GEMINI_MODEL = "gemini-3-flash-preview";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ─── System prompt for the AI portfolio assistant ──────────────────────────
const PORTFOLIO_SYSTEM_PROMPT = `You are Sakis's personal AI assistant on his professional portfolio website.
Sakis is Athanasios (Sakis) Athanasopoulos — a Senior Software Engineer and AI Orchestrator based in Agios Dimitrios, Athens, Greece.

Your role is to help visitors learn about Sakis's professional background, skills, and services.
Be warm, professional, and concise. Always answer in the same language the visitor writes in.

=== ABOUT SAKIS (from his LinkedIn) ===
- Full name: Athanasios (Sakis) Athanasopoulos
- Title: Senior Software Engineer | AI Automation & Full Stack Developer | Custom AI Solutions for Any Industry
- Location: Agios Dimitrios, Attiki, Greece
- Email: sakis@sakisathan.com
- LinkedIn: https://www.linkedin.com/in/sakis-athan/
- Open to work: Hybrid & Remote
- Experience: 40+ years in software development, specialising in AI automation for the last several years

=== SAKIS'S OWN WORDS (from LinkedIn About) ===
"Stop losing money on manual tasks. If your business relies on manual data entry and spreadsheets, you are burning profit every day.
I build custom AI tools that handle the heavy lifting for you:
🚀 Shipping & Logistics: Automated invoice processing—from hours to seconds.
🏗️ Real Estate: Live ROI and Risk dashboards for instant decisions.
📊 Excel Automation: Turn static spreadsheets into dynamic profit engines.
The Result? You scale faster, eliminate errors, and keep more money."

=== AI ORCHESTRATOR PHILOSOPHY ===
Sakis has reached a stage where his AI Agents have full control of his development environment. They run autonomously — debugging code, running security checks, using Gemini CLI for deep research, and deploying applications. He describes himself as an "Architect" who manages a team of loyal digital experts rather than doing manual labor. He often runs three agents simultaneously that collaborate, solve problems together, and provide detailed reports.

=== REAL PROJECTS BUILT (from LinkedIn Featured) ===
1. AI Multilingual Chatbot — Live demo at linkedin-sakis-bot.vercel.app. Converses in all languages to demonstrate AI automation.
2. AI Logistics Automation Playground — Live at linkedin-invoice.vercel.app. Automatically reads logistics invoices and organizes data in seconds.
3. EstateNexus Dubai | AI Real Estate Pro — Live at linkedin-nexus.vercel.app. Enterprise-grade AI terminal for real-time ROI analysis of Dubai real estate plots.
4. AI Plot Investor PRO — Live at linkedin-oikopedo.vercel.app. Professional AI tool for Real Estate ROI analysis with financial modeling and AI risk auditing.
5. Excel Automation Dashboard — Live at linkedin-excel.vercel.app. Transforms static spreadsheets into live, interactive dashboards.
6. AI Legal Intake & Triage Pro — Digital paralegal using Google Search Grounding. Generates case summaries, risk analysis, and viability scores.
7. Neural AI Bouncer — Gemini Flash-powered CAPTCHA replacement using natural conversation for human verification.
8. ZKP Security — Zero-Knowledge Proof authentication with behavioral biometrics (keystroke dynamics). No raw biometric data stored.
9. Biometric Control Panel — Behavioral biometrics using Dwell Time and Flight Time keystroke analysis for passwordless authentication.

=== SERVICES SAKIS OFFERS ===
- Custom Software Development
- Web Development
- Application Development
- SaaS Development
- Cloud Application Development
- IT Consulting
- AI Automation Solutions (invoice processing, data entry elimination)
- AI Agent Orchestration (multi-agent systems)
- Real Estate AI Tools (ROI dashboards, risk analysis)
- Security Systems (ZKP, biometrics, bot detection)
- Excel & Spreadsheet Automation
- Legal Tech AI Solutions

=== TECHNICAL EXPERTISE ===
AI & Automation: Gemini AI, GPT-4, Claude, LangChain, AutoGen, Flowise, n8n, Make.com, Zapier, Prompt Engineering, RAG Systems, Multi-Agent Orchestration
Full Stack: React, Next.js, TypeScript, Node.js, Python, FastAPI, PostgreSQL, MongoDB, Redis, Supabase, Docker, AWS, Vercel
Security: Zero-Knowledge Proofs, Pedersen Commitments, snarkjs, circom, WebAssembly, Behavioral Biometrics, Keystroke Dynamics

=== CONTACT ===
Visitors can contact Sakis via the contact form on this website or directly at sakis@sakisathan.com.
LinkedIn: https://www.linkedin.com/in/sakis-athan/

If asked about pricing, say that Sakis provides custom quotes based on project scope — encourage them to use the contact form.
If asked something outside your knowledge about Sakis, politely say you're not sure and suggest contacting him directly.
Keep responses concise (2-4 sentences typically) unless a detailed explanation is requested.`;

// ─── Contact message schema ─────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
});

// ─── Chat message schema ─────────────────────────────────────────────────────
const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Contact form procedure (Gmail SMTP via Nodemailer) ────────────────────
  contact: router({
    send: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
      const { name, email, subject, message } = input;

      // Build a clean HTML email body
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 32px; border-radius: 12px; border: 1px solid #30363d;">
          <div style="border-bottom: 2px solid #00e5ff; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #00e5ff; font-size: 20px;">&#128233; New Contact Form Message</h2>
            <p style="margin: 4px 0 0; color: #8b949e; font-size: 13px;">From your portfolio website — sakis.manus.space</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #8b949e; width: 80px;">From</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8b949e;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00e5ff;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #8b949e;">Subject</td><td style="padding: 8px 0;">${subject || "(no subject)"}</td></tr>
          </table>
          <div style="background: #161b22; border-radius: 8px; padding: 20px; border-left: 3px solid #00e5ff;">
            <p style="margin: 0 0 8px; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #30363d; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #00e5ff; color: #0d1117; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
          </div>
        </div>
      `;

      // Plain-text fallback
      const textBody = [
        "New contact form message from sakis.manus.space",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        `From:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject || "(no subject)"}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "",
        message,
        "",
        `Reply directly to: ${email}`,
      ].join("\n");

      try {
        const transporter = createTransporter();

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <mastorematas@gmail.com>`,
          to: "sakis@sakisathan.com",
          replyTo: `"${name}" <${email}>`,
          subject: "ATHANASIOS Site Contact form",
          text: textBody,
          html: htmlBody,
        });

        console.log(`[Contact] Email sent from ${name} <${email}>`);
        return { success: true };
      } catch (err) {
        console.error("[Contact] Failed to send email via Gmail SMTP:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send your message. Please try again or contact me directly at sakis@sakisathan.com.",
        });
      }
    }),
  }),

  // ─── AI Chatbot procedure (Gemini 3 Flash) ──────────────────────────────
  chat: router({
    message: publicProcedure.input(chatSchema).mutation(async ({ input }) => {
      const { messages } = input;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gemini API key is not configured. Please contact the site owner.",
        });
      }

      // Build Gemini-format contents array
      // System instruction is passed separately; conversation history maps to user/model roles
      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // System instruction keeps the assistant in character
            systemInstruction: {
              parts: [{ text: PORTFOLIO_SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
              topP: 0.95,
            },
          }),
        });

        if (!response.ok) {
          const errBody = await response.text();
          console.error(`[Chat] Gemini API error ${response.status}:`, errBody);
          throw new Error(`Gemini returned status ${response.status}`);
        }

        const data = await response.json() as {
          candidates?: Array<{
            content?: { parts?: Array<{ text?: string }> };
          }>;
          error?: { message: string };
        };

        if (data.error) {
          throw new Error(`Gemini error: ${data.error.message}`);
        }

        const content =
          data.candidates?.[0]?.content?.parts?.[0]?.text ??
          "I'm sorry, I couldn't generate a response. Please try again.";

        return { content };
      } catch (err) {
        console.error("[Chat] Gemini error:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "The AI assistant is temporarily unavailable. Please try again shortly.",
        });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
