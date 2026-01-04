import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Icon } from "@/components/ui/icon";
import { AdminLoginForm } from "./admin-login-form";
// import "./admin-login-styles.css";

export const metadata: Metadata = {
  title: "Admin Login - APLX Platform",
  description: "Admin login to APLX platform dashboard.",
};

export default async function AdminLoginPage() {
  const session = await auth();

  // Redirect if already logged in as admin
  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900">
      <div className="flex grow w-full h-screen">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
          <div className="w-full max-w-[440px] px-0 lg:px-8 py-8 relative z-10">
            <div className="flex flex-col items-start pb-6">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="security" className="text-accent text-[28px]" />
              </div>
              <h1 className="text-accent font-bold text-xl tracking-tight mb-2">
                APLX
              </h1>
              <h2 className="text-neutral-900 text-[30px] font-bold leading-tight mt-1">
                Welcome back, Admin
              </h2>
              <p className="text-gray-500 text-base font-normal mt-2">
                Please enter your details.
              </p>
            </div>
            <div className="pt-4">
              <AdminLoginForm />
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
              <Icon name="lock" className="text-gray-400 text-[16px]" />
              <p className="text-xs text-gray-400 font-medium">
                End-to-end encrypted connection
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden lg:flex lg:w-3/5 bg-primary text-white items-center justify-center p-8 digital-safe-illustration relative">
          <div className="node node-1"></div>
          <div className="node node-2"></div>
          <div className="node node-3"></div>
          <div className="node node-4"></div>
          <div className="node node-5"></div>
          <div className="node node-6"></div>
          <div className="line line-1-2"></div>
          <div className="line line-2-4"></div>
          <div className="line line-3-5"></div>
          <div className="line line-1-6"></div>
          <div className="text-center max-w-lg relative z-10">
            <h2 className="text-3xl font-bold text-accent mb-4">
              Secure Admin Access
            </h2>
            <p className="text-lg text-gray-300">
              Your connection is secured with advanced encryption. Access your
              dashboard with confidence.
            </p>
          </div>
        </div>
      </div>
      <footer className="py-4 text-center absolute bottom-0 left-0 w-full lg:w-2/5 text-gray-400 bg-white z-20">
        <p className="text-xs">
          © 2024 APLX Inc. Restricted Access. Unauthorized access is prohibited.
        </p>
      </footer>
    </div>
  );
}

