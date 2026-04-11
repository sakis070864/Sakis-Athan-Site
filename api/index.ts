const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- SYSTEM PROMPT ---
const PORTFOLIO_SYSTEM_PROMPT = `You are Sakis's personal AI assistant on his professional portfolio website.
Sakis is Athanasios (Sakis) Athanasopoulos — a Senior Software Engineer and AI Orchestrator based in Agios Dimitrios, Athens, Greece.

Your role is to help visitors learn about Sakis's professional background, skills, and services.
Be warm, professional, and concise. Always answer in the same language the visitor writes in.

=== ABOUT SAKIS (from his LinkedIn) ===
- Full name: Athanasios (Sakis) Athanasopoulos
- Title: Senior Software Engineer | AI Automation & Full Stack Developer | Custom AI Solutions for Any Industry
- Location: Agios Dimitrios, Attiki, Greece
- Email: sakis@sakis-athan.com
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
Visitors can contact Sakis via the contact form on this website or directly at sakis@sakis-athan.com.
LinkedIn: https://www.linkedin.com/in/sakis-athan/

If asked about pricing, say that Sakis provides custom quotes based on project scope — encourage them to use the contact form.
If asked something outside your knowledge about Sakis, politely say you're not sure and suggest contacting him directly.
Keep responses concise (2-4 sentences typically) unless a detailed explanation is requested.`;

// --- CHAT HANDLER ---
const chatHandler = async (req: any, res: any) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Explicitly using Gemini 3 Flash as requested
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: PORTFOLIO_SYSTEM_PROMPT
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }))
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return res.json({ content: text });
  } catch (error: any) {
    console.error("[Chat API Error]:", error);
    return res.status(500).json({ 
      error: "Internal Server Error",
      message: error?.message || "The AI assistant is temporarily unavailable.",
      code: "AI_SERVICE_ERROR"
    });
  }
};

// --- CONTACT HANDLER (Nodemailer + Gmail SMTP) ---
const nodemailer = require("nodemailer");

const contactHandler = async (req: any, res: any) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const appPassword = process.env.GMAIL_APP_PASSWORD;
    if (!appPassword) {
      throw new Error("GMAIL_APP_PASSWORD environment variable is not set");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mastorematas@gmail.com",
        pass: appPassword,
      },
    });

    // HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 32px; border-radius: 12px; border: 1px solid #30363d;">
        <div style="border-bottom: 2px solid #00e5ff; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; color: #00e5ff; font-size: 20px;">&#128233; New Contact Form Message</h2>
          <p style="margin: 4px 0 0; color: #8b949e; font-size: 13px;">From your portfolio website — sakisathan.com</p>
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
      "New contact form message from sakisathan.com",
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

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <mastorematas@gmail.com>`,
      to: "sakis@sakis-athan.com",
      replyTo: `"${name}" <${email}>`,
      subject: "ATHANASIOS Site Contact form",
      text: textBody,
      html: htmlBody,
    });

    console.log(`[Contact] Email sent from ${name} <${email}>`);
    return res.json({ success: true });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return res.status(500).json({
      error: "Failed to send message",
      message: error?.message || "Please try again or contact me directly at sakis@sakis-athan.com.",
    });
  }
};

// --- APP INITIALIZATION ---
const app = express();
app.use(express.json());

// Main Chat Endpoint
app.post("/api/chat", chatHandler);

// Contact Form Endpoint (Nodemailer + Gmail SMTP)
app.post("/api/contact", contactHandler);

// Health Check Endpoint (Direct within API function)
app.get("/api/health", (req: any, res: any) => {
  res.status(200).json({ 
    status: "ok", 
    mode: "standalone_vercel_function_cjs",
    gemini_configured: !!process.env.GEMINI_API_KEY,
    gmail_configured: !!process.env.GMAIL_APP_PASSWORD,
    deployed_at: new Date().toISOString()
  });
});

// Vercel Entry Point (CommonJS)
module.exports = app;
