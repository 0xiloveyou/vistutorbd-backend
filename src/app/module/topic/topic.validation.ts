import z from "zod";
import {
  contentStatusSchema,
  localizedTextSchema,
  slugSchema,
} from "../../validators/common";

const lessonBlockSchema = z.object({
  id: z.string().trim().min(1).optional(),
  type: z.enum([
    "text",
    "formula",
    "example",
    "visualization",
    "callout",
    "quiz",
  ]),
  order: z.coerce.number().int().min(0),
  title: localizedTextSchema.optional(),
  body: localizedTextSchema.optional(),
  formula: z.string().trim().max(2000).optional(),
  vizId: z.string().trim().optional(),
  audioText: localizedTextSchema.optional(),
  companion: z.string().trim().max(60).optional(),
});

const BaseTopicZodSchema = z.object({
  chapterId: z.string().trim().min(2, "chapterId is required."),
  categoryId: z.string().trim().optional(),
  classLevelId: z.string().trim().optional(),
  classBandId: z.string().trim().optional(),
  slug: slugSchema,
  title: localizedTextSchema,
  summary: localizedTextSchema,
  lesson: z.array(lessonBlockSchema).optional(),
  visualizationIds: z.array(z.string().trim()).optional(),
  difficulty: z.coerce.number().int().min(1).max(5).optional(),
  status: contentStatusSchema.optional(),
});

const CreateTopicZodSchema = BaseTopicZodSchema;
const UpdateTopicZodSchema = BaseTopicZodSchema.partial();

export const TopicValidation = {
  CreateTopicZodSchema,
  UpdateTopicZodSchema,
};
