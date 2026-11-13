import type { Request, Response } from "express";
import httpStatus from "http-status";
import { getGoogleAuthUrl, googleAuthConfigured } from "../../lib/googleAuth";
import { clearAuthCookies, setAuthCookies } from "../../lib/cookies";
import type { IRequestUser } from "../../interfaces";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  await AuthService.register(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Verification OTP sent to your email.",
    data: null,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.verifyEmail(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Email verified successfully.",
    data: result,
  });
});

const resendVerificationOtp = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resendVerificationOtp(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Verification OTP resent.", data: null });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully.",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is not authenticated.");
  }

  const result = await AuthService.getMe(req.user as IRequestUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile fetched successfully.",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing.");
  }

  const result = await AuthService.refreshToken(token);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New tokens generated successfully.",
    data: result,
  });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.googleLogin(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Google login successful.",
    data: result,
  });
});

const googleStart = catchAsync(async (req: Request, res: Response) => {
  if (!googleAuthConfigured) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      "Google OAuth is not configured on the backend.",
    );
  }

  const state =
    typeof req.query.state === "string" ? req.query.state : undefined;
  const url = getGoogleAuthUrl(state);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Google authorization URL generated.",
    data: { url },
  });
});

const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.googleCallback(req.body.code);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Google login successful.",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Password reset OTP sent to ${req.body.email}.`,
    data: null,
  });
});

const resendPasswordOtp = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resendPasswordOtp(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Password reset OTP resent.", data: null });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully.",
    data: null,
  });
});

const logout = catchAsync(async (_req: Request, res: Response) => {
  clearAuthCookies(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged out successfully.",
    data: null,
  });
});

export const AuthController = {
  register,
  verifyEmail,
  resendVerificationOtp,
  login,
  getMe,
  refreshToken,
  googleLogin,
  googleStart,
  googleCallback,
  forgotPassword,
  resendPasswordOtp,
  resetPassword,
  logout,
};
