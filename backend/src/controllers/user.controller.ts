import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { ApiResponse } from "../utils/response";
import { AppError } from "../utils/errorHandler";
import {  generateTokensAndSetCookies, verifyToken } from "../helpers/auth.helper";
import {
  generateVerificationToken,
  generateSecureResetToken,
  isVerificationExpired,
} from "../helpers/verification";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../services/email.service";

// ============= User registration controller ====================
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
  const token = generateTokensAndSetCookies(newUser._id.toString(), res);

  try {
    await sendVerificationEmail(newUser.email, newUser.name, code);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }

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

// ========== User email verification controller ==================

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  if (!code) {
    throw new AppError("Verification code is required", 400);
  }

  // Find user with verification code
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpireAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired verification code", 400);
  }

  // Update user
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpireAt = undefined;
  await user.save();

  // Send welcome email
  try {
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }

  ApiResponse.success(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    "Email verified successfully!"
  );
};

// ==================== USER LOGIN CONTROLLER ====================
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // Find user and include password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token and set cookie
  const token = generateTokenAndSetCookie(user._id.toString(), res);

  ApiResponse.success(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
      },
      token,
    },
    "Login successful"
  );
};

// ==================== USER LOGOUT CONTROLLER ====================

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Clear cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  ApiResponse.success(res, null, "Logout successful");
};

// ==================== FORGOT PASSWORD ====================
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return ApiResponse.success(
      res,
      null,
      "If your email is registered, you will receive a password reset link"
    );
  }

  // Generate reset token (6 digit code)
  const { token, expiresAt } = generateSecureResetToken();

  user.resetPasswordToken = token;
  user.resetPasswordExpire = expiresAt;
  await user.save();

  // Send reset email
  try {
    await sendPasswordResetEmail(user.email, user.name, token);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    throw new AppError("Failed to send reset email. Please try again.", 500);
  }

  ApiResponse.success(res, null, "Password reset link sent to your email");
};

// ==================== RESET PASSWORD ====================
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new AppError("Reset token and new password are required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  // Find user with valid reset token
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired reset code", 400);
  }

  // Update password
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  ApiResponse.success(
    res,
    null,
    "Password reset successful. You can now login with your new password."
  );
};

// ==================== GET CURRENT USER ====================
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assuming you have auth middleware that adds user to req
  const userId = (req as any).userId;

  if (!userId) {
    throw new AppError("Not authenticated", 401);
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  ApiResponse.success(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    },
    "User retrieved successfully"
  );
};

// ==================== RESEND VERIFICATION CODE ====================
export const resendVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isVerified) {
    throw new AppError("Email is already verified", 400);
  }

  // Generate new verification code
  const { code, expiresAt } = generateVerificationToken();

  user.verificationToken = code;
  user.verificationTokenExpireAt = expiresAt;
  await user.save();

  // Send verification email
  try {
    await sendVerificationEmail(user.email, code, user.name);
  } catch (error) {
    throw new AppError(
      "Failed to send verification email. Please try again.",
      500
    );
  }

  ApiResponse.success(
    res,
    null,
    "Verification code resent successfully. Check your email."
  );
};

// ==================== UPDATE USER PROFILE ====================
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).userId;
  const { name } = req.body;

  if (!name) {
    throw new AppError("Name is required", 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  ApiResponse.success(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    "Profile updated successfully"
  );
};

// ==================== CHANGE PASSWORD ====================
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("Current password and new password are required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("New password must be at least 6 characters", 400);
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw new AppError("Current password is incorrect", 401);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  ApiResponse.success(res, null, "Password changed successfully");
};

// ==================== DELETE ACCOUNT ====================
export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).userId;
  const { password } = req.body;

  if (!password) {
    throw new AppError("Password is required to delete account", 400);
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError("Incorrect password", 401);
  }

  // Delete user
  await User.findByIdAndDelete(userId);

  // Clear cookie
  res.clearCookie("token");

  ApiResponse.success(res, null, "Account deleted successfully");
};
