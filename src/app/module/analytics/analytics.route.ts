import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { rateLimit } from "../../middleware/rateLimit";
import { validateRequest } from "../../middleware/validateRequest";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsValidation } from "./analytics.validation";

const router = Router();

router.post(
  "/visit",
  optionalAuth,
  rateLimit({ namespace: "analytics-visit", limit: 600, windowSeconds: 60 * 60 }),
  validateRequest(AnalyticsValidation.RecordVisitZodSchema),
  AnalyticsController.recordVisit,
);

router.get(
  "/visitors",
  auth(Role.ADMIN, Role.MODERATOR),
  AnalyticsController.visitorSummary,
);

router.post(
  "/visitors/report",
  auth(Role.ADMIN),
  validateRequest(AnalyticsValidation.SendReportZodSchema),
  AnalyticsController.sendReport,
);

export const AnalyticsRoutes = router;
