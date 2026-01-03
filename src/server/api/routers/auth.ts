import { z } from "zod";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { sendOTPEmail } from "@/server/lib/email-service";

export const authRouter = createTRPCRouter({
  requestOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        role: z.enum(["INVESTOR", "TRADER"]),
      })
    )
    .mutation(async ({ input }) => {
      const { email, role } = input;

      // Check if user exists with a different role
      // This enforces role separation at the OTP request level too, though strictly 
      // the login verification handles the final check.
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.role !== role && existingUser.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `This email is associated with a ${existingUser.role} account. Please switch to the correct login tab.`,
        });
      }

      // Generate 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      
      // Generate Session ID
      const sessionId = crypto.randomUUID();

      // Create OTP Session in DB
      await db.otpSession.create({
        data: {
          email,
          otp,
          sessionId,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        },
      });

      // Send Email
      await sendOTPEmail({ email, otp, role });

      return { sessionId };
    }),
});
