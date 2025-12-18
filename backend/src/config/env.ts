import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const requiredEnvVars = [
  "MONGO_URI",
  "PORT",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
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
 
  smtp: {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    secure: process.env.SMTP_SECURE === "true",
  },
  emailFrom: {
    address: process.env.EMAIL_FROM!,
    name: process.env.EMAIL_FROM_NAME!,
  },
};

export default config;
