import { prisma } from "../lib/prisma";
import { seedDatabase } from "../utils/seed";

const main = async () => {
  try {
    await prisma.$connect();
    await seedDatabase();
    console.log("Database seed complete.");
  } catch (error) {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
