import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 */

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.url === '/api/health' || req.url === '/api/health/') {
    try {
      if (!cachedApp) {
        const { setupExpressApp } = await import("../server/_core/app");
        cachedApp = setupExpressApp();
      }
      return cachedApp(req, res);
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        source: "vercel-entry-point-diagnostics",
        message: err.message,
        hint: "Dynamic import failed. Check Vercel logs.",
        stack: err.stack
      });
    }
  }

  try {
    if (!cachedApp) {
      const { setupExpressApp } = await import("../server/_core/app");
      cachedApp = setupExpressApp();
    }
    return cachedApp(req, res);
  } catch (error: any) {
    console.error("Vercel Function Runtime Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "A critical error occurred during initialization.",
      code: "FUNCTION_INITIALIZATION_FAILED",
      stack: error.stack
    });
  }
}
