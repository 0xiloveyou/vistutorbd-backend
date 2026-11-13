import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { QuizController } from "./quiz.controller";
import { QuizValidation } from "./quiz.validation";

const router = Router();
const signedIn = auth(Role.ADMIN, Role.MODERATOR, Role.USER);

router.get("/config", signedIn, QuizController.getConfig);
router.put(
  "/config",
  signedIn,
  validateRequest(QuizValidation.QuizConfigZodSchema),
  QuizController.saveConfig,
);

router.post(
  "/generate",
  optionalAuth,
  validateRequest(QuizValidation.GenerateQuizZodSchema),
  QuizController.generateSet,
);

router.post(
  "/attempts",
  signedIn,
  validateRequest(QuizValidation.SubmitAttemptZodSchema),
  QuizController.submitAttempt,
);
router.get("/attempts", signedIn, QuizController.listAttempts);

router.get(
  "/templates",
  auth(Role.ADMIN, Role.MODERATOR),
  QuizController.listTemplates,
);

export const QuizRoutes = router;
