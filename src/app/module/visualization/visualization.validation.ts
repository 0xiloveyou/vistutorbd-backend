import z from "zod";
import {
  contentStatusSchema,
  localizedTextSchema,
  optionalLocalizedTextSchema,
  vizIdSchema,
} from "../../validators/common";

const BaseVisualizationZodSchema = z.object({
  vizId: vizIdSchema,
  kind: z.enum(["STATIC", "ANIMATED", "STEPPER", "SLIDER_GRAPH", "SCENE"]),
  renderer: z.string().trim().min(2, "renderer is required."),
  engine: z.string().trim().min(2, "engine is required."),
  title: localizedTextSchema,
  summary: optionalLocalizedTextSchema,
  inputs: z.record(z.string(), z.unknown()).optional(),
  spec: z.record(z.string(), z.unknown()).optional(),
  tags: z.array(z.string().trim()).optional(),
  concepts: z.array(z.string().trim()).optional(),
  prerequisites: z.array(z.string().trim()).optional(),
  difficulty: z.coerce.number().int().min(1).max(5).optional(),
  classBandIds: z.array(z.string().trim()).optional(),
  version: z.coerce.number().int().min(1).optional(),
  aiContext: z.string().trim().max(4000).optional(),
  status: contentStatusSchema.optional(),
});

const CreateVisualizationZodSchema = BaseVisualizationZodSchema;
const UpdateVisualizationZodSchema = BaseVisualizationZodSchema.partial();

export const VisualizationValidation = {
  CreateVisualizationZodSchema,
  UpdateVisualizationZodSchema,
};
