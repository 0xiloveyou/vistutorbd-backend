import z from "zod";
import {
  contentStatusSchema,
  localizedTextSchema,
  optionalLocalizedTextSchema,
  slugSchema,
} from "../../validators/common";

const classLevelIdSchema = z
  .string()
  .trim()
  .min(2, "classLevelId is required.");

const CreateCategoryZodSchema = z.object({
  classLevelId: classLevelIdSchema,
  parentId: z.string().trim().optional().nullable(),
  slug: slugSchema,
  title: localizedTextSchema,
  summary: optionalLocalizedTextSchema,
  icon: z.string().trim().max(40).optional(),
  order: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

const UpdateCategoryZodSchema = CreateCategoryZodSchema.partial();

const CreateChapterZodSchema = z.object({
  categoryId: z.string().trim().min(2, "categoryId is required."),
  classLevelId: z.string().trim().optional(),
  classBandId: z.string().trim().optional(),
  slug: slugSchema,
  title: localizedTextSchema,
  summary: optionalLocalizedTextSchema,
  order: z.coerce.number().int().min(0).optional(),
  prerequisites: z.array(z.string().trim()).optional(),
  status: contentStatusSchema.optional(),
});

const UpdateChapterZodSchema = CreateChapterZodSchema.partial();

export const TaxonomyValidation = {
  CreateCategoryZodSchema,
  UpdateCategoryZodSchema,
  CreateChapterZodSchema,
  UpdateChapterZodSchema,
};
