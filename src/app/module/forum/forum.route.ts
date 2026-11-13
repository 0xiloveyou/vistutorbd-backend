import { Router } from "express";
import { optionalAuth } from "../../middleware/checkAuth";
import { rateLimit } from "../../middleware/rateLimit";
import { validateRequest } from "../../middleware/validateRequest";
import { ForumController } from "./forum.controller";
import { ForumValidation } from "./forum.validation";

const router = Router();

router.get("/posts", optionalAuth, ForumController.listPosts);
router.get("/posts/:id", optionalAuth, ForumController.getPost);
router.get("/tags", ForumController.listTags);

router.post(
  "/posts",
  optionalAuth,
  rateLimit({ namespace: "forum-post", limit: 10, windowSeconds: 60 * 60 }),
  validateRequest(ForumValidation.CreatePostZodSchema),
  ForumController.createPost,
);

router.post(
  "/posts/:id/comments",
  optionalAuth,
  rateLimit({ namespace: "forum-comment", limit: 30, windowSeconds: 60 * 60 }),
  validateRequest(ForumValidation.CreateCommentZodSchema),
  ForumController.createComment,
);

router.post(
  "/posts/:id/ask-ai",
  optionalAuth,
  rateLimit({ namespace: "forum-ai", limit: 20, windowSeconds: 60 * 60 }),
  validateRequest(ForumValidation.AskAiZodSchema),
  ForumController.askAi,
);

export const ForumRoutes = router;
