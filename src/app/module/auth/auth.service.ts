import { AuthProvider, Role, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import type { TokenPayload } from "google-auth-library";
import httpStatus from "http-status";
import config from "../../config";
import { exchangeGoogleCode, googleClient } from "../../lib/googleAuth";
import { createToken, verifyToken } from "../../lib/jwt";
import { renderTemplate, sendMail } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { kv } from "../../lib/redis";
import { AppError } from "../../utils/AppError";
import type {
  IForgotPasswordPayload,
  IGoogleLoginPayload,
  ILoginPayload,
  IRegisterPayload,
  IRequestUser,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from "../../interfaces";

const OTP_TTL_SECONDS = 5 * 60;
const OTP_RESEND_COOLDOWN_SECONDS = 60;

const enforceOtpResendCooldown = async (kind: string, email: string) => {
  const key = `otp-resend:${kind}:${email}`;
  if (await kv.get(key)) {
    throw new AppError(
      httpStatus.TOO_MANY_REQUESTS,
      "Please wait 1 minute before requesting another OTP.",
    );
  }
  await kv.set(key, "1", OTP_RESEND_COOLDOWN_SECONDS);
};

const authPayloadFor = (user: {
  id: string;
  name: string;
  email: string;
  role: Role;
}) => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const createTokenPair = (user: {
  id: string;
  name: string;
  email: string;
  role: Role;
}) => {
  const payload = authPayloadFor(user);
  return {
    accessToken: createToken(
      payload,
      config.jwt_access_secret,
      config.jwt_access_expires_in,
    ),
    refreshToken: createToken(
      payload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in,
    ),
  };
};

const register = async (payload: IRegisterPayload) => {
  const email = payload.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(
      httpStatus.CONFLICT,
      "An account with this email already exists.",
    );
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  const otp = crypto.randomInt(100000, 1000000).toString();

  await kv.set(`registration-otp:${email}`, otp, OTP_TTL_SECONDS);
  await kv.set(
    `registration-data:${email}`,
    JSON.stringify({ name: payload.name, email, password: hashedPassword }),
    OTP_TTL_SECONDS,
  );

  if (config.node_env === "development") {
    console.log(`[dev] Registration OTP for ${email}: ${otp}`);
  }

  const html = await renderTemplate("registration-otp.ejs", {
    name: payload.name,
    email,
    otp,
    expirationMinutes: OTP_TTL_SECONDS / 60,
  });

  await sendMail({
    to: email,
    subject: "Verify your Math Learning Platform account",
    html,
  });
};

const verifyEmail = async (payload: IVerifyEmailPayload) => {
  const email = payload.email.trim().toLowerCase();
  const storedOtp = await kv.get(`registration-otp:${email}`);

  if (!storedOtp || storedOtp !== payload.otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired OTP.");
  }

  const storedData = await kv.get(`registration-data:${email}`);
  if (!storedData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Registration session expired. Please register again.",
    );
  }

  const registration = JSON.parse(storedData) as IRegisterPayload;

  const user = await prisma.user.create({
    data: {
      name: registration.name,
      email,
      password: registration.password,
      role: Role.USER,
      status: UserStatus.ACTIVE,
      authProvider: AuthProvider.CREDENTIAL,
      emailVerified: true,
    },
    omit: { password: true },
  });

  await kv.del(`registration-otp:${email}`);
  await kv.del(`registration-data:${email}`);

  const html = await renderTemplate("welcome.ejs", { name: user.name });
  await sendMail({
    to: user.email,
    subject: "Welcome to Math Learning Platform",
    html,
  });

  const tokens = createTokenPair(user);

  return { user, ...tokens };
};

const resendVerificationOtp = async (payload: IForgotPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) {
    throw new AppError(httpStatus.CONFLICT, "An account with this email already exists.");
  }
  const registrationData = await kv.get(`registration-data:${email}`);
  if (!registrationData) {
    throw new AppError(httpStatus.NOT_FOUND, "Registration session expired. Please register again.");
  }
  await enforceOtpResendCooldown("registration", email);
  const otp = crypto.randomInt(100000, 1000000).toString();
  await kv.set(`registration-otp:${email}`, otp, OTP_TTL_SECONDS);
  if (config.node_env === "development") console.log(`[dev] Registration OTP for ${email}: ${otp}`);
  const { name } = JSON.parse(registrationData) as { name: string };
  const html = await renderTemplate("registration-otp.ejs", { name, email, otp, expirationMinutes: OTP_TTL_SECONDS / 60 });
  await sendMail({ to: email, subject: "Verify your VisTutorBd account", html });
};

