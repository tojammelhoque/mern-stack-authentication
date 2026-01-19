// import nodemailer from "nodemailer";
import { Resend } from "resend";
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

// // Create reusable transporter with generic SMTP
// const transporter = nodemailer.createTransport({
//   host: config.smtp.host,
//   port: config.smtp.port,
//   secure: config.smtp.secure,
//   auth: {
//     user: config.smtp.user,
//     pass: config.smtp.pass,
//   },

//   tls: {
//     rejectUnauthorized: false, // Allow self-signed certificates (for development)
//   },
// });

// //  🔍 SMTP DEBUG
// console.log("📧 SMTP CONFIG CHECK", {
//   host: config.smtp.host,
//   port: config.smtp.port,
//   secure: config.smtp.secure,
//   user: config.smtp.user ? "OK" : "❌ MISSING",
//   pass: config.smtp.pass ? "OK" : "❌ MISSING",
//   from: config.emailFrom.address ? "OK" : "❌ MISSING",
// });

// Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ Email transporter error:", error);
//   } else {
//     console.log("✅ Email server is ready to send messages");
//   }
// });

// Create Resend client
const resend = new Resend(config.resendApiKey);

// // Send verification email
// export const sendVerificationEmail = async (
//   email: string,
//   verificationCode: string,
//   userName: string
// ) => {
//   try {
//     const mailOptions = {
//       from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
//       to: email,
//       subject: "Verify Your Email Address",
//       html: verificationEmailTemplate(userName, verificationCode),
//       text: verificationEmailText(userName, verificationCode),
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Verification email sent:", info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };

// // Send welcome email
// export const sendWelcomeEmail = async (email: string, userName: string) => {
//   try {
//     const mailOptions = {
//       from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
//       to: email,
//       subject: "Welcome to Mern Stack Authentication System 🎉",
//       html: welcomeEmailTemplate(userName),
//       text: welcomeEmailText(userName),
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Welcome email sent:", info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ Error sending welcome email:", error);
//     throw new Error("Failed to send welcome email");
//   }
// };

// // Send password reset email
// export const sendPasswordResetEmail = async (
//   email: string,
//   userName: string,
//   resetToken: string
// ) => {
//   try {
//     const resetUrl = `${
//       process.env.FRONTEND_URL || "http://localhost:5173"
//     }/reset-password?token=${resetToken}`;
//     const mailOptions = {
//       from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
//       to: email,
//       subject: "Reset Your Password",
//       html: resetPasswordEmailTemplate(userName, resetToken, resetUrl),
//       text: resetPasswordEmailText(userName, resetToken, resetUrl),
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Password reset email sent:", info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ Error sending password reset email:", error);
//     throw new Error("Failed to send password reset email");
//   }
// };

// ================= SEND VERIFICATION EMAIL =================
export const sendVerificationEmail = async (
  email: string,
  verificationCode: string,
  userName: string
) => {
  const { error } = await resend.emails.send({
    from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
    to: email,
    subject: "Verify Your Email Address",
    html: verificationEmailTemplate(userName, verificationCode),
    text: verificationEmailText(userName, verificationCode),
  });

  if (error) {
    console.error("❌ Resend verification email error:", error);
    throw new Error("Failed to send verification email");
  }

  
};

// ================= SEND WELCOME EMAIL =================
export const sendWelcomeEmail = async (email: string, userName: string) => {
  const { error } = await resend.emails.send({
    from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
    to: email,
    subject: "Welcome to MERN Stack Authentication System 🎉",
    html: welcomeEmailTemplate(userName),
    text: welcomeEmailText(userName),
  });

  if (error) {
    console.error("❌ Resend welcome email error:", error);
    throw new Error("Failed to send welcome email");
  }


};

// ================= SEND PASSWORD RESET EMAIL =================
export const sendPasswordResetEmail = async (
  email: string,
  userName: string,
  resetToken: string
) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const { error } = await resend.emails.send({
    from: `"${config.emailFrom.name}" <${config.emailFrom.address}>`,
    to: email,
    subject: "Reset Your Password",
    html: resetPasswordEmailTemplate(userName, resetToken, resetUrl),
    text: resetPasswordEmailText(userName, resetToken, resetUrl),
  });

  if (error) {
    console.error("❌ Resend reset email error:", error);
    throw new Error("Failed to send reset email");
  }

  
};