import type { LearnCarouselKind } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

const carouselSummarySelect = {
  id: true,
  slug: true,
  kind: true,
  classLevelIds: true,
  classBandIds: true,
  title: true,
  summary: true,
  order: true,
  updatedAt: true,
} as const;

const listCarousels = async (options: {
  classLevelId?: string;
  kind?: LearnCarouselKind;
}) => {
  const classLevelId = options.classLevelId?.trim();

  return prisma.learnCarousel.findMany({
    where: {
      isActive: true,
      ...(options.kind ? { kind: options.kind } : {}),
      ...(classLevelId
        ? {
            OR: [
              { classLevelIds: { has: classLevelId } },
              { classLevelIds: { has: "all" } },
            ],
          }
        : {}),
    },
    orderBy: [{ kind: "asc" }, { order: "asc" }, { createdAt: "asc" }],
    select: carouselSummarySelect,
  });
};

const carouselDetailSelect = {
  ...carouselSummarySelect,
  html: true,
  isActive: true,
} as const;

const getCarousel = async (slug: string) => {
  const carousel = await prisma.learnCarousel.findUnique({
    where: { slug },
    select: carouselDetailSelect,
  });

  if (!carousel?.isActive) {
    throw new AppError(httpStatus.NOT_FOUND, "Learn carousel not found.");
  }

  return carousel;
};

export const LearnService = {
  listCarousels,
  getCarousel,
};
