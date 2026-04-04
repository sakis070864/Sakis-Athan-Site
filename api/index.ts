import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setupExpressApp } from '../server/_core/app';

/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 * Statically imported to ensure Vercel's bundler traces all backend dependencies correctly.
 */

let cachedApp: any = null;

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
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
