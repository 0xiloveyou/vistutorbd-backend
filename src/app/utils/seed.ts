import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import config from "../config";
import { CONTENT_PACKS } from "../content";
import { prisma } from "../lib/prisma";
import { CLASS_BANDS, CLASS_LEVELS, COMPANIONS } from "../lib/taxonomy";
import { seedClassContent } from "./seed-class-content";

type SeedUserInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export const seedUser = async ({
  name,
  email,
  password,
  role,
}: SeedUserInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    return existing;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      emailVerified: true,
      needPasswordChange: false,
    },
  });

  console.log(`Seeded ${role}: ${normalizedEmail}`);
  return user;
};

export const seedRoles = async () => {
  await seedUser({
    name: config.admin_name,
    email: config.admin_email,
    password: config.admin_password,
    role: Role.ADMIN,
  });

  for (const email of config.moderator_emails) {
    const localPart = email.trim().toLowerCase().split("@")[0] || "";
    const password = `${config.moderator_password.slice(0, 1)}${localPart.slice(0, 5)}${config.moderator_password.slice(1)}`;
    await seedUser({
      name: config.moderator_name,
      email,
      password,
      role: Role.MODERATOR,
    });
  }

  await seedUser({
    name: config.user_name,
    email: config.user_email,
    password: config.user_password,
    role: Role.USER,
  });
};

/**
 * Bands and levels are configuration, not content: they must exist for the
 * class picker to work. Categories/chapters/topics remain empty by design.
 */
export const seedTaxonomy = async () => {
  for (const band of CLASS_BANDS) {
    await prisma.classBand.upsert({
      where: { id: band.id },
      update: {
        name: band.name,
        style: band.style,
        order: band.order,
        isActive: true,
      },
      create: {
        id: band.id,
        name: band.name,
        style: band.style,
        order: band.order,
      },
    });
  }

  for (const level of CLASS_LEVELS) {
    await prisma.classLevel.upsert({
      where: { id: level.id },
      update: {
        bandId: level.bandId,
        name: level.name,
        order: level.order,
        isActive: true,
      },
      create: {
        id: level.id,
        bandId: level.bandId,
        name: level.name,
        order: level.order,
      },
    });
  }

  console.log(
    `Seeded ${CLASS_BANDS.length} class bands and ${CLASS_LEVELS.length} class levels.`,
  );
};

export const seedCompanions = async () => {
  for (const companion of COMPANIONS) {
    await prisma.companion.upsert({
      where: { key: companion.key },
      update: {
        name: companion.name,
        assets: companion.assets,
        states: [...companion.states],
        isActive: true,
      },
      create: {
        key: companion.key,
        name: companion.name,
        assets: companion.assets,
        states: [...companion.states],
      },
    });
  }

  console.log(`Seeded ${COMPANIONS.length} companion character(s).`);
};

/**
 * Question templates are framework configuration (they contain no content).
 * Keeping two seeded templates proves the generator/answer-check pipes.
 */
export const seedQuestionTemplates = async () => {
  const templates = [
    {
      key: "addition.singleDigit",
      title: { en: "Single-digit addition", bn: "এক অঙ্কের যোগ" },
      generator: "addition.singleDigit",
      classBandId: "PLAY_NURSERY",
      numberRange: { min: 1, max: 9 },
    },
    {
      key: "addition.twoDigit",
      title: { en: "Two-digit addition", bn: "দুই অঙ্কের যোগ" },
      generator: "addition.twoDigit",
      classBandId: "C1_5",
      numberRange: { min: 10, max: 99 },
    },
  ];

  for (const template of templates) {
    await prisma.questionTemplate.upsert({
      where: { key: template.key },
      update: {
        title: template.title,
        generator: template.generator,
        classBandId: template.classBandId,
        numberRange: template.numberRange,
        isActive: true,
      },
      create: {
        key: template.key,
        title: template.title,
        generator: template.generator,
        classBandId: template.classBandId,
        paramsSchema: {},
        numberRange: template.numberRange,
        difficultyMin: 1,
        difficultyMax: 3,
        answerCheck: { mode: "numeric" },
      },
    });
  }

  console.log(`Seeded ${templates.length} question template(s).`);
};

export const seedContent = async () => {
  for (const pack of CONTENT_PACKS) {
    await seedClassContent(pack);
  }
};

export const seedDatabase = async () => {
  await seedRoles();
  await seedTaxonomy();
  await seedCompanions();
  await seedQuestionTemplates();
  await seedContent();
};

export const seedDatabaseIfEmpty = async () => {
  // Query one collection at a time: if Atlas is unreachable, Promise.all leaves
  // the second query running and produces an extra unhandled rejection.
  const userCount = await prisma.user.count();

  if (userCount === 0) {
    await seedRoles();
  } else {
    console.log("[seed] Users already exist — skipping user seed.");
  }

  const bandCount = await prisma.classBand.count();

  if (bandCount === 0) {
    await seedTaxonomy();
    await seedCompanions();
    await seedQuestionTemplates();
    await seedContent();
  } else {
    console.log("[seed] Taxonomy already exists — skipping taxonomy seed.");
    const counts = await Promise.all(
      CONTENT_PACKS.map((pack) =>
        prisma.topic.count({ where: { classLevelId: pack.levelId } }),
      ),
    );
    const missing = CONTENT_PACKS.filter((_, index) => counts[index] === 0);
    if (missing.length === 0) {
      console.log("[seed] All class content already exists — skipping content seed.");
    } else {
      for (const pack of missing) {
        await seedClassContent(pack);
      }
    }
  }
};
