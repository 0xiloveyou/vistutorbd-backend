import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

const createReport = async (payload: {
  targetType: "chat_message" | "topic" | "visualization" | "question";
  targetId: string;
  reason: string;
  details?: string;
  reportedBy?: string;
}) =>
  prisma.moderationReport.create({
    data: {
      ...(payload.reportedBy ? { reportedBy: payload.reportedBy } : {}),
      targetType: payload.targetType,
      targetId: payload.targetId,
      reason: payload.reason,
      details: payload.details ?? "",
    },
  });

const listReports = async (status?: string) =>
  prisma.moderationReport.findMany({
    where: status ? { status: status as never } : {},
    orderBy: { createdAt: "desc" },
    take: 100,
  });

const updateReport = async (
  id: string,
  payload: {
    status?: "OPEN" | "REVIEWING" | "RESOLVED" | "DISMISSED";
    reviewedBy?: string;
  },
) => {
  const report = await prisma.moderationReport.findUnique({ where: { id } });
  if (!report) {
    throw new AppError(httpStatus.NOT_FOUND, "Report not found.");
  }

  return prisma.moderationReport.update({
    where: { id },
    data: {
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.reviewedBy ? { reviewedBy: payload.reviewedBy } : {}),
    },
  });
};

export const ModerationService = {
  createReport,
  listReports,
  updateReport,
};
