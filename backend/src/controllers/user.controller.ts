import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { ApiResponse } from "../utils/response";
import { AppError } from "../utils/errorHandler";
import { generateTokenAndSetCookie, verifyToken } from "../helpers/auth.helper";
import {
  generateVerificationToken,
  isVerificationExpired,
} from "../helpers/verification";

// User registration controller
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate input

  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  // If email exists, throw error
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }
  // Generate verification token
  const { code, expiresAt } = generateVerificationToken();

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    verificationToken: code,
    verificationTokenExpireAt: expiresAt,
  });

  // Generate JWT token and set cookie
  const token = generateTokenAndSetCookie(newUser._id.toString(), res);

  // Send success response
  ApiResponse.created(
    res,
    {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified,
        verifyToken: newUser.verificationToken,
        verifyTokenExpireAt: newUser.verificationTokenExpireAt,
      },
      token,
    },
    "User registered successfully. Please verify your email."
  );
};
