import z from "zod";

export const localizedTextSchema = z.object({
  en: z.string().trim().min(1, "English text is required."),
  bn: z.string().trim().min(1, "Bangla text is required."),
});

export const optionalLocalizedTextSchema = localizedTextSchema.optional();

export const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug is too short.")
  .max(80, "Slug is too long.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug may only contain lowercase letters, numbers and hyphens.",
  );

export const vizIdSchema = z
  .string()
  .trim()
  .regex(
    /^viz\.[a-z0-9_]+(\.[a-z0-9_]+)+\.v\d+$/,
    "vizId must follow viz.<band>.<subject>.<chapter>.<topic>.<variant>.v<version>.",
  );

export const contentStatusSchema = z.enum([
  "DRAFT",
  "REVIEW",
  "PUBLISHED",
  "ARCHIVED",
]);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
