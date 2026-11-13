import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { VisualizationController } from "./visualization.controller";
import { VisualizationValidation } from "./visualization.validation";

const router = Router();

router.get("/", optionalAuth, VisualizationController.listVisualizations);
router.get("/:vizId", optionalAuth, VisualizationController.getVisualization);
router.post(
  "/",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(VisualizationValidation.CreateVisualizationZodSchema),
  VisualizationController.createVisualization,
);
router.put(
  "/:vizId",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(VisualizationValidation.UpdateVisualizationZodSchema),
  VisualizationController.updateVisualization,
);
router.delete(
  "/:vizId",
  auth(Role.ADMIN),
  VisualizationController.deleteVisualization,
);

export const VisualizationRoutes = router;
