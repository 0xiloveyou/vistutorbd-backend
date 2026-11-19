import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { LibraryService } from "./library.service";

const listClasses = catchAsync(async (_req: Request, res: Response) => {
  const data = await LibraryService.listClasses();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Library classes fetched.",
    data,
  });
});

const listChapters = catchAsync(async (req: Request, res: Response) => {
  const data = await LibraryService.listChapters(String(req.params.classId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Library chapters fetched.",
    data,
  });
});

const getChapter = catchAsync(async (req: Request, res: Response) => {
  const data = await LibraryService.getChapter(String(req.params.chapterId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Library chapter fetched.",
    data,
  });
});

const getVisualization = catchAsync(async (req: Request, res: Response) => {
  const data = await LibraryService.getVisualization(
    String(req.params.chapterId),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Library visualization fetched.",
    data,
  });
});

export const LibraryController = {
  listClasses,
  listChapters,
  getChapter,
  getVisualization,
};
