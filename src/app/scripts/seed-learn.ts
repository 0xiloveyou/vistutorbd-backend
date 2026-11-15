import { prisma } from "../lib/prisma";
import { seedLearnCarousels } from "../utils/seed-learn-carousels";

const main = async () => {
  try {
    await prisma.$connect();
    await seedLearnCarousels();
    console.log("Learn carousel seed complete.");
  } catch (error) {
    console.error("Learn carousel seed failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
