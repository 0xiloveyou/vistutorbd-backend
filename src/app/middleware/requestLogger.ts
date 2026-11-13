import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { writeLog } from "../lib/fileLogger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startedAt = Date.now();
  const requestId = randomUUID();
  res.setHeader("X-Request-Id", requestId);

  res.once("finish", () => {
    const statusCode = res.statusCode;
    void writeLog({
      level: statusCode >= 400 ? "error" : "success",
      event: "http_request",
      requestId,
      method: req.method,
      path: req.originalUrl.split("?", 1)[0],
      statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
      ...(req.user
        ? { actorId: req.user.userId, actorRole: req.user.role }
        : {}),
    });
  });

  next();
};
