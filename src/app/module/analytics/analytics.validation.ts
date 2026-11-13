import z from "zod";

const RecordVisitZodSchema = z.object({
  visitorId: z
    .string()
    .trim()
    .min(8, "visitorId is too short.")
    .max(80, "visitorId is too long."),
  path: z.string().trim().max(400).optional(),
  referrer: z.string().trim().max(1000).optional(),
});

const SendReportZodSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
    .optional(),
});

export const AnalyticsValidation = {
  RecordVisitZodSchema,
  SendReportZodSchema,
};
