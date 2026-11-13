import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { kv } from "../lib/redis";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

/**
 * Simple fixed-window rate limiter backed by Redis, with the in-memory kv
 * fallback used elsewhere in the app. Keys are scoped per user when signed in.
 */
export const rateLimit = (options: {
  namespace: string;
  limit: number;
  windowSeconds: number;
}) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const identity = req.user?.userId || req.ip || "anonymous";
      const key = `rate:${options.namespace}:${identity}`;
      const count = await kv.incr(key, options.windowSeconds);

      if (count > options.limit) {
        throw new AppError(
          httpStatus.TOO_MANY_REQUESTS,
          "You are going a little too fast. Please wait a moment and try again.",
        );
      }

      next();
    },
  );
};
