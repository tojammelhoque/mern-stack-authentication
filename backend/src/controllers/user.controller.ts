import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { ApiResponse } from "../utils/response";
import { AppError } from "../utils/errorHandler";
import {
  generateTokensAndSetCookies,
  clearAuthCookies,
} from "../helpers/auth.helper";
import {
  generateVerificationToken,
  generateSecureResetToken,
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
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
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

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = generateTokensAndSetCookies(
    newUser._id.toString(),
    res
  );

  // Save refresh token to database
  newUser.refreshToken = refreshToken;
  newUser.refreshTokenExpire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await newUser.save();

  // Send verification email
  try {
    await sendVerificationEmail(newUser.email, code, newUser.name);
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
      },
      accessToken,
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

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = generateTokensAndSetCookies(
    user._id.toString(),
    res
  );

  // Save refresh token to database
  user.refreshToken = refreshToken;
  user.refreshTokenExpire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  user.lastLogin = new Date();
  await user.save();

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
      accessToken,
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
  const userId = (req as any).userId;

  // Clear refresh token from database
  if (userId) {
    await User.findByIdAndUpdate(userId, {
      refreshToken: undefined,
      refreshTokenExpire: undefined,
    });
  }

  // Clear both cookies
  clearAuthCookies(res);

  ApiResponse.success(res, null, "Logout successful");
};

// ==================== REFRESH TOKEN CONTROLLER ====================
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError("Refresh token not found", 401);
  }

  // Find user with this refresh token
  const user = await User.findOne({
    refreshToken,
    refreshTokenExpire: { $gt: Date.now() },
  }).select("+refreshToken");

  if (!user) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } =
    generateTokensAndSetCookies(user._id.toString(), res);

  // Update refresh token in database
  user.refreshToken = newRefreshToken;
  user.refreshTokenExpire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  ApiResponse.success(
    res,
    {
      accessToken,
    },
    "Token refreshed successfully"
  );
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
    // Don't reveal if email exists or not
    return ApiResponse.success(
      res,
      null,
      "If your email is registered, you will receive a password reset link"
    );
  }

  // Generate reset token (secure random token)
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
        createdAt: user.createdAt,
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

  if (name.length < 2) {
    throw new AppError("Name must be at least 2 characters", 400);
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

  if (currentPassword === newPassword) {
    throw new AppError(
      "New password must be different from current password",
      400
    );
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

  // Clear cookies
  clearAuthCookies(res);

  ApiResponse.success(res, null, "Account deleted successfully");
};