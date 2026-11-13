import z from "zod";

const timeModeSchema = z.enum([
  "UNLIMITED",
  "BASIC",
  "MEDIUM",
  "HARD",
  "CUSTOM",
]);

const numberRangeSchema = z.object({
  min: z.coerce.number().int(),
  max: z.coerce.number().int(),
});

const QuizConfigZodSchema = z
  .object({
    chapterId: z.string().trim().min(2, "chapterId is required."),
    timeMode: timeModeSchema.optional(),
    customSeconds: z.coerce.number().int().min(5).max(3600).optional(),
    answerMode: z.enum(["MCQ", "TYPED"]).optional(),
    difficulty: z.coerce.number().int().min(1).max(5).optional(),
    numberRange: numberRangeSchema.optional(),
    companionSlapstick: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.timeMode !== "CUSTOM" ||
      (typeof value.customSeconds === "number" && value.customSeconds > 0),
    {
      message: "customSeconds is required when timeMode is CUSTOM.",
      path: ["customSeconds"],
    },
  );

const GenerateQuizZodSchema = z.object({
  chapterId: z.string().trim().min(2, "chapterId is required."),
  count: z.coerce.number().int().min(1).max(30).optional(),
  mode: z.enum(["MCQ", "TYPED"]).optional(),
  difficulty: z.coerce.number().int().min(1).max(5).optional(),
  generator: z.string().trim().optional(),
});

const SubmitAttemptZodSchema = z.object({
  chapterId: z.string().trim().min(2, "chapterId is required."),
  durationSec: z.coerce.number().int().min(0).max(86_400).optional(),
  answers: z
    .array(
      z.object({
        templateKey: z.string().trim().min(2),
        seed: z.string().trim().min(1),
        submitted: z.string().trim().max(500),
      }),
    )
    .min(1, "At least one answer is required."),
});

export const QuizValidation = {
  QuizConfigZodSchema,
  GenerateQuizZodSchema,
  SubmitAttemptZodSchema,
};
