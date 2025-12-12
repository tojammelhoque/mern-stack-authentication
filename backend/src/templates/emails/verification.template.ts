export const verificationEmailTemplate = (
  userName: string,
  verificationCode: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
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
                    <h2 style="color: #333; margin-bottom: 20px; font-size: 22px;">Email Verification</h2>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      Hi <strong>${userName}</strong>,
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      Thank you for registering! To complete your registration and verify your email address, 
                      please use the verification code below:
                    </p>
                    
                    <!-- Verification Code Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      font-size: 32px; 
                                      font-weight: bold; 
                                      text-align: center; 
                                      padding: 25px; 
                                      border-radius: 8px; 
                                      letter-spacing: 8px; 
                                      font-family: 'Courier New', monospace;">
                            ${verificationCode}
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      This code will expire in <strong style="color: #e74c3c;">15 minutes</strong>.
                    </p>
                    
                    <!-- Warning Box -->
                    <div style="background-color: #fff3cd; 
                                border-left: 4px solid #ffc107; 
                                padding: 15px; 
                                margin: 20px 0; 
                                border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px;">
                        <strong>⚠️ Security Note:</strong> If you didn't create an account with us, 
                        please ignore this email or contact our support team.
                      </p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                      Need help? Contact us at <a href="mailto:support@yourapp.com" style="color: #667eea; text-decoration: none;">support@yourapp.com</a>
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
                      This email was sent because you registered on our platform.
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

// Plain text version (fallback)
export const verificationEmailText = (
  userName: string,
  verificationCode: string
) => {
  return `
Hi ${userName},

Thank you for registering!

Your verification code is: ${verificationCode}

This code will expire in 15 minutes.

If you didn't create an account, please ignore this email.

Best regards,
Your App Team
  `.trim();
};