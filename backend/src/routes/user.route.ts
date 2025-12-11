import { asyncHandler } from "./../utils/errorHandler";
import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

// Initialize router
const userRouter = Router();

// User registration route
userRouter.post("/register", asyncHandler(registerUser));

// Export the router
export default userRouter;
