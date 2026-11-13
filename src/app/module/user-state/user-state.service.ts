import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

const listBookmarks = async (userId: string) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const topics = bookmarks.length
    ? await prisma.topic.findMany({
        where: { id: { in: bookmarks.map((bookmark) => bookmark.topicId) } },
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          classBandId: true,
          classLevelId: true,
          chapterId: true,
          difficulty: true,
          status: true,
        },
      })
    : [];

  const topicMap = new Map(topics.map((topic) => [topic.id, topic]));

  return bookmarks
    .map((bookmark) => ({
      ...bookmark,
      topic: topicMap.get(bookmark.topicId) ?? null,
    }))
    .filter((item) => item.topic && item.topic.status === "PUBLISHED");
};

const addBookmark = async (userId: string, topicId: string) => {
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (topic?.status !== "PUBLISHED") {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  return prisma.bookmark.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: {},
    create: { userId, topicId },
  });
};

const removeBookmark = async (userId: string, topicId: string) => {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_topicId: { userId, topicId } },
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Bookmark not found.");
  }

  await prisma.bookmark.delete({ where: { id: existing.id } });
  return null;
};

const listProgress = async (userId: string, chapterId?: string) => {
  const records = await prisma.progress.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  if (records.length === 0) return [];

  const topics = await prisma.topic.findMany({
    where: {
      id: { in: records.map((record) => record.topicId) },
      ...(chapterId ? { chapterId } : {}),
    },
    select: {
      id: true,
      slug: true,
      title: true,
      chapterId: true,
      classBandId: true,
      classLevelId: true,
    },
  });

  const topicMap = new Map(topics.map((topic) => [topic.id, topic]));

  return records
    .filter((record) => topicMap.has(record.topicId))
    .map((record) => ({
      ...record,
      topic: topicMap.get(record.topicId) ?? null,
    }));
};

const updateProgress = async (
  userId: string,
  topicId: string,
  payload: {
    isRead?: boolean;
    lastVizId?: string;
    lastStepIndex?: number;
  },
) => {
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  return prisma.progress.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: {
      ...(payload.isRead !== undefined ? { isRead: payload.isRead } : {}),
      ...(payload.lastVizId !== undefined
        ? { lastVizId: payload.lastVizId }
        : {}),
      ...(payload.lastStepIndex !== undefined
        ? { lastStepIndex: payload.lastStepIndex }
        : {}),
    },
    create: {
      userId,
      topicId,
      isRead: payload.isRead ?? false,
      ...(payload.lastVizId ? { lastVizId: payload.lastVizId } : {}),
      lastStepIndex: payload.lastStepIndex ?? 0,
    },
  });
};

const updatePreferences = async (
  userId: string,
  payload: {
    preferredLang?: "en" | "bn";
    preferredTheme?: string;
    classBandId?: string | null;
    classLevelId?: string | null;
    companionEnabled?: boolean;
    soundEnabled?: boolean;
    name?: string;
  },
) => {
  if (payload.classBandId) {
    const band = await prisma.classBand.findUnique({
      where: { id: payload.classBandId },
    });
    if (!band) {
      throw new AppError(httpStatus.BAD_REQUEST, "Unknown class band.");
    }
  }

  if (payload.classLevelId) {
    const level = await prisma.classLevel.findUnique({
      where: { id: payload.classLevelId },
    });
    if (!level) {
      throw new AppError(httpStatus.BAD_REQUEST, "Unknown class level.");
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.preferredLang
        ? { preferredLang: payload.preferredLang }
        : {}),
      ...(payload.preferredTheme
        ? { preferredTheme: payload.preferredTheme }
        : {}),
      ...(payload.classBandId !== undefined
        ? { classBandId: payload.classBandId }
        : {}),
      ...(payload.classLevelId !== undefined
        ? { classLevelId: payload.classLevelId }
        : {}),
      ...(payload.companionEnabled !== undefined
        ? { companionEnabled: payload.companionEnabled }
        : {}),
      ...(payload.soundEnabled !== undefined
        ? { soundEnabled: payload.soundEnabled }
        : {}),
    },
    omit: { password: true },
  });
};

export const UserStateService = {
  listBookmarks,
  addBookmark,
  removeBookmark,
  listProgress,
  updateProgress,
  updatePreferences,
};
