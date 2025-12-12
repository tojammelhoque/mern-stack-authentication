import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { AppError } from "../utils/errorHandler";
import User from "../models/user.model";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

// ==================== PROTECT ROUTE MIDDLEWARE ====================
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from cookie or Authorization header
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Not authorized. Please login.", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    // Check if user exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // Add user to request object
    req.userId = decoded.id;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token. Please login again.", 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired. Please login again.", 401));
    }
    next(error);
  }
};

// ==================== REQUIRE VERIFIED EMAIL ====================
export const requireVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    if (!req.user.isVerified) {
      throw new AppError(
        "Please verify your email to access this resource",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

// ==================== OPTIONAL AUTH (doesn't throw error) ====================
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.userId = decoded.id;
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};
