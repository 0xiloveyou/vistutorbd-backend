import z from "zod";

const SendContactZodSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  subject: z.string().trim().min(3, "Add a subject.").max(160),
  message: z.string().trim().min(10, "Write a little more.").max(4000),
});

export const ContactValidation = { SendContactZodSchema };
