import { Router } from "express";
import { rateLimit } from "../../middleware/rateLimit";
import { LibraryController } from "./library.controller";

const router = Router();

const libraryLimit = rateLimit({
  namespace: "library",
  limit: 180,
  windowSeconds: 60,
});

router.get("/classes", libraryLimit, LibraryController.listClasses);
router.get(
  "/classes/:classId/chapters",
  libraryLimit,
  LibraryController.listChapters,
);
router.get(
  "/chapters/:chapterId/visualization",
  libraryLimit,
  LibraryController.getVisualization,
);
router.get("/chapters/:chapterId", libraryLimit, LibraryController.getChapter);

export const LibraryRoutes = router;
