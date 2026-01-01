"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface InvestmentSidebarProps {
  funding: {
    totalRaised: string;
    target: string;
    percentage: number;
    ltvRatio: string;
    balance: string;
  };
}

export function InvestmentSidebar({ funding }: InvestmentSidebarProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 shadow-soft sticky top-24">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-neutral-500 text-sm font-semibold mb-1">
            Total Raised / Target
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-neutral-900">
              {funding.totalRaised}
            </span>
            <span className="text-sm text-neutral-500 font-medium">
              / {funding.target}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-primary font-bold text-lg bg-accent/10 px-2 py-0.5 rounded">
            {funding.percentage}%
          </span>
          <p className="text-neutral-500 text-[10px] mt-1 font-semibold">
            Funded
          </p>
        </div>
      </div>
      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-accent rounded-full relative"
          style={{ width: `${funding.percentage}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg mb-6 border border-neutral-100">
        <div className="flex items-center gap-2">
          <Icon
            name="percent"
            className="text-neutral-400 text-[20px]"
          />
          <span className="text-xs font-bold text-neutral-600 uppercase">
            LTV Ratio
          </span>
        </div>
        <span className="text-sm font-bold text-neutral-900">
          {funding.ltvRatio}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-2">
            Investment Amount
          </label>
          <div className="relative">
            <input
              className="block w-full rounded-xl border-neutral-200 bg-neutral-50 py-3.5 pl-4 pr-16 text-lg font-bold text-neutral-900 focus:border-primary focus:ring-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2"
              placeholder="0.00"
              type="number"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-500">
              IDRP
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-neutral-500">
              Balance: {funding.balance}
            </span>
            <button className="text-primary font-bold hover:underline">
              Max Amount
            </button>
          </div>
        </div>
        <Button className="w-full py-4 h-auto bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2">
          <span>Deposit & Invest</span>
          <Icon name="arrow_forward" className="text-[20px]" />
        </Button>
        <p className="text-center text-xs text-neutral-400">
          By investing, you agree to the{" "}
          <Link
            href="#"
            className="text-neutral-600 hover:text-primary font-medium underline"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}
