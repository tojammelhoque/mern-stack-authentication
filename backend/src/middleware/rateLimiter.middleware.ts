import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  skipSuccessfulRequests: true, 
  message: "Too many login attempts, please try again after 15 minutes",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many authentication attempts. Please try again later.",
      retryAfter: Math.ceil(req.rateLimit.resetTime! / 1000),
    });
  },
});

// Password reset limiter
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: "Too many password reset attempts, please try again later",
});

// Email verification limiter
export const verificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 resend attempts
  message: "Too many verification requests, please try again later",
});
