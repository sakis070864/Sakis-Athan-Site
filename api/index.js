/**
 * Sakis Athan Portfolio - Vercel Serverless Entry Point
 * Bypasses full @vercel/node Typescript compilation of the backend.
 * Uses the pre-built, CJS bundled backend from dist/index.js.
 */
const { setupExpressApp } = require("../dist/app.js");

let cachedApp = null;

module.exports = function handler(req, res) {
  try {
    if (!cachedApp) {
      cachedApp = setupExpressApp();
    }
    return cachedApp(req, res);
  } catch (error) {
    console.error("Vercel Function Runtime Error:", error);
    
    // Provide a detailed JSON response instead of a generic Vercel 500 error page
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "A critical error occurred during initialization.",
      code: "FUNCTION_INITIALIZATION_FAILED",
      stack: error.stack
    });
  }
};
