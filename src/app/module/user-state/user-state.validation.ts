import z from "zod";

const AddBookmarkZodSchema = z.object({
  topicId: z.string().trim().min(2, "topicId is required."),
});

const UpdateProgressZodSchema = z.object({
  isRead: z.boolean().optional(),
  lastVizId: z.string().trim().max(200).optional(),
  lastStepIndex: z.coerce.number().int().min(0).optional(),
});

const UpdatePreferencesZodSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  preferredLang: z.enum(["en", "bn"]).optional(),
  preferredTheme: z.string().trim().min(2).max(40).optional(),
  classBandId: z.string().trim().nullable().optional(),
  classLevelId: z.string().trim().nullable().optional(),
  companionEnabled: z.boolean().optional(),
  soundEnabled: z.boolean().optional(),
});

export const UserStateValidation = {
  AddBookmarkZodSchema,
  UpdateProgressZodSchema,
  UpdatePreferencesZodSchema,
};
