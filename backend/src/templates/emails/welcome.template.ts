export const welcomeEmailTemplate = (userName: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Mern Stack Authentication System</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Mern Stack Authentication System</h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333; margin-bottom: 20px; font-size: 22px;">Welcome Aboard! 🎉</h2>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      Hi <strong>${userName}</strong>,
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                      Thank you for verifying your email! Your account is now fully active, and you're ready to explore everything we have to offer.
                    </p>
                    
                    <!-- Success Badge -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                                      color: white; 
                                      font-size: 18px; 
                                      font-weight: 600; 
                                      text-align: center; 
                                      padding: 20px 40px; 
                                      border-radius: 8px; 
                                      display: inline-block;">
                            ✓ Email Verified Successfully
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Features Section -->
                    <div style="margin: 30px 0;">
                      <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">What's Next?</h3>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 10px 0;">
                            <div style="display: flex; align-items: start;">
                              <span style="color: #667eea; font-size: 20px; margin-right: 10px;">📝</span>
                              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #333;">Complete your profile</strong><br/>
                                Add more details to personalize your experience
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <div style="display: flex; align-items: start;">
                              <span style="color: #667eea; font-size: 20px; margin-right: 10px;">🚀</span>
                              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #333;">Get started</strong><br/>
                                Explore our features and discover what you can do
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <div style="display: flex; align-items: start;">
                              <span style="color: #667eea; font-size: 20px; margin-right: 10px;">💬</span>
                              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #333;">Need help?</strong><br/>
                                Our support team is here to assist you
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${
                            process.env.FRONTEND_URL || "http://localhost:5173"
                          }/dashboard" 
                             style="display: inline-block;
                                    padding: 14px 35px;
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-weight: 600;
                                    font-size: 16px;">
                            Go to Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Info Box -->
                    <div style="background-color: #f0f7ff; 
                                border-left: 4px solid #667eea; 
                                padding: 15px; 
                                margin: 20px 0; 
                                border-radius: 4px;">
                      <p style="margin: 0; color: #1e40af; font-size: 14px;">
                        <strong>💡 Tip:</strong> Keep your account secure by using a strong password and enabling two-factor authentication when available.
                      </p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px; line-height: 1.6;">
                      If you have any questions or need assistance, don't hesitate to reach out to our support team at 
                      <a href="mailto:support@yourapp.com" style="color: #667eea; text-decoration: none;">support@yourapp.com</a>
                    </p>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 20px; line-height: 1.6;">
                      We're excited to have you on board!
                    </p>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 10px;">
                      Best regards,<br/>
                      <strong style="color: #333;">The Mern Stack Authentication System Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      © ${new Date().getFullYear()} Mern Stack Authentication System. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
                      This email was sent because you successfully verified your account.
                    </p>
                    <p style="margin: 10px 0 0 0;">
                      <a href="#" style="color: #667eea; text-decoration: none; font-size: 11px; margin: 0 10px;">Privacy Policy</a>
                      <a href="#" style="color: #667eea; text-decoration: none; font-size: 11px; margin: 0 10px;">Terms of Service</a>
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
export const welcomeEmailText = (userName: string) => {
  return `
Hi ${userName},

Welcome Aboard! 🎉

Thank you for verifying your email! Your account is now fully active.

What's Next?

📝 Complete your profile - Add more details to personalize your experience
🚀 Get started - Explore our features and discover what you can do
💬 Need help? - Our support team is here to assist you

Visit your dashboard: ${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/dashboard

💡 Tip: Keep your account secure by using a strong password and enabling two-factor authentication when available.

If you have any questions, contact us at support@yourapp.com

We're excited to have you on board!

Best regards,
The Mern Stack Authentication System Team

© ${new Date().getFullYear()} Mern Stack Authentication System. All rights reserved.
  `.trim();
};
