import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import config from "../config";
import { CONTENT_PACKS } from "../content";
import { seedLearnCarousels } from "./seed-learn-carousels";
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

type SeedForumComment = {
  authorName: string;
  isAnonymous?: boolean;
  body: string;
};

type SeedForumPost = {
  authorName: string;
  isAnonymous?: boolean;
  title: string;
  body: string;
  tags: string[];
  comments?: SeedForumComment[];
};

/**
 * Ten starter questions so the forum never opens empty. Posts use the same
 * `$...$` maths syntax as the composer, so they exercise KaTeX out of the box.
 * The seed only runs when the forum has no posts and never overwrites data.
 */
const FORUM_SEED_POSTS: SeedForumPost[] = [
  {
    authorName: "Nadia",
    title: "How do I multiply two 2×2 matrices?",
    body: "I know how to add matrices, but multiplication confuses me. For example, what is $A \\times B$ when $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$? Please show the row-by-column steps.",
    tags: ["matrix", "algebra"],
    comments: [
      {
        authorName: "Rafi",
        body: "Multiply each row of $A$ by each column of $B$. The first entry is $(1\\times0)+(2\\times1)=2$, so the product starts with $\\begin{bmatrix} 2 & 1 \\\\ 4 & 3 \\end{bmatrix}$.",
      },
    ],
  },
  {
    authorName: "Anonymous",
    isAnonymous: true,
    title: "Why is sin²θ + cos²θ = 1?",
    body: "I can memorise the identity but I do not understand where it comes from. Can someone explain it using a right triangle or the unit circle?",
    tags: ["trigonometry", "geometry"],
    comments: [
      {
        authorName: "Mim",
        body: "On the unit circle, the point is $(\\cos\\theta, \\sin\\theta)$. Since the radius is 1, Pythagoras gives $\\cos^2\\theta + \\sin^2\\theta = 1$.",
      },
      {
        authorName: "Nadia",
        body: "In a right triangle, divide $a^2+b^2=c^2$ by $c^2$. You get $(a/c)^2+(b/c)^2=1$, which is $\\sin^2\\theta+\\cos^2\\theta=1$.",
      },
    ],
  },
  {
    authorName: "Tanvir",
    title: "Solve x² − 5x + 6 = 0 step by step",
    body: "I need the factorisation method and the quadratic formula for $x^2 - 5x + 6 = 0$. Which method is faster in an exam?",
    tags: ["algebra", "exam"],
    comments: [
      {
        authorName: "Anonymous",
        isAnonymous: true,
        body: "Factorise: $x^2-5x+6=(x-2)(x-3)$, so $x=2$ or $x=3$. The formula gives the same answers with more writing.",
      },
    ],
  },
  {
    authorName: "Sadia",
    title: "What is the difference between mean and median?",
    body: "Our statistics chapter uses both. For the data set $2, 4, 4, 7, 9$, how are the mean and median different?",
    tags: ["probability", "arithmetic"],
    comments: [
      {
        authorName: "Tanvir",
        body: "Mean is $\\frac{2+4+4+7+9}{5}=5.2$ and the median is the middle value $4$. The median ignores how large the extreme values are.",
      },
    ],
  },
  {
    authorName: "Anonymous",
    isAnonymous: true,
    title: "Area of a circle with radius r",
    body: "I keep mixing up $\\pi r^2$ and $2\\pi r$. Which one is area and which one is circumference? A diagram would help.",
    tags: ["geometry", "mensuration"],
    comments: [
      {
        authorName: "Mim",
        body: "$\\pi r^2$ is the area (square units). $2\\pi r$ is the circumference (length units).",
      },
    ],
  },
  {
    authorName: "Rafi",
    title: "Limit question: lim(x→0) sin x / x",
    body: "Why does $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$? Substituting $x=0$ gives $0/0$, so what should I do?",
    tags: ["calculus", "trigonometry"],
    comments: [
      {
        authorName: "Sadia",
        body: "Use the small-angle approximation $\\sin x \\approx x$ near zero, or expand $\\sin x$ as $x - x^3/6 + \\cdots$. Both give the limit 1.",
      },
    ],
  },
  {
    authorName: "Anonymous",
    isAnonymous: true,
    title: "Integrate x² from 0 to 3",
    body: "I need the full working for $\\int_{0}^{3} x^2 \\, dx$. Where do I substitute the limits?",
    tags: ["calculus", "integration"],
    comments: [
      {
        authorName: "Tanvir",
        body: "The antiderivative is $\\frac{x^3}{3}$. Evaluate at 3 and 0: $\\frac{27}{3}-0=9$.",
      },
    ],
  },
  {
    authorName: "Mim",
    title: "Probability of two heads in three coin tosses",
    body: "A fair coin is tossed three times. What is the probability of exactly two heads? I wrote $\\binom{3}{2}(1/2)^3$.",
    tags: ["probability", "homework"],
    comments: [
      {
        authorName: "Rafi",
        body: "That is correct: $\\binom{3}{2}\\left(\\frac{1}{2}\\right)^3 = 3/8$.",
      },
    ],
  },
  {
    authorName: "Tanvir",
    title: "Pythagoras theorem: legs 3 and 4",
    body: "How do I find the hypotenuse when the two shorter sides are 3 cm and 4 cm? I got 5 but I want to see the formula.",
    tags: ["geometry", "algebra"],
    comments: [
      {
        authorName: "Anonymous",
        isAnonymous: true,
        body: "$a^2+b^2=c^2$, so $3^2+4^2=c^2$, $9+16=25$, hence $c=5$ cm.",
      },
    ],
  },
  {
    authorName: "Sadia",
    title: "How to simplify (x² − 9)/(x − 3)",
    body: "I know the answer might be $x+3$, but I do not see the cancellation. Which identity should I use?",
    tags: ["algebra", "simplification"],
    comments: [
      {
        authorName: "Mim",
        body: "Use the difference of squares: $x^2-9=(x-3)(x+3)$. Cancel $(x-3)$ to get $x+3$ for $x \\ne 3$.",
      },
    ],
  },
];

