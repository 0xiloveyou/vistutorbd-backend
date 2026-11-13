import z from "zod";

const UpdateUserZodSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    role: z.enum(["ADMIN", "MODERATOR", "USER"]).optional(),
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Provide at least one field to update.",
  });

export const UserValidation = { UpdateUserZodSchema };
