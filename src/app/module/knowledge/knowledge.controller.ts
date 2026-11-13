import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { KnowledgeService } from "./knowledge.service";

const str = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const search = catchAsync(async (req: Request, res: Response) => {
  const query = str(req.query.q);

  if (!query) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Query parameter `q` is required.",
    );
  }

  const data = await KnowledgeService.search({
    query,
    filter: {
      topicId: str(req.query.topicId),
      chapterId: str(req.query.chapterId),
      classBandId: str(req.query.classBandId),
      lang: str(req.query.lang),
      kind: str(req.query.kind),
    },
    limit: Number(req.query.limit) || 5,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Knowledge search completed.",
    data,
  });
});

const listChunks = catchAsync(async (req: Request, res: Response) => {
  const data = await KnowledgeService.listChunks(
    {
      topicId: str(req.query.topicId),
      chapterId: str(req.query.chapterId),
      categoryId: str(req.query.categoryId),
      classBandId: str(req.query.classBandId),
    },
    Number(req.query.limit) || 100,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Knowledge chunks fetched.",
    data,
  });
});

const ingestChunk = catchAsync(async (req: Request, res: Response) => {
  const data = await KnowledgeService.ingestChunk(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Knowledge chunk ingested.",
    data,
  });
});

const reindexTopic = catchAsync(async (req: Request, res: Response) => {
  const data = await KnowledgeService.reindexTopic(String(req.params.topicId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic re-indexed.",
    data,
  });
});

const deleteChunk = catchAsync(async (req: Request, res: Response) => {
  await KnowledgeService.deleteChunk(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Knowledge chunk deleted.",
    data: null,
  });
});

export const KnowledgeController = {
  search,
  listChunks,
  ingestChunk,
  reindexTopic,
  deleteChunk,
};
