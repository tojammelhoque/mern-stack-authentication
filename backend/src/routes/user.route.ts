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

// Initialize router
const authRouter = Router();

// ==================== PUBLIC ROUTES ====================
// Authentication
authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/login", asyncHandler(loginUser));
authRouter.post("/verify-email", asyncHandler(verifyEmail));
authRouter.post("/resend-verification", asyncHandler(resendVerificationCode));

// Password Reset
authRouter.post("/forgot-password", asyncHandler(forgotPassword));
authRouter.post("/reset-password", asyncHandler(resetPassword));

// ==================== PROTECTED ROUTES (Require Login) ====================
// User Info
authRouter.get("/me", protect, asyncHandler(getCurrentUser));
authRouter.post("/logout", protect, asyncHandler(logoutUser));

// Profile Management
authRouter.patch("/profile", protect, asyncHandler(updateProfile));
authRouter.patch("/change-password", protect, asyncHandler(changePassword));

// Account Deletion
authRouter.delete("/delete-account", protect, asyncHandler(deleteAccount));

// Export the router
export default authRouter;


