import { setupExpressApp } from "../server/_core/app";

/**
 * Vercel Serverless Function entry point.
 * We import the app directly from app.ts to ensure ZERO mentions of 
 * development tools (like Vite) in the production build path.
 */
const app = setupExpressApp();

export default app;
