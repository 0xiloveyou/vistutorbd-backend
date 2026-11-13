import { Role } from "@prisma/client";
import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { TaxonomyController } from "./taxonomy.controller";
import { TaxonomyValidation } from "./taxonomy.validation";

const router = Router();

router.get("/bands", optionalAuth, TaxonomyController.listBands);
router.get("/levels", optionalAuth, TaxonomyController.listLevels);
router.get("/levels/:id", optionalAuth, TaxonomyController.getLevel);

router.get("/categories", optionalAuth, TaxonomyController.listCategories);
router.get("/categories/:id", optionalAuth, TaxonomyController.getCategory);
router.post(
  "/categories",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TaxonomyValidation.CreateCategoryZodSchema),
  TaxonomyController.createCategory,
);
router.put(
  "/categories/:id",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TaxonomyValidation.UpdateCategoryZodSchema),
  TaxonomyController.updateCategory,
);
router.delete(
  "/categories/:id",
  auth(Role.ADMIN),
  TaxonomyController.deleteCategory,
);

router.get("/chapters", optionalAuth, TaxonomyController.listChapters);
router.get("/chapters/:id", optionalAuth, TaxonomyController.getChapter);
router.post(
  "/chapters",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TaxonomyValidation.CreateChapterZodSchema),
  TaxonomyController.createChapter,
);
router.put(
  "/chapters/:id",
  auth(Role.ADMIN, Role.MODERATOR),
  validateRequest(TaxonomyValidation.UpdateChapterZodSchema),
  TaxonomyController.updateChapter,
);
router.delete(
  "/chapters/:id",
  auth(Role.ADMIN),
  TaxonomyController.deleteChapter,
);

export const TaxonomyRoutes = router;
