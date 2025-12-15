import crypto from "crypto";

export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate verification token with expiry
export const generateVerificationToken = () => {
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  return {
    code,
    expiresAt,
  };
};

export const generateSecureResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return {
    token,
    expiresAt,
  };
};



