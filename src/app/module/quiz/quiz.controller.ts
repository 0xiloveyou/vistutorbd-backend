import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { QuizService } from "./quiz.service";

const requireUser = (req: Request) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Please log in to continue.");
  }
  return req.user;
};

const getConfig = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const chapterId =
    typeof req.query.chapterId === "string" ? req.query.chapterId : "";

  if (!chapterId) {
    throw new AppError(httpStatus.BAD_REQUEST, "chapterId is required.");
  }

  const data = await QuizService.getConfig(user.userId, chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz configuration fetched.",
    data,
  });
});

const saveConfig = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await QuizService.saveConfig(user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz configuration saved.",
    data,
  });
});

const generateSet = catchAsync(async (req: Request, res: Response) => {
  const data = await QuizService.generateSet({
    userId: req.user?.userId,
    chapterId: req.body.chapterId,
    count: req.body.count,
    mode: req.body.mode,
    difficulty: req.body.difficulty,
    generator: req.body.generator,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz generated.",
    data,
  });
});

const submitAttempt = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await QuizService.submitAttempt({
    userId: user.userId,
    chapterId: req.body.chapterId,
    answers: req.body.answers,
    durationSec: req.body.durationSec,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Quiz attempt saved.",
    data,
  });
});

const listAttempts = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const chapterId =
    typeof req.query.chapterId === "string" ? req.query.chapterId : undefined;
  const data = await QuizService.listAttempts(user.userId, chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz attempts fetched.",
    data,
  });
});

const listTemplates = catchAsync(async (req: Request, res: Response) => {
  const chapterId =
    typeof req.query.chapterId === "string" ? req.query.chapterId : undefined;
  const data = await QuizService.listTemplates(chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question templates fetched.",
    data,
  });
});

export const QuizController = {
  getConfig,
  saveConfig,
  generateSet,
  submitAttempt,
  listAttempts,
  listTemplates,
};
