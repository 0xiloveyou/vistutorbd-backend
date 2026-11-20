import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AnalyticsService } from "./analytics.service";

const recordVisit = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.recordVisit({
    visitorId: req.body.visitorId,
    path: req.body.path,
    referrer: req.body.referrer,
    userAgent: req.headers["user-agent"] ?? "",
    ip: req.ip ?? "",
    ...(req.user?.userId ? { userId: req.user.userId } : {}),
  });

  sendResponse(res, {
    statusCode: result.recorded ? httpStatus.CREATED : httpStatus.OK,
    success: true,
    message: result.recorded ? "Visit recorded." : "Visit already recorded.",
    data: result,
  });
});

const visitorSummary = catchAsync(async (req: Request, res: Response) => {
  const date =
    typeof req.query.date === "string" && req.query.date.trim()
      ? req.query.date.trim()
      : undefined;

  const data = await AnalyticsService.buildVisitorSummary({
    date,
    includeLastSixHours: !date,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visitor summary fetched.",
    data,
  });
});

const publicStats = catchAsync(async (_req: Request, res: Response) => {
  const data = await AnalyticsService.getPublicStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Public homepage stats fetched.",
    data,
  });
});

const sendReport = catchAsync(async (req: Request, res: Response) => {
  const date =
    typeof req.body?.date === "string" && req.body.date.trim()
      ? req.body.date.trim()
      : undefined;

  const data = await AnalyticsService.sendVisitorReport(date);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visitor report sent.",
    data,
  });
});

export const AnalyticsController = {
  recordVisit,
  visitorSummary,
  publicStats,
  sendReport,
};
