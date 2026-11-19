import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { LearnCarouselKind } from "@prisma/client";
import { NEXT_PLAN_CAROUSEL_SEEDS } from "../content/next-plan/carousels";
import { prisma } from "../lib/prisma";

/**
 * The three original resources are consolidated here:
 *
 * 1. `public/index.html` (the hero visual-lessons carousel) became
 *    `carousels/explanation.html`.
 * 2. `public/visual-lessons.html` was byte-for-byte identical to (1) and was
 *    removed instead of imported twice.
 * 3. The per-class play/Q&A pages from `src/app/content new/` became
 *    `carousels/class-*.html` and `carousels/play-nursery.html`.
 *
 * The documents live in MongoDB and are served by `GET /api/v1/learn/*`, so the
 * deployed frontend never exposes the carousel source as a static file.
 */
const CAROUSEL_DIR = path.join(
  process.cwd(),
  "src",
  "app",
  "content",
  "carousels",
);

type CarouselSeed = {
  slug: string;
  kind: LearnCarouselKind;
  file: string;
  classLevelIds: string[];
  classBandIds: string[];
  title: { en: string; bn: string };
  summary: { en: string; bn: string };
  order: number;
};

const CAROUSEL_SEEDS: CarouselSeed[] = [
  {
    slug: "explanation-all",
    kind: "EXPLANATION",
    file: "explanation.html",
    classLevelIds: ["all"],
    classBandIds: ["PLAY_NURSERY", "C1_5", "C6_8", "C9_10", "C11_12"],
    title: { en: "Visual explanations", bn: "Visual explanations" },
    summary: {
      en: "Robot-guided and line-art explanations from Play to Class 12.",
      bn: "Robot-guided and line-art explanations from Play to Class 12.",
    },
    order: 0,
  },
  {
    slug: "explanation-play-nursery",
    kind: "EXPLANATION",
    file: "play-nursery-chapters.html",
    classLevelIds: ["play", "nursery"],
    classBandIds: ["PLAY_NURSERY"],
    title: {
      en: "Play & Nursery: 19 chapter explanations",
      bn: "Play & Nursery: 19 chapter explanations",
    },
    summary: {
      en: "Nineteen robot-guided and line-art explanations, one for every Play and Nursery chapter: counting, addition and subtraction with objects, shapes, patterns, time, money, measuring and comparing.",
      bn: "Nineteen robot-guided and line-art explanations, one for every Play and Nursery chapter: counting, addition and subtraction with objects, shapes, patterns, time, money, measuring and comparing.",
    },
    order: 1,
  },
  {
    slug: "explanation-class-1-5",
    kind: "EXPLANATION",
    file: "class-1-5-chapters.html",
    classLevelIds: ["class-1", "class-2", "class-3", "class-4", "class-5"],
    classBandIds: ["C1_5"],
    title: {
      en: "Class 1–5: 59 chapter explanations",
      bn: "Class 1–5: 59 chapter explanations",
    },
    summary: {
      en: "Fifty-nine robot-guided and line-art explanations, one for every Class 1–5 chapter: number sense, place value, the four operations, fractions, decimals, percentage, measurement, geometry, money and data.",
      bn: "Fifty-nine robot-guided and line-art explanations, one for every Class 1–5 chapter: number sense, place value, the four operations, fractions, decimals, percentage, measurement, geometry, money and data.",
    },
    order: 2,
  },
  {
    slug: "explanation-class-6-8",
    kind: "EXPLANATION",
    file: "class-6-8-chapters.html",
    classLevelIds: ["class-6", "class-7", "class-8"],
    classBandIds: ["C6_8"],
    title: {
      en: "Class 6–8: 30 chapter explanations",
      bn: "Class 6–8: 30 chapter explanations",
    },
    summary: {
      en: "Thirty robot-guided and line-art explanations, one for every Class 6–8 chapter: fractions, percentages, integers, expressions, equations, algebraic fractions, geometry, congruence, sets, quadrilaterals, Pythagoras, circles, patterns, profit, mensuration, formulae and data.",
      bn: "Thirty robot-guided and line-art explanations, one for every Class 6–8 chapter: fractions, percentages, integers, expressions, equations, algebraic fractions, geometry, congruence, sets, quadrilaterals, Pythagoras, circles, patterns, profit, mensuration, formulae and data.",
    },
    order: 3,
  },
  {
    slug: "explanation-class-9-10",
    kind: "EXPLANATION",
    file: "class-9-10-chapters.html",
    classLevelIds: ["class-9", "class-10"],
    classBandIds: ["C9_10"],
    title: {
      en: "Class 9–10: 17 chapter explanations",
      bn: "Class 9–10: 17 chapter explanations",
    },
    summary: {
      en: "Seventeen robot-guided and line-art explanations, one for every Class 9–10 chapter: real numbers, sets, algebra, logarithms, equations, geometry, circles, trigonometry, ratio, series, similarity, area theorems, mensuration and statistics.",
      bn: "Seventeen robot-guided and line-art explanations, one for every Class 9–10 chapter: real numbers, sets, algebra, logarithms, equations, geometry, circles, trigonometry, ratio, series, similarity, area theorems, mensuration and statistics.",
    },
    order: 4,
  },
  {
    slug: "explanation-class-11-12",
    kind: "EXPLANATION",
    file: "class-11-12.html",
    classLevelIds: ["class-11", "class-12"],
    classBandIds: ["C11_12"],
    title: {
      en: "Class 11–12: visual explanations",
      bn: "Class 11–12: visual explanations",
    },
    summary: {
      en: "Fourteen robot-guided and line-art explanations across complex numbers, conics, inverse trigonometry, vectors, limits, integration, probability, linear programming, statics and motion.",
      bn: "Fourteen robot-guided and line-art explanations across complex numbers, conics, inverse trigonometry, vectors, limits, integration, probability, linear programming, statics and motion.",
    },
    order: 5,
  },
  {
    slug: "questions-play-nursery",
    kind: "QUESTION",
    file: "play-nursery.html",
    classLevelIds: ["play", "nursery"],
    classBandIds: ["PLAY_NURSERY"],
    title: {
      en: "Play and Nursery: tap, listen and answer",
      bn: "Play and Nursery: tap, listen and answer",
    },
    summary: {
      en: "Short counting, adding and comparing games with Bolt the robot.",
      bn: "Short counting, adding and comparing games with Bolt the robot.",
    },
    order: 1,
  },
  {
    slug: "questions-class-1",
    kind: "QUESTION",
    file: "class-1.html",
    classLevelIds: ["class-1"],
    classBandIds: ["C1_5"],
    title: { en: "Class 1: play and answer", bn: "Class 1: play and answer" },
    summary: {
      en: "Counting, place value, shapes and money questions for Class 1.",
      bn: "Counting, place value, shapes and money questions for Class 1.",
    },
    order: 2,
  },
  {
    slug: "questions-class-2",
    kind: "QUESTION",
    file: "class-2.html",
    classLevelIds: ["class-2"],
    classBandIds: ["C1_5"],
    title: { en: "Class 2: play and answer", bn: "Class 2: play and answer" },
    summary: {
      en: "Number names, place value and addition questions for Class 2.",
      bn: "Number names, place value and addition questions for Class 2.",
    },
    order: 3,
  },
  {
    slug: "questions-class-3",
    kind: "QUESTION",
    file: "class-3.html",
    classLevelIds: ["class-3"],
    classBandIds: ["C1_5"],
    title: { en: "Class 3: play and answer", bn: "Class 3: play and answer" },
    summary: {
      en: "Multiplication, fractions, money and data questions for Class 3.",
      bn: "Multiplication, fractions, money and data questions for Class 3.",
    },
    order: 4,
  },
  {
    slug: "questions-class-4",
    kind: "QUESTION",
    file: "class-4.html",
    classLevelIds: ["class-4"],
    classBandIds: ["C1_5"],
    title: { en: "Class 4: play and answer", bn: "Class 4: play and answer" },
    summary: {
      en: "Large numbers, factors, fractions, decimals and geometry for Class 4.",
      bn: "Large numbers, factors, fractions, decimals and geometry for Class 4.",
    },
    order: 5,
  },
  {
    slug: "questions-class-5",
    kind: "QUESTION",
    file: "class-5.html",
    classLevelIds: ["class-5"],
    classBandIds: ["C1_5"],
    title: { en: "Class 5: play and answer", bn: "Class 5: play and answer" },
    summary: {
      en: "Multiplication, BODMAS, fractions, percentages and measurement for Class 5.",
      bn: "Multiplication, BODMAS, fractions, percentages and measurement for Class 5.",
    },
    order: 6,
  },
  ...NEXT_PLAN_CAROUSEL_SEEDS,
];

