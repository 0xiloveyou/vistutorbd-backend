import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TopicService } from "./topic.service";

const str = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const num = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const isEditor = (role?: string) => role === "ADMIN" || role === "MODERATOR";

const listTopics = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicService.listTopics({
    chapterId: str(req.query.chapterId),
    categoryId: str(req.query.categoryId),
    classLevelId: str(req.query.classLevelId),
    classBandId: str(req.query.classBandId),
    q: str(req.query.q),
    includeUnpublished: isEditor(req.user?.role) && req.query.all === "true",
    page: num(req.query.page),
    limit: num(req.query.limit),
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topics fetched.",
    data: result.items,
    meta: result.meta,
  });
});

const getTopic = catchAsync(async (req: Request, res: Response) => {
  const data = await TopicService.getTopicBySlug(String(req.params.slug), {
    includeUnpublished: isEditor(req.user?.role) && req.query.all === "true",
    userId: req.user?.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic fetched.",
    data,
  });
});

const createTopic = catchAsync(async (req: Request, res: Response) => {
  const data = await TopicService.createTopic(req.body, req.user?.userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Topic created.",
    data,
  });
});

const updateTopic = catchAsync(async (req: Request, res: Response) => {
  const data = await TopicService.updateTopic(
    String(req.params.id),
    req.body,
    req.user?.userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic updated.",
    data,
  });
});

const deleteTopic = catchAsync(async (req: Request, res: Response) => {
  await TopicService.deleteTopic(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic deleted.",
    data: null,
  });
});

export const TopicController = {
  listTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
};
