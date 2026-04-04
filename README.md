# Sakis Athan - Professional AI Portfolio

![Portfolio Preview](./client/public/favicon.ico)

Welcome to the open-source repository for my professional portfolio and AI solutions platform. This platform serves as a central hub for my work as a **Senior Software Engineer & AI Orchestrator**, demonstrating live integrations of AI systems, real-time data automation, and cutting-edge web architecture.

## 🚀 Features

*   **Interactive AI Assistant:** A built-in, context-aware chatbot powered by **Google Gemini 3 Flash**. It understands my entire professional background, LinkedIn history, and project portfolio, capable of answering visitor questions autonomously in multiple languages.
*   **Secure Contact System:** Bot-protected and integrated with a robust Gmail SMTP transporter via Nodemailer, ensuring client inquiries are routed safely and immediately.
*   **Dynamic Project Showcase:** Connects visitors directly to live instances of my AI Agent models, automation pipelines, and custom real estate ROI applications.
*   **Premium UI/UX:** Built with React, TailwindCSS, and Framer Motion, utilizing a sleek dark-mode aesthetic with interactive micro-animations.

## 🛠️ Technology Stack

This application is engineered as a modern, full-stack monorepo featuring end-to-end type safety:

*   **Frontend:** React 19, Vite, TailwindCSS, Radix UI components
*   **Backend:** Node.js, Express (Vercel Serverless Function compatible)
*   **API Layer:** tRPC (TypeScript Remote Procedure Call)
*   **Database / ORM:** Drizzle ORM (MySQL ready)
*   **AI Engine:** Google Generative Language API (Gemini REST)

## 💻 Local Development

To run this site locally, ensure you have Node.js and `pnpm` installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Environment Variables:**
    Create a `.env` file in the root directory and add the necessary API keys:
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    GMAIL_APP_PASSWORD=your_gmail_app_password
    ```
3.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## 🌐 Deployment (Vercel)

This repository is optimized for one-click deployment on **Vercel**. 

The configuration uses a specialized `vercel.json` and a serverless entry point (`api/index.ts`) that automatically converts the Express backend into Vercel Serverless Edge Functions, while Vite seamlessly compiles the frontend layout to Vercel's global CDN.

To deploy:
1. Import this repository to Vercel.
2. Add your environment variables (`GEMINI_API_KEY` and `GMAIL_APP_PASSWORD`) in the Vercel Dashboard.
3. Deploy!

## 📬 Get in Touch

Whether you need a custom AI agent, automated workflow pipelines, or enterprise SaaS development, I'd love to hear about it.
*   **Email:** sakis@sakisathan.com
*   **LinkedIn:** [Sakis Athanasopoulos](https://www.linkedin.com/in/sakis-athan/)

---
*Architected and maintained by Athanasios (Sakis) Athanasopoulos.*
