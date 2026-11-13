import z from "zod";

const knowledgeKindSchema = z.enum([
  "CONCEPT",
  "WORKED_EXAMPLE",
  "MISCONCEPTION",
  "FORMULA",
  "HINT",
  "GLOSSARY",
  "STEP",
]);

const IngestChunkZodSchema = z.object({
  topicId: z.string().trim().optional(),
  chapterId: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  classBandId: z.string().trim().optional(),
  vizId: z.string().trim().optional(),
  stepIndex: z.coerce.number().int().min(0).optional(),
  lang: z.enum(["en", "bn"]).optional(),
  text: z.string().trim().min(5, "Chunk text is too short.").max(8000),
  kind: knowledgeKindSchema.optional(),
});

export const KnowledgeValidation = { IngestChunkZodSchema };
