import z from "zod";

const CreateReportZodSchema = z.object({
  targetType: z.enum(["chat_message", "topic", "visualization", "question"]),
  targetId: z.string().trim().min(1, "targetId is required."),
  reason: z.string().trim().min(3, "Please describe the reason.").max(200),
  details: z.string().trim().max(2000).optional(),
});

const UpdateReportZodSchema = z.object({
  status: z.enum(["OPEN", "REVIEWING", "RESOLVED", "DISMISSED"]),
});

export const ModerationValidation = {
  CreateReportZodSchema,
  UpdateReportZodSchema,
};
