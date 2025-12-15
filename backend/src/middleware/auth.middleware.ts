import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { AppError } from "../utils/errorHandler";
import User from "../models/user.model";
import { verifyAccessToken } from "../helpers/auth.helper";

// Extend Express Request type to include user properties
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

// ==================== PROTECT ROUTE MIDDLEWARE ====================
// This middleware ensures the user is authenticated before accessing protected routes
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // Check for token in cookies (preferred method)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    // Fallback: Check for token in Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found, user is not authenticated
    if (!token) {
      throw new AppError("Not authorized. Please login.", 401);
    }

    // Verify the access token
    const decoded = verifyAccessToken(token);

    // Check if user still exists in database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // Attach user info to request object for use in route handlers
    req.userId = decoded.id;
    req.user = user;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Handle JWT specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token. Please login again.", 401));
    }

    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new AppError(
          "Access token expired. Please refresh your token or login again.",
          401
        )
      );
    }

    // Pass other errors to error handler
    next(error);
  }
};

// ==================== REQUIRE VERIFIED EMAIL ====================
// This middleware ensures the user has verified their email
export const requireVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    // Check if email is verified
    if (!req.user.isVerified) {
      throw new AppError(
        "Please verify your email to access this resource",
        403
      );
    }

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    next(error);
  }
};

// ==================== OPTIONAL AUTH ====================
// This middleware checks for authentication but doesn't throw error if not authenticated
// Useful for routes that work for both authenticated and non-authenticated users
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // Check for token in cookies
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    // Check for token in Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If token exists, try to verify it
    if (token) {
      try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id).select("-password");

        // If user exists, attach to request
        if (user) {
          req.userId = decoded.id;
          req.user = user;
        }
      } catch (error) {
        // Silently fail - token might be expired or invalid
        // But we don't throw error for optional auth
      }
    }

    // Continue regardless of authentication status
    next();
  } catch (error) {
    // Continue even if there's an error
    next();
  }
};

// ==================== CHECK USER EXISTS ====================
// This middleware checks if a user exists by ID
export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId || req.body.userId;

    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
