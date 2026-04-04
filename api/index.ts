import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setupExpressApp } from '../server/_core/app';

/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 * 
 * We MUST use static imports at the top level. If we use dynamic `await import()`,
 * Vercel's Edge/Node static analyzer (@vercel/nft) cannot detect that the `server/`, 
 * `shared/`, and `drizzle/` directories are dependencies of this file, and will 
 * prune them from the final deployment bundle, resulting in "Cannot find module" errors.
 */

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Immediate diagnostics for health check
  if (req.url === '/api/health' || req.url === '/api/health/') {
    try {
      if (!cachedApp) {
        cachedApp = setupExpressApp();
      }
      return cachedApp(req, res);
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
