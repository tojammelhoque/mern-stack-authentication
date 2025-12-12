import express from "express";
import { config } from "./config/env";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import connectDB from "./config/db";
import { errorHandler } from "./utils/errorHandler";
import authRouter from "./routes/user.route";

// Initialize Express app
const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true, // Important for cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1/auth", authRouter);


app.use(errorHandler)


// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
