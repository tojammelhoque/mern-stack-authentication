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

// Verify if code is expired
export const isVerificationExpired = (expiresAt: Date): boolean => {
  return new Date() > expiresAt;
};
