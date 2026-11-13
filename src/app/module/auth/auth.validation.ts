import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character.",
  );

const emailSchema = z
  .string()
  .email("Please provide a valid email address.")
  .transform((value) => value.trim().toLowerCase());

const RegisterZodSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  email: emailSchema,
  password: passwordSchema,
});

const VerifyEmailZodSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits."),
});

const LoginZodSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

const ForgotPasswordZodSchema = z.object({
  email: emailSchema,
});

const ResendOtpZodSchema = z.object({ email: emailSchema });

const ResetPasswordZodSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits."),
  newPassword: passwordSchema,
});

const GoogleLoginZodSchema = z.object({
  idToken: z.string().min(20, "A Google ID token is required."),
});

const GoogleCallbackZodSchema = z.object({
  code: z.string().min(10, "A Google authorization code is required."),
});

export const AuthValidation = {
  RegisterZodSchema,
  VerifyEmailZodSchema,
  LoginZodSchema,
  ForgotPasswordZodSchema,
  ResendOtpZodSchema,
  ResetPasswordZodSchema,
  GoogleLoginZodSchema,
  GoogleCallbackZodSchema,
};
