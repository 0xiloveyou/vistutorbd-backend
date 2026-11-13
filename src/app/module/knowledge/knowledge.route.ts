import { Role } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { KnowledgeController } from "./knowledge.controller";
import { KnowledgeValidation } from "./knowledge.validation";

const router = Router();

router.get(
  "/search",
  auth(Role.ADMIN, Role.MODERATOR, Role.USER),
  KnowledgeController.search,
);
router.get(
  "/chunks",
  auth(Role.ADMIN, Role.MODERATOR),
  KnowledgeController.listChunks,
);
router.post(
  "/chunks",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(KnowledgeValidation.IngestChunkZodSchema),
  KnowledgeController.ingestChunk,
);
router.post(
  "/reindex/topic/:topicId",
  auth(Role.ADMIN),
  KnowledgeController.reindexTopic,
);
router.delete("/chunks/:id", auth(Role.ADMIN), KnowledgeController.deleteChunk);

export const KnowledgeRoutes = router;
