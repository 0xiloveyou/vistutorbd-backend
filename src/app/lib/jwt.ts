import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return {
      success: true as const,
      data: jwt.verify(token, secret) as JwtPayload,
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Invalid token",
    };
  }
};

export const jwtUtils = { createToken, verifyToken };
