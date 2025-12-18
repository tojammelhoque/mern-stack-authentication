import nodemailer from "nodemailer";
import { config } from "../config/env";
import {
  verificationEmailTemplate,
  verificationEmailText,
} from "../templates/emails/verification.template";
import {
  welcomeEmailTemplate,
  welcomeEmailText,
} from "../templates/emails/welcome.template";
import {
  resetPasswordEmailTemplate,
  resetPasswordEmailText,
} from "../templates/emails/resetPassword.template";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: config.mailtrap.host,
  port: config.mailtrap.port,
  auth: {
    user: config.mailtrap.user,
    pass: config.mailtrap.pass,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Send verification email
export const sendVerificationEmail = async (
  email: string,
  verificationCode: string,
  userName: string
) => {
  try {
    const mailOptions = {
      from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: verificationEmailTemplate(userName, verificationCode),
      text: verificationEmailText(userName, verificationCode),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, userName: string) => {
  try {
    const mailOptions = {
      from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
      to: email,
      subject: "Welcome to Mern Stack Authentication System 🎉",
      html: welcomeEmailTemplate(userName),
      text: welcomeEmailText(userName),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  userName: string,
  resetToken: string
) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
      to: email,
      subject: "Reset Your Password",
      html: resetPasswordEmailTemplate(userName, resetToken, resetUrl),
      text: resetPasswordEmailText(userName, resetToken, resetUrl),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};