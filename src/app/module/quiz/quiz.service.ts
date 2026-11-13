import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { checkAnswer } from "../../lib/mathEngine";
import {
  type GeneratorKey,
  generateQuestion,
  isGeneratorKey,
} from "../../lib/questionGenerator";
import { AppError } from "../../utils/AppError";

const TIME_LIMITS: Record<string, number> = {
  UNLIMITED: 0,
  BASIC: 60,
  MEDIUM: 30,
  HARD: 15,
};

const defaults = {
  timeMode: "UNLIMITED" as const,
  customSeconds: 0,
  answerMode: "MCQ" as const,
  difficulty: 1,
  numberRange: null,
  companionSlapstick: false,
};

const getConfig = async (userId: string, chapterId: string) => {
  const config = await prisma.quizConfig.findUnique({
    where: { userId_chapterId: { userId, chapterId } },
  });

  return config ?? { ...defaults, userId, chapterId, id: null };
};

const saveConfig = async (
  userId: string,
  payload: {
    chapterId: string;
    timeMode?: "UNLIMITED" | "BASIC" | "MEDIUM" | "HARD" | "CUSTOM";
    customSeconds?: number;
    answerMode?: "MCQ" | "TYPED";
    difficulty?: number;
    numberRange?: { min: number; max: number };
    companionSlapstick?: boolean;
  },
) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: payload.chapterId },
  });
  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found.");
  }

  return prisma.quizConfig.upsert({
    where: {
      userId_chapterId: { userId, chapterId: payload.chapterId },
    },
    update: {
      ...(payload.timeMode ? { timeMode: payload.timeMode } : {}),
      ...(payload.customSeconds !== undefined
        ? { customSeconds: payload.customSeconds }
        : {}),
      ...(payload.answerMode ? { answerMode: payload.answerMode } : {}),
      ...(payload.difficulty !== undefined
        ? { difficulty: payload.difficulty }
        : {}),
      ...(payload.numberRange ? { numberRange: payload.numberRange } : {}),
      ...(payload.companionSlapstick !== undefined
        ? { companionSlapstick: payload.companionSlapstick }
        : {}),
    },
    create: {
      userId,
      chapterId: payload.chapterId,
      timeMode: payload.timeMode ?? defaults.timeMode,
      customSeconds: payload.customSeconds ?? 0,
      answerMode: payload.answerMode ?? defaults.answerMode,
      difficulty: payload.difficulty ?? defaults.difficulty,
      ...(payload.numberRange ? { numberRange: payload.numberRange } : {}),
      companionSlapstick: payload.companionSlapstick ?? false,
    },
  });
};

const resolveTemplates = async (chapterId: string) => {
  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found.");
  }

  const templates = await prisma.questionTemplate.findMany({
    where: {
      isActive: true,
      OR: [
        { chapterId },
        { classBandId: chapter.classBandId },
        { chapterId: null, classBandId: null },
      ],
    },
    orderBy: { difficultyMin: "asc" },
  });

  if (templates.length === 0) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      "No question templates are available for this chapter yet.",
    );
  }

  return { chapter, templates };
};

const timerSecondsFor = (config: {
  timeMode: string;
  customSeconds: number;
}) =>
  config.timeMode === "CUSTOM"
    ? config.customSeconds
    : (TIME_LIMITS[config.timeMode] ?? 0);

const generateSet = async (options: {
  userId?: string;
  chapterId: string;
  count?: number;
  mode?: "MCQ" | "TYPED";
  difficulty?: number;
  generator?: string;
}) => {
  const config = options.userId
    ? await getConfig(options.userId, options.chapterId)
    : { ...defaults, userId: null, chapterId: options.chapterId, id: null };
  const { chapter, templates } = await resolveTemplates(options.chapterId);

  const chosen = options.generator
    ? templates.find((template) => template.generator === options.generator)
    : templates[0];

  if (!chosen || !isGeneratorKey(chosen.generator)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Requested question generator is not available.",
    );
  }

  const count = Math.min(Math.max(options.count ?? 5, 1), 30);
  const mode = options.mode ?? (config.answerMode as "MCQ" | "TYPED");
  const difficulty = options.difficulty ?? config.difficulty;
  const seed = `${chapter.id}-${Date.now().toString(36)}`;

  const questions = Array.from({ length: count }, (_, index) =>
    generateQuestion({
      generator: chosen.generator as GeneratorKey,
      mode,
      difficulty,
      seed: `${seed}-${index}`,
    }),
  );

  return {
    chapter: {
      id: chapter.id,
      title: chapter.title,
      classBandId: chapter.classBandId,
      classLevelId: chapter.classLevelId,
    },
    config: {
      ...config,
      answerMode: mode,
      difficulty,
      timerSeconds: timerSecondsFor(config as never),
    },
    questions,
  };
};

const submitAttempt = async (options: {
  userId: string;
  chapterId: string;
  answers: {
    templateKey: string;
    seed: string;
    submitted: string;
  }[];
  durationSec?: number;
}) => {
  if (options.answers.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No answers submitted.");
  }

  const config = await getConfig(options.userId, options.chapterId);

  const checked = options.answers.map((answer) => {
    if (!isGeneratorKey(answer.templateKey)) {
      return {
        ...answer,
        expected: "",
        correct: false,
      };
    }

    const generated = generateQuestion({
      generator: answer.templateKey,
      seed: answer.seed,
      mode: config.answerMode as "MCQ" | "TYPED",
    });

    return {
      ...answer,
      expected: generated.answer,
      correct: checkAnswer(answer.submitted, generated.answer, {
        mode: "numeric",
      }),
    };
  });

  const score = checked.filter((answer) => answer.correct).length;

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: options.userId,
      chapterId: options.chapterId,
      configSnapshot: {
        timeMode: config.timeMode,
        answerMode: config.answerMode,
        difficulty: config.difficulty,
        customSeconds: config.customSeconds,
      },
      answers: checked as never,
      score,
      total: checked.length,
      durationSec: options.durationSec ?? 0,
    },
  });

  return {
    attempt,
    score,
    total: checked.length,
    results: checked,
  };
};

const listAttempts = async (userId: string, chapterId?: string) =>
  prisma.quizAttempt.findMany({
    where: { userId, ...(chapterId ? { chapterId } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

const listTemplates = async (chapterId?: string) =>
  prisma.questionTemplate.findMany({
    where: chapterId ? { chapterId } : {},
    orderBy: { updatedAt: "desc" },
  });

export const QuizService = {
  getConfig,
  saveConfig,
  generateSet,
  submitAttempt,
  listAttempts,
  listTemplates,
};
