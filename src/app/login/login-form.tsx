"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { api } from "@/trpc/react";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [role, setRole] = useState<"INVESTOR" | "TRADER">("INVESTOR");
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = api.auth.requestOtp.useMutation({
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setStep("otp");
      setIsLoading(false);
    },
    onError: (err) => {
      setError(err.message || "Failed to send verification code");
      setIsLoading(false);
    },
  });

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    requestOtp.mutate({ email, role });
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Collect the 6 digits from inputs
    const otpInputs = document.querySelectorAll<HTMLInputElement>('input[name="otp-digit"]');
    const otp = Array.from(otpInputs).map(input => input.value).join("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        role,
        otp,
        sessionId,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid code or session expired. Please try again.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push(role === "TRADER" ? "/trader/dashboard" : "/investor/dashboard");
      }
    } catch {
      setError("An error occurred during login.");
      setIsLoading(false);
    }
  };

  const toggleRole = () => {
    setRole((prev) => (prev === "INVESTOR" ? "TRADER" : "INVESTOR"));
    setError(null);
  };

  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value && !/^\d+$/.test(value)) return; // Only allow digits

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(`input[name="otp-digit"][data-index="${index + 1}"]`);
      nextInput?.focus();
    }
  };

  const handleOtpInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(`input[name="otp-digit"][data-index="${index - 1}"]`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center min-h-[600px]">
      <div className="mx-auto w-full max-w-md px-6 lg:px-0">
        {step === "email" ? (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                {role === "INVESTOR" ? "Investor Login" : "Trader Login"}
              </h1>
              <p className="text-slate-500 text-sm lg:text-base">
                Enter your email address to continue as {role === "INVESTOR" ? "an investor" : "a trader"}. We’ll send you a one-time
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
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
                  <Icon name="error" className="text-lg" />
                  {error}
                </div>
              )}
            </div>
            <form
              className="space-y-5"
              onSubmit={handleRequestOtp}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
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
              <div className="flex gap-4">
                <Button
                  className="flex-1 h-12 text-sm font-bold shadow-lg shadow-primary/20"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Continue"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 text-sm font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                  onClick={toggleRole}
                  disabled={isLoading}
                >
                  Login as {role === "INVESTOR" ? "Trader" : "Investor"}
                </Button>
              </div>
              <div className="text-center text-xs text-slate-500 mt-4">
                Secure custodial wallet generation powered by APLX Core
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Verify Code
              </h1>
              <p className="text-slate-500 text-sm lg:text-base">
                Enter the code sent to <strong>{email}</strong> to continue.
              </p>
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
                  <Icon name="error" className="text-lg" />
                  {error}
                </div>
              )}
            </div>
            <form
              className="space-y-5"
              onSubmit={handleVerifyOtp}
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verification Code
                </label>
                <div className="flex gap-2 justify-between">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      name="otp-digit"
                      data-index={i}
                      className="block h-12 w-12 rounded-lg border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                      maxLength={1}
                      type="text"
                      disabled={isLoading}
                      onChange={(e) => handleOtpInputChange(e, i)}
                      onKeyDown={(e) => handleOtpInputKeyDown(e, i)}
                    />
                  ))}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-slate-900">
                    Code sent to your email
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Didn’t receive the code?{" "}
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80 cursor-pointer font-semibold transition-colors bg-transparent border-none p-0"
                      onClick={() => {
                         setStep("email");
                         setError(null);
                      }}
                    >
                      Change Email
                    </button>
                  </p>
                </div>
              </div>
              <Button
                className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
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