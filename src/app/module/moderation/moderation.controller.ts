import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ModerationService } from "./moderation.service";
import { readLogs, type LogCategory } from "../../lib/fileLogger";

const createReport = catchAsync(async (req: Request, res: Response) => {
  const data = await ModerationService.createReport({
    ...req.body,
    reportedBy: req.user?.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Report submitted. Thank you.",
    data,
  });
});

const listReports = catchAsync(async (req: Request, res: Response) => {
  const status =
    typeof req.query.status === "string" ? req.query.status : undefined;
  const data = await ModerationService.listReports(status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reports fetched.",
    data,
  });
});

const updateReport = catchAsync(async (req: Request, res: Response) => {
  const data = await ModerationService.updateReport(String(req.params.id), {
    status: req.body.status,
    reviewedBy: req.user?.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report updated.",
    data,
  });
});

const listLogs = catchAsync(async (req: Request, res: Response) => {
  const allowedCategories: LogCategory[] = ["success", "error", "info", "combined"];
  const requestedCategory = req.query.category;
  const category = allowedCategories.includes(requestedCategory as LogCategory)
    ? (requestedCategory as LogCategory)
    : "error";
  const requestedLimit = Number(req.query.limit);
  const limit = Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 500)
    : 100;
  const data = await readLogs(category, limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logs fetched.",
    data: { category, entries: data },
  });
});

export const ModerationController = {
  createReport,
  listReports,
  updateReport,
  listLogs,
};
