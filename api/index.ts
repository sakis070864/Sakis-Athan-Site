import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from "path";

/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 * Dynamically importing the pre-built backend to bypass @vercel/node bundling crashes.
 */

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
      // Vercel includeFiles "dist/**" puts dist in the Lambda deployment at /var/task/dist
      // Use __dirname to reliably locate it from /var/task/api
      const distPath = path.resolve(__dirname, "../dist/index.js");
      const { setupExpressApp } = await import(distPath);
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
