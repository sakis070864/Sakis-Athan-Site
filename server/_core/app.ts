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

  // Health check for Vercel diagnostics
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", environment: process.env.VERCEL ? "production" : "development" });
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
