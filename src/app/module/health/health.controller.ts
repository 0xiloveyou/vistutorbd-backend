import type { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { redisClient } from "../../lib/redis";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const health = catchAsync(async (_req: Request, res: Response) => {
  let database = "down";

  try {
    await prisma.$runCommandRaw({ ping: 1 });
    database = "up";
  } catch {
    database = "down";
  }

  const services = {
    database,
    redis: config.redis_url
      ? redisClient.isConnected
        ? "up"
        : "down"
      : "disabled (in-memory fallback)",
    smtp: transporter ? "configured" : "disabled (console mail)",
    openrouter: config.openrouter_api_key ? "configured" : "disabled",
    embeddings: config.embedding_provider,
    vision: config.openrouter_vision_model ? "configured" : "disabled",
    voice: config.openrouter_tts_models.length ? "configured" : "disabled",
  };

  const healthy = database === "up";

  sendResponse(res, {
    statusCode: healthy ? httpStatus.OK : httpStatus.SERVICE_UNAVAILABLE,
    success: healthy,
    message: healthy ? "OK" : "Degraded",
    data: {
      uptime: process.uptime(),
      environment: config.node_env,
      services,
    },
  });
});

export const HealthController = { health };
