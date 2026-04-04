import { setupExpressApp } from "../server/_core/app";

/**
 * Vercel Serverless Function entry point with Global Error Catching.
 * This ensures that if the app crashes during startup (cold start), 
 * we see the actual error instead of a generic Vercel 500 page.
 */
let app: any;

try {
  app = setupExpressApp();
} catch (error) {
  console.error("[CRITICAL] Failed to initialize Express app:", error);
  // Fail-safe handler for initialization errors
  app = (req: any, res: any) => {
    res.status(500).json({
      error: "Initialization Failure",
      message: error instanceof Error ? error.message : String(error),
      stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined,
      hint: "Check your Environment Variables in the Vercel Dashboard."
    });
  };
}

export default app;
