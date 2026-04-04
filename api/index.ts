// @ts-ignore - TS2307 bypass. Using required require logic to bypass Vercel NFT problems.
import path from "path";

let cachedApp: any = null;

async function handler(req: any, res: any) {
  try {
    if (!cachedApp) {
      const appPath = path.join(__dirname, "../dist/app.js");
      // @ts-ignore
      const appModule = require(appPath);
      cachedApp = appModule.setupExpressApp();
    }
    return cachedApp(req, res);
  } catch (error: any) {
    console.error("Vercel Function Runtime Error:", error);
    try {
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message || "A critical error occurred during initialization.",
        code: "FUNCTION_INITIALIZATION_FAILED",
        stack: error.stack
      });
    } catch(e) {
      // Fallback if express response methods fail
      res.end(`{"error":"Critical Error: ${error.message}"}`);
    }
  }
}

// Support both ESM default and CommonJS module exports for Vercel
export default handler;
module.exports = handler;
