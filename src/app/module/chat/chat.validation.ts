import z from "zod";

const ChatZodSchema = z.object({
  sessionId: z.string().trim().optional(),
  question: z.string().trim().min(1, "A question is required.").max(4000),
  lang: z.enum(["en", "bn"]).optional(),
  classBandId: z.string().trim().optional(),
  classLevelId: z.string().trim().optional(),
  vizId: z.string().trim().optional(),
  stepIndex: z.coerce.number().int().min(0).optional(),
  params: z.record(z.string(), z.unknown()).optional(),
  topicSlug: z.string().trim().optional(),
});

const ImageProblemZodSchema = z.object({
  imageDataUrl: z
    .string()
    .max(8_000_000, "Image is too large. Maximum encoded size is 8 MB.")
    .regex(
      /^data:image\/(png|jpe?g|webp);base64,/,
      "PNG, JPEG or WebP required.",
    ),
  lang: z.enum(["en", "bn"]).optional(),
  classBandId: z.string().trim().optional(),
});

export const ChatValidation = { ChatZodSchema, ImageProblemZodSchema };
