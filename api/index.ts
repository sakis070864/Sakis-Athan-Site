import { setupExpressApp } from "../server/_core/app";

/**
 * Standard Vercel Serverless Function entry point.
 * Includes a top-level error boundary to catch initialization crashes.
 */
let app;
try {
  app = setupExpressApp();
} catch (error: any) {
  console.error("Vercel Function Initialization Error:", error);
  // Emergency fallback app to report the error as JSON
  const express = require('express');
  const fallback = express();
  fallback.all('*', (req: any, res: any) => {
    res.status(500).json({
      error: "Initialization Failure",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      hint: "Check server logs or environment variables."
    });
  });
  app = fallback;
}

export default app;
