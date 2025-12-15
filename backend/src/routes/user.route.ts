import { asyncHandler } from "./../utils/errorHandler";
import { Router } from "express";
import {
  changePassword,
  deleteAccount,
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resendVerificationCode,
  resetPassword,
  updateProfile,
  verifyEmail,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";
import {
  authLimiter,
  passwordResetLimiter,
  verificationLimiter,
  apiLimiter,
} from "../middleware/rateLimiter.middleware";

// Initialize router
const authRouter = Router();

// ==================== PUBLIC ROUTES ====================
// Authentication
authRouter.post("/register", authLimiter, asyncHandler(registerUser));
authRouter.post("/login", authLimiter, asyncHandler(loginUser));
authRouter.post(
  "/verify-email",
  verificationLimiter,
  asyncHandler(verifyEmail)
);
authRouter.post(
  "/resend-verification",
  verificationLimiter,
  asyncHandler(resendVerificationCode)
);

// Password Reset
authRouter.post(
  "/forgot-password",
  passwordResetLimiter,
  asyncHandler(forgotPassword)
);
authRouter.post(
  "/reset-password",
  passwordResetLimiter,
  asyncHandler(resetPassword)
);

// ==================== PROTECTED ROUTES (Require Login) ====================
// User Info
authRouter.get("/me", protect, apiLimiter, asyncHandler(getCurrentUser));
authRouter.post("/logout", protect, asyncHandler(logoutUser));

// Profile Management
authRouter.patch("/profile", protect, apiLimiter, asyncHandler(updateProfile));
authRouter.patch(
  "/change-password",
  protect,
  apiLimiter,
  asyncHandler(changePassword)
);

// Account Deletion
authRouter.delete("/delete-account", protect, asyncHandler(deleteAccount));

// Export the router
export default authRouter;