const HEIGHT_REPORTER = `<script>
(function () {
  if (window.__learnCarouselReporter) return;
  window.__learnCarouselReporter = true;
  function report() {
    try {
      parent.postMessage(
        { type: "learn-carousel-height", height: document.documentElement.scrollHeight },
        "*",
      );
    } catch (error) {}
  }
  window.addEventListener("load", report);
  window.addEventListener("resize", report);
  setInterval(report, 600);
})();
</script>`;

const addHeightReporter = (html: string) => {
  if (html.includes("learn-carousel-height")) return html;
  if (/<\/body\s*>/i.test(html)) {
    return html.replace(/<\/body\s*>/i, `${HEIGHT_REPORTER}</body>`);
  }
  return `${html}${HEIGHT_REPORTER}`;
};

const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");

export const seedLearnCarousels = async () => {
  const seenHashes = new Map<string, string>();
  let seeded = 0;

  for (const seed of CAROUSEL_SEEDS) {
    let raw: string;

    try {
      raw = await readFile(path.join(CAROUSEL_DIR, seed.file), "utf8");
    } catch {
      console.warn(
        `[seed] Learn carousel source '${seed.file}' is missing — skipping ${seed.slug}.`,
      );
      continue;
    }

    const contentHash = hash(raw);
    const duplicateOf = seenHashes.get(contentHash);

    if (duplicateOf) {
      console.log(
        `[seed] Skipping duplicate learn carousel ${seed.slug} (same content as ${duplicateOf}).`,
      );
      continue;
    }

    seenHashes.set(contentHash, seed.slug);

    const html = addHeightReporter(raw);
    const data = {
      kind: seed.kind,
      classLevelIds: seed.classLevelIds,
      classBandIds: seed.classBandIds,
      title: seed.title,
      summary: seed.summary,
      html,
      source: `content/carousels/${seed.file}`,
      contentHash,
      order: seed.order,
      isActive: true,
    };

    await prisma.learnCarousel.upsert({
      where: { slug: seed.slug },
      update: data,
      create: { slug: seed.slug, ...data },
    });

    seeded += 1;
  }

  console.log(`[seed] Learn carousels ready: ${seeded} document(s).`);
};
