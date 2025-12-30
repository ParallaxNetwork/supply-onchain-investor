"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("email");

  return (
    <div className="flex-1 flex flex-col justify-center min-h-[600px]">
      <div className="mx-auto w-full max-w-md px-6 lg:px-0">
        {step === "email" ? (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Continue with Email
              </h1>
              <p className="text-slate-500 text-sm lg:text-base">
                Enter your email address to continue. We’ll send you a one-time
                code to securely sign you in or create your account.
              </p>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-slate-200 bg-primary/5 p-3 text-sm text-slate-900/80">
                <Icon
                  name="verified_user"
                  className="text-lg text-primary"
                />
                <p className="leading-snug">
                  Identity verification is required to deposit funds and invest.
                  You can explore the platform before completing verification.
                </p>
              </div>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
              }}
            >
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-slate-500"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="block h-12 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <div className="flex h-6 items-center">
                  <input
                    className="h-5 w-5 rounded border-slate-300 bg-white text-primary focus:ring-offset-white focus:ring-primary cursor-pointer accent-primary"
                    id="terms"
                    name="terms"
                    type="checkbox"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    className="font-medium text-slate-500"
                    htmlFor="terms"
                  >
                    By continuing, you agree to the{" "}
                    <a
                      className="text-primary hover:text-primary/80 hover:underline"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-primary hover:text-primary/80 hover:underline"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>
              <Button
                className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20"
                type="submit"
              >
                Continue
              </Button>
              <div className="text-center text-xs text-slate-500 mt-4">
                Secure custodial wallet generation powered by APLX Core
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Continue with Email
              </h1>
              <p className="text-slate-500 text-sm lg:text-base">
                Enter your email address to continue. We’ll send you a one-time
                code to securely sign you in or create your account.
              </p>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-slate-200 bg-primary/5 p-3 text-sm text-slate-900/80">
                <Icon
                  name="verified_user"
                  className="text-lg text-primary"
                />
                <p className="leading-snug">
                  Identity verification is required to deposit funds and invest.
                  You can explore the platform before completing verification.
                </p>
              </div>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle OTP verification
                // console.log("OTP verified");
              }}
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verification Code
                </label>
                <div className="flex gap-2 justify-between">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      className="block h-12 w-12 rounded-lg border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                      maxLength={1}
                      type="text"
                    />
                  ))}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-slate-900">
                    Code sent to your email
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Didn’t receive the code?{" "}
                    <span className="text-primary hover:text-primary/80 cursor-pointer font-semibold transition-colors">
                      Resend in 30s
                    </span>
                  </p>
                </div>
              </div>
              <Button
                className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20"
                type="submit"
              >
                Verify Code
              </Button>
              <div className="text-center text-xs text-slate-500 mt-4">
                Secure custodial wallet generation powered by APLX Core
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}