import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { Request, Response } from "express";


declare module "express-serve-static-core" {
  interface Request {
    rateLimit?: {
      limit: number;
      current: number;
      remaining: number;
      resetTime: Date | undefined;
    };
  }
}

// General API rate limiter
export const apiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for authentication routes
export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  skipSuccessfulRequests: true, 
  message: "Too many login attempts, please try again after 15 minutes",
  handler: (req: Request, res: Response) => {
    const resetTime = req.rateLimit?.resetTime;
    const retryAfter = resetTime ? Math.ceil(resetTime.getTime() / 1000) : 900; // Default 15 min
    
    res.status(429).json({
      success: false,
      message: "Too many authentication attempts. Please try again later.",
      retryAfter,
    });
  },
});

// Password reset limiter
export const passwordResetLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: "Too many password reset attempts, please try again later",
  handler: (req: Request, res: Response) => {
    const resetTime = req.rateLimit?.resetTime;
    const retryAfter = resetTime ? Math.ceil(resetTime.getTime() / 1000) : 3600; // Default 1 hour
    
    res.status(429).json({
      success: false,
      message: "Too many password reset attempts. Please try again in an hour.",
      retryAfter,
    });
  },
});

// Email verification limiter
export const verificationLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 resend attempts
  message: "Too many verification requests, please try again later",
  handler: (req: Request, res: Response) => {
    const resetTime = req.rateLimit?.resetTime;
    const retryAfter = resetTime ? Math.ceil(resetTime.getTime() / 1000) : 900; // Default 15 min
    
    res.status(429).json({
      success: false,
      message: "Too many verification requests. Please try again later.",
      retryAfter,
    });
  },
});