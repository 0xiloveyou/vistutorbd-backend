import type { Response } from "express";
import config from "../config";

const isDev = config.node_env === "development";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
