"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("admin-credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      console.error("[Admin Login Form] Error:", error);
      setError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
          <Icon name="error" className="text-lg" />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          className="text-neutral-900 text-sm font-medium"
          htmlFor="admin-email"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            className="w-full h-12 px-4 rounded-lg bg-neutral-100 border-transparent text-neutral-900 placeholder-gray-400 focus:border-primary focus:bg-white focus:ring-0 transition-all duration-200 text-base"
            id="admin-email"
            name="email"
            placeholder="admin@aplx.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <Icon name="mail" className="text-[20px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            className="text-neutral-900 text-sm font-medium"
            htmlFor="admin-password"
          >
            Password
          </label>
        </div>
        <div className="relative group">
          <input
            className="w-full h-12 px-4 pr-12 rounded-lg bg-neutral-100 border-transparent text-neutral-900 placeholder-gray-400 focus:border-primary focus:bg-white focus:ring-0 transition-all duration-200 text-base"
            id="admin-password"
            name="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility_off"}
              className="text-[20px]"
            />
          </button>
        </div>
      </div>

      <button
        className="mt-4 w-full h-12 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        <span>{isLoading ? "Signing in..." : "Login to Dashboard"}</span>
        <Icon name="arrow_forward" className="text-[20px]" />
      </button>

      {process.env.NODE_ENV === "development" && (
        <div className="text-center text-xs text-gray-500 mt-2">
          <p>For development: admin@aplx.com / Admin1234</p>
        </div>
      )}
    </form>
  );
}

