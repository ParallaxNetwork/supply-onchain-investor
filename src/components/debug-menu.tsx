"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function DebugMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status, update } = useSession();

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  const handleLogin = async (role: "INVESTOR" | "ADMIN") => {
    await signIn("credentials", { role, callbackUrl: "/homepage" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="mb-2 flex w-80 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Debug Menu
            </span>
            <span className={cn(
              "text-[10px] font-mono",
              status === "authenticated" ? "text-green-600" :
                status === "loading" ? "text-yellow-600" : "text-slate-400"
            )}>
              {status}
            </span>
          </div>

          {session ? (
            <>
              <div className="mb-2 text-xs text-slate-600">
                Logged in as:{" "}
                <span className="font-bold">{session.user?.name}</span>
                <br />
                ID:{" "}
                <span className="font-mono text-[10px]">
                  {session.user?.id?.slice(0, 8)}...
                </span>
              </div>
              <div className="mb-2 max-h-40 overflow-auto rounded bg-slate-100 p-2 text-[10px] text-slate-800">
                <pre>{JSON.stringify(session, null, 2)}</pre>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => update()}
                  className="flex-1"
                >
                  <Icon name="refresh" className="text-lg" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Icon name="logout" className="text-lg" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2 text-xs text-slate-500">Mock Authentication</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLogin("INVESTOR")}
                className="w-full justify-start"
              >
                <Icon name="person" className="text-lg text-primary" />
                Login as Investor
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLogin("ADMIN")}
                className="w-full justify-start"
              >
                <Icon name="admin_panel_settings" className="text-lg text-purple-600" />
                Login as Admin
              </Button>
            </>
          )}
        </div>
      )}

      <Button
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
          isOpen ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-200"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Debug Menu"
      >
        <Icon name={isOpen ? "close" : "bug_report"} className="text-xl" />
      </Button>
    </div>
  );
}
