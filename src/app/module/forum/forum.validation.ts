import z from "zod";

const tagSchema = z
  .string()
  .trim()
  .min(1, "Tags cannot be empty.")
  .max(24, "A tag can be at most 24 characters.");

const imageUrlSchema = z
  .string()
  .trim()
  .max(2000, "Image link is too long.")
  .refine(
    (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
    "Image link must start with http:// or https://.",
  )
  .optional();

const CreatePostZodSchema = z.object({
  title: z.string().trim().min(4, "Add a short title.").max(160),
  body: z.string().trim().min(1, "Describe your problem.").max(8000),
  imageUrl: imageUrlSchema,
  tags: z.array(tagSchema).max(6, "Use at most 6 tags.").optional(),
  isAnonymous: z.boolean().optional(),
});

const CreateCommentZodSchema = z.object({
  body: z.string().trim().min(1, "Write a comment.").max(4000),
  isAnonymous: z.boolean().optional(),
});

const AskAiZodSchema = z.object({
  lang: z.enum(["en", "bn"]).optional(),
  classBandId: z.string().trim().optional(),
});

export const ForumValidation = {
  CreatePostZodSchema,
  CreateCommentZodSchema,
  AskAiZodSchema,
};
