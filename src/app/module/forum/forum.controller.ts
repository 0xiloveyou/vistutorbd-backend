import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ForumService } from "./forum.service";

const queryString = (value: unknown) =>
  typeof value === "string" ? value : undefined;

const listPosts = catchAsync(async (req: Request, res: Response) => {
  const page = Number.parseInt(String(req.query.page ?? "1"), 10) || 1;
  const limit = Number.parseInt(String(req.query.limit ?? "20"), 10) || 20;

  const { posts, meta } = await ForumService.listPosts({
    tag: queryString(req.query.tag),
    sort: queryString(req.query.sort),
    page,
    limit,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forum posts fetched.",
    data: posts,
    meta,
  });
});

const getPost = catchAsync(async (req: Request, res: Response) => {
  const data = await ForumService.getPost(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forum post fetched.",
    data,
  });
});

const createPost = catchAsync(async (req: Request, res: Response) => {
  const data = await ForumService.createPost(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post published.",
    data,
  });
});

const createComment = catchAsync(async (req: Request, res: Response) => {
  const data = await ForumService.createComment(
    String(req.params.id),
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment added.",
    data,
  });
});

const askAi = catchAsync(async (req: Request, res: Response) => {
  const data = await ForumService.askAi(
    String(req.params.id),
    req.body ?? {},
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AI answer generated.",
    data,
  });
});

const listTags = catchAsync(async (_req: Request, res: Response) => {
  const data = await ForumService.listTags();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forum tags fetched.",
    data,
  });
});

export const ForumController = {
  listPosts,
  getPost,
  createPost,
  createComment,
  askAi,
  listTags,
};
