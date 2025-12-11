import jwt from "jsonwebtoken";
import { Response } from "express";
import { config } from "../config/env";


// JWT Token Generation
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "7d",
  });
};

// Generate Token AND Set Cookie
export const generateTokenAndSetCookie = (userId: string, res: Response): string => {
  const token = generateToken(userId);

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// Verify Token
export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};