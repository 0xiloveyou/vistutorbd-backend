import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { CLASS_LEVELS } from "../../lib/taxonomy";
import { AppError } from "../../utils/AppError";

const chapterSummarySelect = {
  chapterId: true,
  classLevelId: true,
  classBandId: true,
  classOrder: true,
  chapterNo: true,
  paper: true,
  titleEn: true,
  titleBn: true,
  printedPages: true,
  pdfPages: true,
  ocrQuality: true,
  setCount: true,
  questionCount: true,
  order: true,
  visualizationSlug: true,
} as const;

const classOrder = new Map(CLASS_LEVELS.map((level) => [level.id, level.order]));

const listClasses = async () => {
  const grouped = await prisma.libraryChapter.groupBy({
    by: ["classLevelId"],
    where: { isActive: true },
    _count: { _all: true },
  });

  const counts = new Map(
    grouped.map((row) => [row.classLevelId, row._count._all]),
  );

  return CLASS_LEVELS.map((level) => {
    const chapterCount = counts.get(level.id) ?? 0;
    return {
      id: level.id,
      bandId: level.bandId,
      name: level.name,
      order: level.order,
      locked: chapterCount === 0,
      chapterCount,
    };
  }).sort((a, b) => a.order - b.order);
};

const listChapters = async (classLevelId: string) => {
  const chapters = await prisma.libraryChapter.findMany({
    where: { classLevelId, isActive: true },
    orderBy: [{ paper: "asc" }, { order: "asc" }],
    select: chapterSummarySelect,
  });

  return chapters.sort(
    (a, b) =>
      (classOrder.get(a.classLevelId) ?? 0) -
        (classOrder.get(b.classLevelId) ?? 0) ||
      (a.paper ?? "").localeCompare(b.paper ?? "") ||
      a.order - b.order,
  );
};

const getChapter = async (chapterId: string) => {
  const chapter = await prisma.libraryChapter.findUnique({
    where: { chapterId },
    select: {
      ...chapterSummarySelect,
      sourceMd: true,
      sourceQuestions: true,
      visualizationSlug: true,
      isActive: true,
      updatedAt: true,
    },
  });

  if (!chapter?.isActive) {
    throw new AppError(httpStatus.NOT_FOUND, "Library chapter not found.");
  }

  const visualization = chapter.visualizationSlug
    ? await prisma.libraryVisualization.findUnique({
        where: { slug: chapter.visualizationSlug },
        select: { slug: true, title: true, source: true, updatedAt: true },
      })
    : null;

  return {
    ...chapter,
    visualization: visualization?.slug ? visualization : null,
  };
};

const getVisualization = async (chapterId: string) => {
  const chapter = await prisma.libraryChapter.findUnique({
    where: { chapterId },
    select: { visualizationSlug: true, isActive: true, titleEn: true },
  });

  if (!chapter?.isActive || !chapter.visualizationSlug) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No visualization has been published for this chapter yet.",
    );
  }

  const visualization = await prisma.libraryVisualization.findUnique({
    where: { slug: chapter.visualizationSlug },
  });

  if (!visualization?.isActive) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No visualization has been published for this chapter yet.",
    );
  }

  return visualization;
};

export const LibraryService = {
  listClasses,
  listChapters,
  getChapter,
  getVisualization,
};
