import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ILessonBlockPayload, ILocalizedText } from "../../interfaces";

type TopicInput = {
  chapterId: string;
  categoryId?: string;
  classLevelId?: string;
  classBandId?: string;
  slug: string;
  title: ILocalizedText;
  summary: ILocalizedText;
  lesson?: ILessonBlockPayload[];
  visualizationIds?: string[];
  difficulty?: number;
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
};

const publicWhere = { status: "PUBLISHED" as const };

const listTopics = async (options: {
  chapterId?: string;
  categoryId?: string;
  classLevelId?: string;
  classBandId?: string;
  includeUnpublished?: boolean;
  page?: number;
  limit?: number;
}) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;

  const where = {
    ...(options.includeUnpublished ? {} : publicWhere),
    ...(options.chapterId ? { chapterId: options.chapterId } : {}),
    ...(options.categoryId ? { categoryId: options.categoryId } : {}),
    ...(options.classLevelId ? { classLevelId: options.classLevelId } : {}),
    ...(options.classBandId ? { classBandId: options.classBandId } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.topic.findMany({
      where,
      orderBy: [{ difficulty: "asc" }, { createdAt: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        chapterId: true,
        categoryId: true,
        classLevelId: true,
        classBandId: true,
        difficulty: true,
        visualizationIds: true,
        knowledgeStatus: true,
        status: true,
        updatedAt: true,
      },
    }),
    prisma.topic.count({ where }),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

const getTopicBySlug = async (
  slug: string,
  options: {
    includeUnpublished?: boolean;
    userId?: string;
  },
) => {
  const topic = await prisma.topic.findUnique({ where: { slug } });

  if (!topic || (!options.includeUnpublished && topic.status !== "PUBLISHED")) {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  const [chapter, category, level, band, visualizations, progress, bookmark] =
    await Promise.all([
      prisma.chapter.findUnique({ where: { id: topic.chapterId } }),
      prisma.category.findUnique({ where: { id: topic.categoryId } }),
      prisma.classLevel.findUnique({ where: { id: topic.classLevelId } }),
      prisma.classBand.findUnique({ where: { id: topic.classBandId } }),
      topic.visualizationIds.length
        ? prisma.visualization.findMany({
            where: { vizId: { in: topic.visualizationIds } },
            select: {
              vizId: true,
              kind: true,
              renderer: true,
              title: true,
              summary: true,
              tags: true,
              difficulty: true,
              version: true,
            },
          })
        : Promise.resolve([]),
      options.userId
        ? prisma.progress.findUnique({
            where: {
              userId_topicId: {
                userId: options.userId,
                topicId: topic.id,
              },
            },
          })
        : Promise.resolve(null),
      options.userId
        ? prisma.bookmark.findUnique({
            where: {
              userId_topicId: {
                userId: options.userId,
                topicId: topic.id,
              },
            },
          })
        : Promise.resolve(null),
    ]);

  return {
    ...topic,
    chapter,
    category,
    classLevel: level,
    classBand: band,
    visualizations,
    progress,
    bookmarked: Boolean(bookmark),
  };
};

const createTopic = async (payload: TopicInput, userId?: string) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: payload.chapterId },
  });

  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found.");
  }

  const topic = await prisma.topic.create({
    data: {
      chapterId: chapter.id,
      categoryId: chapter.categoryId,
      classLevelId: chapter.classLevelId,
      classBandId: chapter.classBandId,
      slug: payload.slug,
      title: payload.title,
      summary: payload.summary,
      lesson: (payload.lesson ?? []).map((block, index) => ({
        id: block.id ?? `block-${index + 1}`,
        type: block.type,
        order: block.order ?? index,
        ...(block.title ? { title: block.title } : {}),
        ...(block.body ? { body: block.body } : {}),
        ...(block.formula ? { formula: block.formula } : {}),
        ...(block.vizId ? { vizId: block.vizId } : {}),
        ...(block.audioText ? { audioText: block.audioText } : {}),
        ...(block.companion ? { companion: block.companion } : {}),
      })),
      visualizationIds: payload.visualizationIds ?? [],
      difficulty: payload.difficulty ?? 1,
      status: payload.status ?? "DRAFT",
      knowledgeStatus: "PENDING",
      createdBy: userId,
      updatedBy: userId,
    },
  });

  return topic;
};

const updateTopic = async (
  id: string,
  payload: Partial<TopicInput>,
  userId?: string,
) => {
  const existing = await prisma.topic.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  const lesson =
    payload.lesson === undefined
      ? undefined
      : payload.lesson.map((block, index) => ({
          id: block.id ?? `block-${index + 1}`,
          type: block.type,
          order: block.order ?? index,
          ...(block.title ? { title: block.title } : {}),
          ...(block.body ? { body: block.body } : {}),
          ...(block.formula ? { formula: block.formula } : {}),
          ...(block.vizId ? { vizId: block.vizId } : {}),
          ...(block.audioText ? { audioText: block.audioText } : {}),
          ...(block.companion ? { companion: block.companion } : {}),
        }));

  return prisma.topic.update({
    where: { id },
    data: {
      ...(payload.chapterId ? { chapterId: payload.chapterId } : {}),
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.summary ? { summary: payload.summary } : {}),
      ...(lesson ? { lesson } : {}),
      ...(payload.visualizationIds
        ? { visualizationIds: payload.visualizationIds }
        : {}),
      ...(payload.difficulty !== undefined
        ? { difficulty: payload.difficulty }
        : {}),
      ...(payload.status ? { status: payload.status } : {}),
      updatedBy: userId,
      ...(payload.status === "PUBLISHED" ? { knowledgeStatus: "PENDING" } : {}),
    },
  });
};

const deleteTopic = async (id: string) => {
  const existing = await prisma.topic.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  await prisma.topic.delete({ where: { id } });
  return null;
};

export const TopicService = {
  listTopics,
  getTopicBySlug,
  createTopic,
  updateTopic,
  deleteTopic,
};
