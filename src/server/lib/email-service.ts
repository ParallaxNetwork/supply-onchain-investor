import * as nodemailer from "nodemailer";

interface SendOtpParams {
  email: string;
  otp: string;
  role: string;
}

export const sendOTPEmail = async ({ email, otp, role }: SendOtpParams) => {
  // In development, log the OTP to console for easy testing, 
  // unless EMAIL_SERVER is explicitly configured to test real emails
  if (process.env.NODE_ENV !== "production" && !process.env.EMAIL_SERVER) {
    console.log(`\n==================================================`);
    console.log(`[Email Service] To: ${email}`);
    console.log(`[Email Service] Subject: Your Login Code`);
    console.log(`[Email Service] Role: ${role}`);
    console.log(`[Email Service] OTP: ${otp}`);
    console.log(`==================================================\n`);
    return;
  }

  // Production email sending logic
  // Ensure EMAIL_SERVER and EMAIL_FROM are set in your environment variables
  if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) {
    console.warn("Email service not configured properly (EMAIL_SERVER or EMAIL_FROM missing)");
    return;
  }

  try {
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your APLX Login Code",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Login Verification</h1>
          <p>You requested to login as <strong>${role}</strong>.</p>
          <p>Your verification code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000;">${otp}</span>
          </div>
          <p>This code expires in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[Email Service] Failed to send email:", error);
    throw new Error("Failed to send verification email");
  }
};
