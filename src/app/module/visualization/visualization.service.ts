import httpStatus from "http-status";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { IVisualizationPayload } from "../../interfaces";

const listVisualizations = async (options: {
  tag?: string;
  band?: string;
  kind?: "STATIC" | "ANIMATED" | "STEPPER" | "SLIDER_GRAPH" | "SCENE";
  q?: string;
  includeUnpublished?: boolean;
  page?: number;
  limit?: number;
}) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;

  const where = {
    ...(options.includeUnpublished ? {} : { status: "PUBLISHED" as const }),
    ...(options.kind ? { kind: options.kind } : {}),
    ...(options.tag ? { tags: { has: options.tag } } : {}),
    ...(options.band ? { classBandIds: { has: options.band } } : {}),
    ...(options.q ? { vizId: { contains: options.q } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.visualization.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        vizId: true,
        kind: true,
        renderer: true,
        engine: true,
        title: true,
        summary: true,
        tags: true,
        concepts: true,
        prerequisites: true,
        difficulty: true,
        classBandIds: true,
        version: true,
        status: true,
        updatedAt: true,
      },
    }),
    prisma.visualization.count({ where }),
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

const getVisualization = async (vizId: string, includeUnpublished = false) => {
  const visualization = await prisma.visualization.findUnique({
    where: { vizId },
  });

  if (
    !visualization ||
    (!includeUnpublished && visualization.status !== "PUBLISHED")
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Visualization not found.");
  }

  return visualization;
};

const createVisualization = async (payload: IVisualizationPayload) => {
  return prisma.visualization.create({
    data: {
      vizId: payload.vizId,
      kind: payload.kind,
      renderer: payload.renderer,
      engine: payload.engine,
      title: payload.title,
      ...(payload.summary ? { summary: payload.summary } : {}),
      inputs: (payload.inputs ?? {}) as Prisma.InputJsonValue,
      spec: (payload.spec ?? {}) as Prisma.InputJsonValue,
      tags: payload.tags ?? [],
      concepts: payload.concepts ?? [],
      prerequisites: payload.prerequisites ?? [],
      difficulty: payload.difficulty ?? 1,
      classBandIds: payload.classBandIds ?? [],
      version: payload.version ?? 1,
      aiContext: payload.aiContext ?? "",
      status: payload.status ?? "DRAFT",
    },
  });
};

const updateVisualization = async (
  vizId: string,
  payload: Partial<IVisualizationPayload>,
) => {
  await getVisualization(vizId, true);

  return prisma.visualization.update({
    where: { vizId },
    data: {
      ...(payload.kind ? { kind: payload.kind } : {}),
      ...(payload.renderer ? { renderer: payload.renderer } : {}),
      ...(payload.engine ? { engine: payload.engine } : {}),
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.summary ? { summary: payload.summary } : {}),
      ...(payload.inputs
        ? { inputs: payload.inputs as Prisma.InputJsonValue }
        : {}),
      ...(payload.spec ? { spec: payload.spec as Prisma.InputJsonValue } : {}),
      ...(payload.tags ? { tags: payload.tags } : {}),
      ...(payload.concepts ? { concepts: payload.concepts } : {}),
      ...(payload.prerequisites
        ? { prerequisites: payload.prerequisites }
        : {}),
      ...(payload.difficulty !== undefined
        ? { difficulty: payload.difficulty }
        : {}),
      ...(payload.classBandIds ? { classBandIds: payload.classBandIds } : {}),
      ...(payload.version !== undefined ? { version: payload.version } : {}),
      ...(payload.aiContext !== undefined
        ? { aiContext: payload.aiContext }
        : {}),
      ...(payload.status ? { status: payload.status } : {}),
    },
  });
};

const deleteVisualization = async (vizId: string) => {
  await getVisualization(vizId, true);
  await prisma.visualization.delete({ where: { vizId } });
  return null;
};

export const VisualizationService = {
  listVisualizations,
  getVisualization,
  createVisualization,
  updateVisualization,
  deleteVisualization,
};
