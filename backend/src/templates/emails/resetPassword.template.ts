// ===== backend/src/templates/emails/resetPassword.template.ts =====

export const resetPasswordEmailTemplate = (
  userName: string,
  resetToken: string,
  resetUrl: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Your App Name</h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333; margin-bottom: 20px; font-size: 22px;">Reset Your Password</h2>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      Hi <strong>${userName}</strong>,
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      We received a request to reset your password. Click the button below to create a new password:
                    </p>
                    
                    <!-- Reset Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${resetUrl}" 
                             style="display: inline-block;
                                    padding: 15px 40px;
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-weight: 600;
                                    font-size: 16px;">
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color: #666; font-size: 14px; margin: 15px 0;">
                      Or copy and paste this link into your browser:
                    </p>
                    <p style="background-color: #f5f5f5; 
                              padding: 10px; 
                              border-radius: 4px; 
                              word-break: break-all; 
                              font-size: 12px;
                              color: #666;">
                      ${resetUrl}
                    </p>
                    
                    <!-- Warning Box -->
                    <div style="background-color: #fff3cd; 
                                border-left: 4px solid #ffc107; 
                                padding: 15px; 
                                margin: 20px 0; 
                                border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px;">
                        <strong>⚠️ Security Alert:</strong> This link will expire in <strong>1 hour</strong>. 
                        If you didn't request a password reset, please ignore this email and ensure your account is secure.
                      </p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                      If you're having trouble clicking the button, contact support at 
                      <a href="mailto:support@yourapp.com" style="color: #667eea; text-decoration: none;">support@yourapp.com</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      © ${new Date().getFullYear()} Your App. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
                      This email was sent because a password reset was requested.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export const resetPasswordEmailText = (
  userName: string,
  resetToken: string,
  resetUrl: string
) => {
  return `
Hi ${userName},

We received a request to reset your password.

Click this link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

Best regards,
Your App Team
  `.trim();
};
