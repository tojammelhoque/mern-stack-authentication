import jwt from "jsonwebtoken";
import { Response } from "express";
import { config } from "../config/env";
import crypto from "crypto";
import { JwtPayloadWithId } from "../types/jwt.types";

// ==================== ACCESS TOKEN (Short-lived: 15 minutes) ====================
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "15m", // Short-lived for security
  });
};

// ==================== REFRESH TOKEN (Long-lived: 7 days) ====================
export const generateRefreshToken = (): string => {
  // Generate a secure random token
  return crypto.randomBytes(40).toString("hex");
};

// ==================== GENERATE BOTH TOKENS & SET COOKIES ====================
export const generateTokensAndSetCookies = (
  userId: string,
  res: Response
): { accessToken: string; refreshToken: string } => {
  // Generate both tokens
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  // Set Access Token Cookie (15 minutes)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set Refresh Token Cookie (7 days)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};

// ==================== VERIFY ACCESS TOKEN ====================
export const verifyAccessToken = (token: string): JwtPayloadWithId => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // Type guard to ensure decoded has id property
    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    if (!decoded.id) {
      throw new Error("Token missing user id");
    }

    return decoded as JwtPayloadWithId;
  } catch (error) {
    throw error;
  }
};

// ==================== CLEAR AUTH COOKIES ====================
export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
  });
};
