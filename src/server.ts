import app from "./app";
import config from "./app/config";
import { startCronJobs } from "./app/lib/cron";
import { verifyMailer } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { connectRedis } from "./app/lib/redis";
import { seedDatabaseIfEmpty } from "./app/utils/seed";
import { writeLog } from "./app/lib/fileLogger";

const SEED_RETRY_ATTEMPTS = 8;
const SEED_RETRY_DELAY_MS = 30_000;

const errorText = (error: unknown) =>
  error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error);

const isDatabaseUnavailable = (error: unknown) => {
  const text = errorText(error);
  return (
    text.includes("Server selection timeout") ||
    text.includes("server monitor timeout") ||
    text.includes("TransientTransactionError") ||
    text.includes("ReplicaSetNoPrimary") ||
    text.includes("tlsv1 alert internal error") ||
    text.includes("TLSV1_ALERT_INTERNAL_ERROR") ||
    text.includes("ECONNREFUSED") ||
    text.includes("ENOTFOUND")
  );
};

/**
 * AUTO_SEED runs after the HTTP server starts so a slow/blocked Atlas cluster
 * never keeps the API from booting. If the database is temporarily unreachable
 * the seed retries with a clear, actionable message instead of crashing.
 */
const seedWithRetry = async (attempt = 1): Promise<void> => {
  try {
    await seedDatabaseIfEmpty();
    console.log("[seed] Database is ready.");
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      const remaining = SEED_RETRY_ATTEMPTS - attempt;
      console.error(
        `[seed] MongoDB is unreachable (attempt ${attempt}/${SEED_RETRY_ATTEMPTS}). ` +
          "Add this machine's public IP under MongoDB Atlas → Network Access, " +
          "verify DATABASE_URL, then the seed will run automatically." +
          (remaining > 0
            ? ` Retrying in ${SEED_RETRY_DELAY_MS / 1000}s.`
            : " No more retries — restart the server after fixing the connection."),
      );

      if (remaining > 0) {
        setTimeout(() => {
          void seedWithRetry(attempt + 1);
        }, SEED_RETRY_DELAY_MS);
      }
      return;
    }

    console.error("[seed] Startup seeding failed:", error);
  }
};

const main = async () => {
  let databaseConnected = false;

  try {
    await prisma.$connect();
    databaseConnected = true;
    // Prisma resolves $connect before the MongoDB driver has necessarily found
    // a writable server, so the real readiness signal is the first seed/query.
    console.log("MongoDB client initialised.");
    void writeLog({ level: "info", event: "database_client_initialised" });
  } catch (error) {
    console.error(
      "[db] Could not connect to MongoDB. The API will still start, but database " +
        "routes will fail until DATABASE_URL is fixed. If you use Atlas, add this " +
        "machine's IP under Network Access.",
      error instanceof Error ? error.message : error,
    );
    void writeLog({
      level: "error",
      event: "database_connection_failed",
      message: error instanceof Error ? error.message : String(error),
    });
  }

  await connectRedis();
  await verifyMailer();

  startCronJobs();

  app.listen(config.port, () => {
    console.log(
      `VisTutorBd API running on ${config.backend_url} (port ${config.port})`,
    );
    void writeLog({
      level: "success",
      event: "server_started",
      port: config.port,
      environment: config.node_env,
    });

    if (config.auto_seed) {
      // Don't make the first request wait for the full content seed.
      setTimeout(() => {
        void seedWithRetry(databaseConnected ? 1 : 2);
      }, databaseConnected ? 0 : 5_000);
    } else {
      console.log(
        "[seed] AUTO_SEED=false — skipping startup seed. Run `npm run seed` to seed manually.",
      );
    }
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down...`);
    void writeLog({ level: "info", event: "server_shutdown", signal });
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
};

main().catch(async (error) => {
  console.error("Error starting the server:", error);
  void writeLog({
    level: "error",
    event: "server_startup_failed",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  await prisma.$disconnect();
  process.exit(1);
});
