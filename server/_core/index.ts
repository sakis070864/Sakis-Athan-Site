import { createServer } from "node:http";
import { setupExpressApp } from "./app";

/**
 * Local development server entry point.
 * This file is NOT imported by Vercel.
 */
async function startServer() {
  const app = setupExpressApp();
  const server = createServer(app);
  const port = process.env.PORT || 3000;

  // In development, handle Vite setup and static serving
  if (process.env.NODE_ENV !== "production") {
    try {
      const { setupVite, serveStatic } = await import("./vite");
      setupVite(app, server);
      serveStatic(app);
      console.log(`[DEV] Vite middleware and static serving initialized.`);
    } catch (err) {
      console.warn(`[DEV] Could not load Vite: ${err instanceof Error ? err.message : String(err)}`);
    }
  } else {
    // If running node server manually, still need to serve static files
    try {
      const { serveStatic } = await import("./vite");
      serveStatic(app);
      console.log(`[PROD] Static serving initialized.`);
    } catch (err) {
      console.error(`[PROD] Failed to load serveStatic: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  server.listen(port, () => {
    console.log(`[Server] Listening on http://localhost:${port}`);
  });
}

// Start the server only if this file is run directly (local development)
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error(`[Server Start Failed] ${err instanceof Error ? err.message : String(err)}`);
  });
}

export { setupExpressApp };
