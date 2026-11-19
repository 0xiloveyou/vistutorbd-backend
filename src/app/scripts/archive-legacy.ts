import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../lib/prisma";

const keepData = process.argv.includes("--keep");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(
  process.cwd(),
  "legacy-content",
  "mongodb-backup",
  stamp,
);

const LEGACY_COLLECTIONS = [
  { name: "categories", read: () => prisma.category.findMany(), clear: () => prisma.category.deleteMany() },
  { name: "chapters", read: () => prisma.chapter.findMany(), clear: () => prisma.chapter.deleteMany() },
  { name: "topics", read: () => prisma.topic.findMany(), clear: () => prisma.topic.deleteMany() },
  { name: "visualizations", read: () => prisma.visualization.findMany(), clear: () => prisma.visualization.deleteMany() },
  { name: "learn_carousels", read: () => prisma.learnCarousel.findMany(), clear: () => prisma.learnCarousel.deleteMany() },
  { name: "knowledge_chunks", read: () => prisma.knowledgeChunk.findMany(), clear: () => prisma.knowledgeChunk.deleteMany() },
  { name: "questions", read: () => prisma.question.findMany(), clear: () => prisma.question.deleteMany() },
  { name: "quiz_configs", read: () => prisma.quizConfig.findMany(), clear: () => prisma.quizConfig.deleteMany() },
  { name: "quiz_attempts", read: () => prisma.quizAttempt.findMany(), clear: () => prisma.quizAttempt.deleteMany() },
  { name: "progress", read: () => prisma.progress.findMany(), clear: () => prisma.progress.deleteMany() },
  { name: "bookmarks", read: () => prisma.bookmark.findMany(), clear: () => prisma.bookmark.deleteMany() },
];

const main = async () => {
  try {
    await prisma.$connect();
    await mkdir(backupDir, { recursive: true });

    const summary: Record<string, { backedUp: number; deleted: number }> = {};

    for (const collection of LEGACY_COLLECTIONS) {
      const rows = await collection.read();
      await writeFile(
        path.join(backupDir, `${collection.name}.json`),
        JSON.stringify(rows, null, 2),
        "utf8",
      );

      let deleted = 0;
      if (!keepData) {
        const result = await collection.clear();
        deleted = result.count;
      }

      summary[collection.name] = { backedUp: rows.length, deleted };
      console.log(
        `[legacy] ${collection.name}: backed up ${rows.length}, deleted ${deleted}.`,
      );
    }

    await writeFile(
      path.join(backupDir, "_summary.json"),
      JSON.stringify({ createdAt: new Date().toISOString(), backupDir, keepData, summary }, null, 2),
      "utf8",
    );

    console.log(
      keepData
        ? `[legacy] Backup complete at ${backupDir}. MongoDB was left untouched.`
        : `[legacy] Backup complete at ${backupDir}. Old content removed from MongoDB.`,
    );
  } catch (error) {
    console.error("Legacy archive failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
