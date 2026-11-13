import app from "../src/app";

// Vercel invokes this Express application as a serverless request handler.
// Keep server.listen(), cron jobs, and startup seeding in src/server.ts for
// long-running deployments only.
export default app;
