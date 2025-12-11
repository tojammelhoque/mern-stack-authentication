
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const requiredEnvVars = ["MONGO_URI", "PORT"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`❌ Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  mongoUri: process.env.MONGO_URI!,
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
  jwtExpire: process.env.JWT_EXPIRES_IN || "7d",
};

export default config;
