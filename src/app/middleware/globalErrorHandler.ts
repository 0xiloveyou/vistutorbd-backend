import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
import config from "../config";
import { AppError } from "../utils/AppError";
import { writeLog } from "../lib/fileLogger";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = "Internal Server Error";
  let errorName = "Internal Server Error";

  if (err instanceof Error) {
    errorMessage = err.message;
    errorName = err.name;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage =
      "You have provided an incorrect field type or missing fields.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Duplicate key error.";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.NOT_FOUND;
      errorMessage = "The requested record was not found.";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = httpStatus.SERVICE_UNAVAILABLE;
    errorMessage = "Cannot reach the MongoDB database. Check DATABASE_URL.";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  const exception = err instanceof Error ? err : new Error(String(err));
  void writeLog({
    level: "error",
    event: "unhandled_request_error",
    method: _req.method,
    path: _req.originalUrl.split("?", 1)[0],
    statusCode,
    errorName,
    message: errorMessage,
    stack: exception.stack,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    name: config.node_env === "development" ? errorName : "Error",
    message:
      config.node_env === "development" ? errorMessage : "Something went wrong",
    error: config.node_env === "development" ? err : undefined,
  });
};
