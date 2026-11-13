import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { TopicController } from "./topic.controller";
import { TopicValidation } from "./topic.validation";

const router = Router();

router.get("/", optionalAuth, TopicController.listTopics);
router.get("/:slug", optionalAuth, TopicController.getTopic);
router.post(
  "/",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TopicValidation.CreateTopicZodSchema),
  TopicController.createTopic,
);
router.put(
  "/:id",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TopicValidation.UpdateTopicZodSchema),
  TopicController.updateTopic,
);
router.delete("/:id", auth(Role.ADMIN), TopicController.deleteTopic);

export const TopicRoutes = router;
