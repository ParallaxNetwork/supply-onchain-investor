import React from "react";
import { type Metadata } from "next";
import { Navbar } from "@/components/navbar";
import FooterDashboard from "@/components/footer";
import { SidebarAdmin } from "@/components/sidebar-admin";

export const metadata: Metadata = {
  title: "Admin Dashboard | APLX",
  description: "Admin dashboard for managing users, vaults, and approvals.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col antialiased selection:bg-accent selection:text-white pt-16">
      {/* Header */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Page Content */}
        {children}
      </div>

      {/* Footer Dashboard*/}
      <FooterDashboard />  
    </div>
  );
}

