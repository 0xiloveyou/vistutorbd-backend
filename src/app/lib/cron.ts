import cron from "node-cron";
import { prisma } from "./prisma";

export const cleanupUnverifiedUsers = async () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const result = await prisma.user.deleteMany({
        where: {
          emailVerified: false,
          createdAt: { lt: oneDayAgo },
        },
      });

      if (result.count > 0) {
        console.log(
          `[cron] Removed ${result.count} unverified account(s) older than 24h.`,
        );
      }
    } catch (error) {
      console.error("[cron] Failed to remove unverified accounts:", error);
    }
  });
};

/**
 * Re-index hook for changed content. The per-topic ingestion service is called
 * here in a later phase; the skeleton logs the candidates so the job is wired.
 */
export const scheduleKnowledgeReindex = async () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      const topics = await prisma.topic.findMany({
        where: { knowledgeStatus: { in: ["PENDING", "FAILED"] } },
        select: { id: true, slug: true },
        take: 100,
      });

      if (topics.length === 0) {
        console.log("[cron] Knowledge base is up to date.");
        return;
      }

      console.log(
        `[cron] ${topics.length} topic(s) queued for embedding re-index: ${topics
          .map((topic) => topic.slug)
          .join(", ")}`,
      );
    } catch (error) {
      console.error("[cron] Knowledge re-index check failed:", error);
    }
  });
};

export const scheduleDailyStats = async () => {
  cron.schedule("5 0 * * *", async () => {
    try {
      const [users, topics, chunks, attempts] = await Promise.all([
        prisma.user.count(),
        prisma.topic.count({ where: { status: "PUBLISHED" } }),
        prisma.knowledgeChunk.count({ where: { isActive: true } }),
        prisma.quizAttempt.count(),
      ]);

      console.log(
        `[cron] Daily stats — users: ${users}, topics: ${topics}, chunks: ${chunks}, attempts: ${attempts}.`,
      );
    } catch (error) {
      console.error("[cron] Daily stats failed:", error);
    }
  });
};

export const startCronJobs = () => {
  cleanupUnverifiedUsers();
  scheduleKnowledgeReindex();
  scheduleDailyStats();
  console.log("[cron] Scheduled jobs registered.");
};
