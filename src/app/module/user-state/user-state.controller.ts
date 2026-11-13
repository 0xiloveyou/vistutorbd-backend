import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserStateService } from "./user-state.service";

const requireUser = (req: Request) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Please log in to continue.");
  }
  return req.user;
};

const listBookmarks = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await UserStateService.listBookmarks(user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookmarks fetched.",
    data,
  });
});

const addBookmark = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await UserStateService.addBookmark(
    user.userId,
    req.body.topicId,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Topic bookmarked.",
    data,
  });
});

const removeBookmark = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  await UserStateService.removeBookmark(
    user.userId,
    String(req.params.topicId),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookmark removed.",
    data: null,
  });
});

const listProgress = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const chapterId =
    typeof req.query.chapterId === "string" ? req.query.chapterId : undefined;
  const data = await UserStateService.listProgress(user.userId, chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Progress fetched.",
    data,
  });
});

const updateProgress = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await UserStateService.updateProgress(
    user.userId,
    String(req.params.topicId),
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Progress saved.",
    data,
  });
});

const updatePreferences = catchAsync(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await UserStateService.updatePreferences(user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Preferences saved.",
    data,
  });
});

export const UserStateController = {
  listBookmarks,
  addBookmark,
  removeBookmark,
  listProgress,
  updateProgress,
  updatePreferences,
};
