import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const requiredEnvVars = [
  "MONGO_URI",
  "PORT",
  "MAILTRAP_HOST",
  "MAILTRAP_PORT",
  "MAILTRAP_USER",
  "MAILTRAP_PASS",
  "EMAIL_FROM",
  "EMAIL_FROM_NAME",
];

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
  mailtrap: {
    host: process.env.MAILTRAP_HOST!,
    port: Number(process.env.MAILTRAP_PORT!),
    user: process.env.MAILTRAP_USER!,
    pass: process.env.MAILTRAP_PASS!,
  },
  emailFrom: {
    address: process.env.EMAIL_FROM!,
    name: process.env.EMAIL_FROM_NAME!,
  },
};

export default config;
