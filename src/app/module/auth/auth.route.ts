import { Role } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.RegisterZodSchema),
  AuthController.register,
);
router.post(
  "/verify-email",
  validateRequest(AuthValidation.VerifyEmailZodSchema),
  AuthController.verifyEmail,
);
router.post("/resend-verification-otp", validateRequest(AuthValidation.ResendOtpZodSchema), AuthController.resendVerificationOtp);
router.post(
  "/login",
  validateRequest(AuthValidation.LoginZodSchema),
  AuthController.login,
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.MODERATOR, Role.USER),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/google",
  validateRequest(AuthValidation.GoogleLoginZodSchema),
  AuthController.googleLogin,
);
router.get("/google/start", AuthController.googleStart);
router.post(
  "/google/callback",
  validateRequest(AuthValidation.GoogleCallbackZodSchema),
  AuthController.googleCallback,
);
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.ForgotPasswordZodSchema),
  AuthController.forgotPassword,
);
router.post("/resend-forgot-password-otp", validateRequest(AuthValidation.ResendOtpZodSchema), AuthController.resendPasswordOtp);
router.post(
  "/reset-password",
  validateRequest(AuthValidation.ResetPasswordZodSchema),
  AuthController.resetPassword,
);
router.post("/logout", AuthController.logout);

export const AuthRoutes = router;
