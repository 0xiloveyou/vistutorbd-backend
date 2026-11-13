import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ChatService } from "./chat.service";

const ask = catchAsync(async (req: Request, res: Response) => {
  const data = await ChatService.ask(req.body, req.user?.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Answer generated.",
    data,
  });
});

const analyzeImage = catchAsync(async (req: Request, res: Response) => {
  const data = await ChatService.analyzeImage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image read successfully.",
    data,
  });
});

const listSessions = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Login required.");
  }

  const data = await ChatService.listSessions(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chat sessions fetched.",
    data,
  });
});

const getSession = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Login required.");
  }

  const data = await ChatService.getSession(
    String(req.params.id),
    req.user.userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chat session fetched.",
    data,
  });
});

export const ChatController = { ask, analyzeImage, listSessions, getSession };
