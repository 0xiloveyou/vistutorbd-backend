import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { Role } from "@prisma/client";
import config from "../config";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

export interface RequestUser {
  email: string;
  name: string;
  userId: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.cookies?.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization.split(" ")[1]
          : req.headers.authorization;

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not logged in. Please log in to access this resource.",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret,
      );

      if (!verifiedToken.success) {
        throw new AppError(httpStatus.UNAUTHORIZED, verifiedToken.error);
      }

      const { email, name, userId, role } = verifiedToken.data;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Forbidden. You don't have permission to access this resource.",
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: String(userId) },
      });

      if (!user) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "User not found. Please log in again.",
        );
      }

      if (user.status === "BLOCKED") {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Your account has been blocked. Please contact support.",
        );
      }

      req.user = {
        email: String(email),
        name: String(name),
        userId: user.id,
        role: user.role,
      };

      next();
    },
  );
};

/**
 * Attaches `req.user` when a valid token is present, but never rejects guests.
 * Used by public endpoints that adapt their output for signed-in learners.
 */
export const optionalAuth = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      return next();
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: String(verifiedToken.data.userId) },
    });

    if (user && !user.isDeleted && user.status !== "BLOCKED") {
      req.user = {
        email: user.email,
        name: user.name,
        userId: user.id,
        role: user.role,
      };
    }

    next();
  },
);
