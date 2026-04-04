import express from "express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";

/**
 * Initializes the base Express application.
 * Optimized for Vercel Serverless environment.
 */
export function setupExpressApp() {
  const app = express();

  app.use(express.json());

  // Simple, stable health check
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      env: process.env.NODE_ENV || "production",
      deployed_at: new Date().toISOString()
    });
  });

  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        console.error(`[tRPC Error] ${path}: ${error.message}`);
      },
    })
  );

  return app;
}
