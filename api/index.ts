import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 * 
 * Optimized for resilience:
 * 1. Lazy-loads the main Express app to isolate initialization errors.
 * 2. Provides a dedicated health-check path that works even if the main app fails.
 * 3. Guarantees JSON error responses to prevent tRPC client parsing errors (Unexpected token 'A').
 */

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Immediate diagnostics for health check
  if (req.url === '/api/health' || req.url === '/api/health/') {
    try {
      const { setupExpressApp } = await import("../server/_core/app");
      const app = setupExpressApp();
      return app(req, res);
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        source: "vercel-entry-point-diagnostics",
        message: err.message,
        hint: "Check for missing dependencies or path alias issues in server/_core/app.ts",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }

  // 2. Standard Request Handling with Error Boundary
  try {
    if (!cachedApp) {
      const { setupExpressApp } = await import("../server/_core/app");
      cachedApp = setupExpressApp();
    }
    return cachedApp(req, res);
  } catch (error: any) {
    console.error("Vercel Function Runtime Error:", error);
    
    // Ensure we ALWAYS return JSON so the frontend (tRPC) doesn't crash with "Unexpected token 'A'"
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "A critical error occurred during initialization.",
      code: "FUNCTION_INITIALIZATION_FAILED",
      suggestion: "Check Vercel logs and ensure all environment variables are set.",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
