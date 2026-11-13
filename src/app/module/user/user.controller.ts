import type { Request, Response } from "express";
import httpStatus from "http-status";
import type { IRequestUser } from "../../interfaces";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const listUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.listUsers({
    page: req.query.page as string | undefined,
    limit: req.query.limit as string | undefined,
    search: req.query.search as string | undefined,
    role: req.query.role as never,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully.",
    data: result.users,
    meta: result.meta,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully.",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const result = await UserService.deleteUser(
    req.params.id as string,
    user.userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully.",
    data: result,
  });
});

export const UserController = { listUsers, updateUser, deleteUser };