const login = async (payload: ILoginPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus.FORBIDDEN, "This account is blocked.");
  }

  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus.FORBIDDEN, "This account is deleted.");
  }

  if (!user.emailVerified) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Please verify your email address before logging in.",
    );
  }

  if (!user.password && user.googleId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This account uses Google login. Please sign in with Google.",
    );
  }

  const matches = await bcrypt.compare(payload.password, user.password || "");
  if (!matches) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials.");
  }

  return createTokenPair(user);
};

const getMe = async (requestUser: IRequestUser) => {
  const user = await prisma.user.findUnique({
    where: { id: requestUser.userId },
    omit: { password: true },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return user;
};

const refreshToken = async (token: string) => {
  const verified = verifyToken(token, config.jwt_refresh_secret);

  if (!verified.success || !verified.data) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token.");
  }

  const user = await prisma.user.findUnique({
    where: { id: String(verified.data.userId) },
  });

  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is inactive or missing.");
  }

  return createTokenPair(user);
};

const upsertGoogleUser = async (profile: TokenPayload) => {
  if (!profile?.email || !profile.name) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Google account is missing an email or name.",
    );
  }

  const email = profile.email.trim().toLowerCase();
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: profile.name,
        email,
        googleId: profile.sub,
        authProvider: AuthProvider.GOOGLE,
        role: Role.USER,
        emailVerified: true,
      },
    });

    const html = await renderTemplate("welcome.ejs", { name: user.name });
    await sendMail({
      to: user.email,
      subject: "Welcome to Math Learning Platform",
      html,
    });
  } else if (!user.googleId) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { googleId: profile.sub, emailVerified: true },
    });
  }

  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus.FORBIDDEN, "This account is blocked.");
  }

  return user;
};

const googleLogin = async (payload: IGoogleLoginPayload) => {
  let profile: TokenPayload | null | undefined;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: config.google_client_id,
    });
    profile = ticket.getPayload();
  } catch {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid or expired Google ID token.",
    );
  }

  if (!profile) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid or expired Google ID token.",
    );
  }

  const user = await upsertGoogleUser(profile);
  return createTokenPair(user);
};

const googleCallback = async (code: string) => {
  let profile: TokenPayload | null | undefined;

  try {
    profile = await exchangeGoogleCode(code);
  } catch {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Google authorization code is invalid or expired.",
    );
  }

  if (!profile) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Google authorization code is invalid or expired.",
    );
  }

  const user = await upsertGoogleUser(profile);
  return createTokenPair(user);
};

const forgotPassword = async (payload: IForgotPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.authProvider === AuthProvider.GOOGLE) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This account uses Google login and has no password.",
    );
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  await kv.set(`forgot-password-otp:${email}`, otp, OTP_TTL_SECONDS);

  if (config.node_env === "development") {
    console.log(`[dev] Password reset OTP for ${email}: ${otp}`);
  }

  const html = await renderTemplate("forgot-password.ejs", {
    name: user.name,
    otp,
    expirationMinutes: OTP_TTL_SECONDS / 60,
  });

  await sendMail({
    to: email,
    subject: "Reset your Math Learning Platform password",
    html,
  });
};

const resendPasswordOtp = async (payload: IForgotPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  if (user.authProvider === AuthProvider.GOOGLE) {
    throw new AppError(httpStatus.BAD_REQUEST, "This account uses Google login and has no password.");
  }
  await enforceOtpResendCooldown("forgot-password", email);
  const otp = crypto.randomInt(100000, 1000000).toString();
  await kv.set(`forgot-password-otp:${email}`, otp, OTP_TTL_SECONDS);
  if (config.node_env === "development") console.log(`[dev] Password reset OTP for ${email}: ${otp}`);
  const html = await renderTemplate("forgot-password.ejs", { name: user.name, otp, expirationMinutes: OTP_TTL_SECONDS / 60 });
  await sendMail({ to: email, subject: "Reset your VisTutorBd password", html });
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const storedOtp = await kv.get(`forgot-password-otp:${email}`);
  if (!storedOtp || storedOtp !== payload.otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired OTP.");
  }

  const hashed = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  await kv.del(`forgot-password-otp:${email}`);

  const html = await renderTemplate("reset-password-success.ejs", {
    name: user.name,
  });
  await sendMail({
    to: email,
    subject: "Your password was changed",
    html,
  });
};

export const AuthService = {
  register,
  verifyEmail,
  resendVerificationOtp,
  login,
  getMe,
  refreshToken,
  googleLogin,
  googleCallback,
  forgotPassword,
  resendPasswordOtp,
  resetPassword,
};
