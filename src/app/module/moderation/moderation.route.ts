import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ModerationController } from "./moderation.controller";
import { ModerationValidation } from "./moderation.validation";

const router = Router();

router.post(
  "/reports",
  optionalAuth,
  validateRequest(ModerationValidation.CreateReportZodSchema),
  ModerationController.createReport,
);
router.get(
  "/reports",
  auth(Role.ADMIN, Role.MODERATOR),
  ModerationController.listReports,
);
router.get("/logs", auth(Role.ADMIN, Role.MODERATOR), ModerationController.listLogs);
router.patch(
  "/reports/:id",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(ModerationValidation.UpdateReportZodSchema),
  ModerationController.updateReport,
);

export const ModerationRoutes = router;