export const seedForumPosts = async () => {
  const postCount = await prisma.forumPost.count();

  if (postCount > 0) {
    console.log("[seed] Forum posts already exist — skipping forum seed.");
    return;
  }

  const now = Date.now();

  for (const [index, post] of FORUM_SEED_POSTS.entries()) {
    const createdAt = new Date(
      now - (FORUM_SEED_POSTS.length - index) * 6 * 60 * 60 * 1000,
    );

    const created = await prisma.forumPost.create({
      data: {
        authorName: post.isAnonymous ? "Anonymous" : post.authorName,
        isAnonymous: Boolean(post.isAnonymous),
        title: post.title,
        body: post.body,
        tags: post.tags,
        createdAt,
        updatedAt: createdAt,
      },
    });

    for (const [commentIndex, comment] of (post.comments ?? []).entries()) {
      await prisma.forumComment.create({
        data: {
          postId: created.id,
          authorName: comment.isAnonymous ? "Anonymous" : comment.authorName,
          isAnonymous: Boolean(comment.isAnonymous),
          body: comment.body,
          createdAt: new Date(createdAt.getTime() + (commentIndex + 1) * 60_000),
        },
      });
    }
  }

  console.log(`Seeded ${FORUM_SEED_POSTS.length} forum posts with starter comments.`);
};

export const seedDatabase = async () => {
  await seedRoles();
  await seedTaxonomy();
  await seedCompanions();
  await seedQuestionTemplates();
  await seedContent();
  await seedLearnCarousels();
  await seedForumPosts();
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

  // Learn carousels and forum starter content are independent of
  // users/taxonomy, so they still seed when the rest of the database is already
  // populated. Both helpers are idempotent.
  await seedLearnCarousels();
  await seedForumPosts();
};
