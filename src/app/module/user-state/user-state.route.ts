import { Role } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserStateController } from "./user-state.controller";
import { UserStateValidation } from "./user-state.validation";

const router = Router();
const signedIn = auth(Role.ADMIN, Role.MODERATOR, Role.USER);

router.get("/bookmarks", signedIn, UserStateController.listBookmarks);
router.post(
  "/bookmarks",
  signedIn,
  validateRequest(UserStateValidation.AddBookmarkZodSchema),
  UserStateController.addBookmark,
);
router.delete(
  "/bookmarks/:topicId",
  signedIn,
  UserStateController.removeBookmark,
);

router.get("/progress", signedIn, UserStateController.listProgress);
router.put(
  "/progress/:topicId",
  signedIn,
  validateRequest(UserStateValidation.UpdateProgressZodSchema),
  UserStateController.updateProgress,
);

router.patch(
  "/preferences",
  signedIn,
  validateRequest(UserStateValidation.UpdatePreferencesZodSchema),
  UserStateController.updatePreferences,
);

export const UserStateRoutes = router;
