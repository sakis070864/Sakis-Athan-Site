import express from "express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";

/**
 * Initializes the base Express application with all middleware and routes.
 * This function handles NO server-start or Vite logic, making it safe for 
 * Vercel Serverless environment.
 */
export function setupExpressApp() {
  const app = express();

  // Basic middleware
  app.use(express.json());

  // Deep Health Check for Vercel diagnostics
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      environment: process.env.VERCEL ? "production" : "development",
      diagnostics: {
        hasGeminiKey: !!process.env.GEMINI_API_KEY,
        hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeVersion: process.version,
        region: process.env.VERCEL_REGION || "local",
      }
    });
  });

  // OAuth Routes
  registerOAuthRoutes(app);

  // tRPC Middleware
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        console.error(`[tRPC Error] Error at path: ${path}. Message: ${error.message}`);
      },
    })
  );

  return app;
}
