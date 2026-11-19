import { prisma } from "../lib/prisma";
import { syncLibraryChapters } from "../utils/library-sync";

const main = async () => {
  try {
    await prisma.$connect();
    await syncLibraryChapters();
  } catch (error) {
    console.error("Library sync failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
