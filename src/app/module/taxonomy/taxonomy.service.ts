import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ICategoryPayload, IChapterPayload } from "../../interfaces";

const listBands = async (includeInactive = false) => {
  const bands = await prisma.classBand.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: { order: "asc" },
  });

  const levels = await prisma.classLevel.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: { order: "asc" },
  });

  return bands.map((band) => ({
    ...band,
    levels: levels.filter((level) => level.bandId === band.id),
  }));
};

const listLevels = async (bandId?: string) =>
  prisma.classLevel.findMany({
    where: {
      isActive: true,
      ...(bandId ? { bandId } : {}),
    },
    orderBy: { order: "asc" },
  });

const getLevel = async (id: string) => {
  const level = await prisma.classLevel.findUnique({ where: { id } });
  if (!level) {
    throw new AppError(httpStatus.NOT_FOUND, "Class level not found.");
  }
  return level;
};

const listCategories = async (options: {
  classLevelId?: string;
  parentId?: string;
  includeInactive?: boolean;
}) =>
  prisma.category.findMany({
    where: {
      ...(options.classLevelId ? { classLevelId: options.classLevelId } : {}),
      ...(options.parentId ? { parentId: options.parentId } : {}),
      ...(options.includeInactive ? {} : { isActive: true }),
    },
    orderBy: { order: "asc" },
  });

const getCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found.");
  }
  return category;
};

const createCategory = async (payload: ICategoryPayload) => {
  await getLevel(payload.classLevelId);

  return prisma.category.create({
    data: {
      classLevelId: payload.classLevelId,
      parentId: payload.parentId ?? null,
      slug: payload.slug,
      title: payload.title,
      ...(payload.summary ? { summary: payload.summary } : {}),
      icon: payload.icon ?? "",
      order: payload.order ?? 0,
      isActive: payload.isActive ?? true,
    },
  });
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategoryPayload>,
) => {
  await getCategory(id);

  return prisma.category.update({
    where: { id },
    data: {
      ...(payload.classLevelId ? { classLevelId: payload.classLevelId } : {}),
      ...(payload.parentId !== undefined ? { parentId: payload.parentId } : {}),
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.summary ? { summary: payload.summary } : {}),
      ...(payload.icon !== undefined ? { icon: payload.icon } : {}),
      ...(payload.order !== undefined ? { order: payload.order } : {}),
      ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
    },
  });
};

const deleteCategory = async (id: string) => {
  await getCategory(id);

  const chapterCount = await prisma.chapter.count({
    where: { categoryId: id },
  });
  if (chapterCount > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Remove this category's chapters before deleting it.",
    );
  }

  await prisma.category.delete({ where: { id } });
  return null;
};

const listChapters = async (options: {
  categoryId?: string;
  classLevelId?: string;
  classBandId?: string;
  includeUnpublished?: boolean;
}) =>
  prisma.chapter.findMany({
    where: {
      ...(options.categoryId ? { categoryId: options.categoryId } : {}),
      ...(options.classLevelId ? { classLevelId: options.classLevelId } : {}),
      ...(options.classBandId ? { classBandId: options.classBandId } : {}),
      ...(options.includeUnpublished ? {} : { status: "PUBLISHED" }),
    },
    orderBy: { order: "asc" },
  });

const getChapter = async (id: string) => {
  const chapter = await prisma.chapter.findUnique({ where: { id } });
  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found.");
  }
  return chapter;
};

const createChapter = async (payload: IChapterPayload) => {
  const category = await getCategory(payload.categoryId);
  const level = await getLevel(category.classLevelId);

  return prisma.chapter.create({
    data: {
      categoryId: payload.categoryId,
      classLevelId: category.classLevelId,
      classBandId: level.bandId,
      slug: payload.slug,
      title: payload.title,
      ...(payload.summary ? { summary: payload.summary } : {}),
      order: payload.order ?? 0,
      prerequisites: payload.prerequisites ?? [],
      status: payload.status ?? "DRAFT",
    },
  });
};

const updateChapter = async (id: string, payload: Partial<IChapterPayload>) => {
  await getChapter(id);

  return prisma.chapter.update({
    where: { id },
    data: {
      ...(payload.categoryId ? { categoryId: payload.categoryId } : {}),
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.summary ? { summary: payload.summary } : {}),
      ...(payload.order !== undefined ? { order: payload.order } : {}),
      ...(payload.prerequisites
        ? { prerequisites: payload.prerequisites }
        : {}),
      ...(payload.status ? { status: payload.status } : {}),
    },
  });
};

const deleteChapter = async (id: string) => {
  await getChapter(id);

  const topicCount = await prisma.topic.count({ where: { chapterId: id } });
  if (topicCount > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Remove this chapter's topics before deleting it.",
    );
  }

  await prisma.chapter.delete({ where: { id } });
  return null;
};

export const TaxonomyService = {
  listBands,
  listLevels,
  getLevel,
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  listChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
};
