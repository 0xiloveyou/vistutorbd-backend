import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { rateLimit } from "../../middleware/rateLimit";
import { validateRequest } from "../../middleware/validateRequest";
import config from "../../config";
import { ChatController } from "./chat.controller";
import { ChatValidation } from "./chat.validation";

const router = Router();

router.post(
  "/messages",
  optionalAuth,
  rateLimit({
    namespace: "chat",
    limit: config.chat_rate_limit_per_hour,
    windowSeconds: 60 * 60,
  }),
  validateRequest(ChatValidation.ChatZodSchema),
  ChatController.ask,
);

router.post(
  "/image-problem",
  optionalAuth,
  rateLimit({
    namespace: "chat-vision",
    limit: Math.max(5, Math.floor(config.chat_rate_limit_per_hour / 3)),
    windowSeconds: 60 * 60,
  }),
  validateRequest(ChatValidation.ImageProblemZodSchema),
  ChatController.analyzeImage,
);

router.post(
  "/speech",
  optionalAuth,
  rateLimit({
    namespace: "chat-speech",
    limit: Math.max(20, config.chat_rate_limit_per_hour * 2),
    windowSeconds: 60 * 60,
  }),
  validateRequest(ChatValidation.SpeechZodSchema),
  ChatController.speak,
);

router.get(
  "/sessions",
  auth(Role.ADMIN, Role.MODERATOR, Role.USER),
  ChatController.listSessions,
);
router.get(
  "/sessions/:id",
  auth(Role.ADMIN, Role.MODERATOR, Role.USER),
  ChatController.getSession,
);

export const ChatRoutes = router;
