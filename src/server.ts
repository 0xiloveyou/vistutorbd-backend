import app from "./app";
import config from "./app/config";
import { startCronJobs } from "./app/lib/cron";
import { verifyMailer } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { connectRedis } from "./app/lib/redis";
import { seedDatabaseIfEmpty, seedRoles } from "./app/utils/seed";
import { writeLog } from "./app/lib/fileLogger";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to MongoDB successfully.");
    void writeLog({ level: "success", event: "database_connected" });

    await connectRedis();
    await verifyMailer();

    if (config.auto_seed) {
      try {
        await seedDatabaseIfEmpty();
      } catch (error) {
        console.error(
          "[seed] Startup seeding failed. The server will still start:",
          error,
        );
      }
    } else {
      await seedRoles();
    }

    startCronJobs();

    const server = app.listen(config.port, () => {
      console.log(
        `VisTutorBd API running on ${config.backend_url} (port ${config.port})`,
      );
      void writeLog({
        level: "success",
        event: "server_started",
        port: config.port,
        environment: config.node_env,
      });
    });

    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down...`);
      void writeLog({ level: "info", event: "server_shutdown", signal });
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  } catch (error) {
    console.error("Error starting the server:", error);
    void writeLog({
      level: "error",
      event: "server_startup_failed",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
