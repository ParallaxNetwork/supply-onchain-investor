"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvestmentDetailPage() {
  // Mock data - in a real app this would be fetched based on params.id
  const investmentData = {
    title: "Gayo Coffee Harvest 2024",
    description:
      "Invest in high-grade Arabica coffee sourced directly from the Gayo highlands. Backed by physical inventory managed under the SRG scheme, offering stable yield through commodity trade financing.",
    tags: [
      { icon: "verified", text: "Verified by Gudangin" },
      { icon: "security", text: "Insured 100%" },
      { icon: "lock_clock", text: "6 Month Lock" },
    ],
    stats: {
      profitShare: "70 : 30",
      profitShareLabel: "Investor : Trader",
      target: "500M",
      targetUnit: "IDRP",
      validity: "30 Oct 25",
      validitySub: "365 Days Left",
      lockPeriod: "6 Mo",
      lockPeriodSub: "From Close",
    },
    activeInvestment: {
      amount: "120,000,000",
      unit: "IDRP",
      lockPeriodRemaining: "3 Months Left",
      progress: 50,
      started: "15 Oct 2024",
      unlockDate: "15 Apr 2025",
    },
    funding: {
      totalRaised: "350M",
      target: "500M IDRP",
      percentage: 70,
      ltvRatio: "70%",
      balance: "45,000,000 IDRP",
    },
    collateral: {
      commodity: "Arabica Gayo",
      grade: "Grade 1 (Specialty)",
      quantity: "20,000 kg",
      valuation: "850,000,000",
      certificate: "SRG #10293",
    },
    tradeableAssets: [
      {
        name: "Arabica Gayo Lot A",
        grade: "Grade 1",
        quantity: "5,000 kg",
        valuation: "212,500,000",
        status: "In Vault",
        statusColor: "blue",
        details: {
          certificate: "SRG #10293-A",
          inboundDate: "15 Sep 2024",
          expiryDate: "15 Sep 2025",
          location: "Aceh Tengah WMS",
        },
      },
      {
        name: "Arabica Gayo Lot B",
        grade: "Grade 1",
        quantity: "8,000 kg",
        valuation: "340,000,000",
        status: "Pending",
        statusColor: "yellow",
        details: {
          certificate: "Processing...",
          inboundDate: "20 Oct 2024",
          expiryDate: "20 Oct 2025",
          location: "Transit to Gudangin",
        },
      },
      {
        name: "Robusta Lampung Lot X",
        grade: "Grade 2",
        quantity: "7,000 kg",
        valuation: "210,000,000",
        status: "Sold",
        statusColor: "green",
        details: {
          certificate: "CMA Agreement #992",
          inboundDate: "01 Aug 2024",
          expiryDate: "01 Aug 2025",
          location: "Lampung WMS",
        },
      },
    ],
    cashPool: {
      cap: "595,000,000",
      current: "350,000,000",
      liquidity: "150,000,000",
      deployed: "200,000,000",
      remaining: "245,000,000",
    },
    traceability: [
      {
        title: "Harvest & Aggregation",
        description:
          "Coffee cherries collected from 142 partner farmers in Bener Meriah district.",
        date: "Sep 12, 2024",
        tag: "Cooperative Alpha",
        active: false,
      },
      {
        title: "Processing & Grading",
        description:
          "Wet hulling process completed. Quality assessment passed for Grade 1 classification.",
        date: "Sep 20, 2024",
        tag: "QC Report #9921",
        active: false,
      },
      {
        title: "Warehousing (Gudangin)",
        description:
          "Commodities entered Gudangin WMS. SRG issued and verified. Collateral locked.",
        date: "Current Stage",
        tag: null,
        active: true,
      },
    ],
    manager: {
      name: "Nusantara Commodities",
      person: "Budi Santoso",
      role: "PT Kopi Nusantara Trading Tbk.",
      ccrRatio: "145%",
      vaultsManaged: 12,
      activeLoans: "12.5B IDRP",
      totalCollateral: "45.2B IDRP",
    },
    documents: [
      {
        title: "SRG Certificate #10293",
        subtitle: "Verified Warehouse Receipt",
        icon: "description",
        color: "text-red-500",
        bg: "bg-red-50",
      },
      {
        title: "Insurance Policy (All-Risk)",
        subtitle: "Coverage for 1.5B IDRP",
        icon: "security",
        color: "text-red-500",
        bg: "bg-red-50",
      },
      {
        title: "CMA Agreement",
        subtitle: "Collateral Management Terms",
        icon: "description",
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
    ],
  };

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-10 flex flex-col gap-10">
      {/* Breadcrumb & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
          <Link href="/investor/investment" className="hover:text-primary transition-colors">
            Vaults
          </Link>
          <Icon name="chevron_right" className="text-[16px] text-neutral-400" />
          <span className="text-primary font-bold">{investmentData.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-accent/10 text-primary uppercase tracking-wide">
            Batch A
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-600">
            <span className="size-2 rounded-full bg-accent animate-pulse"></span>
            Open for Funding
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Header Section */}
          <div>
            <h1 className="text-neutral-900 text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {investmentData.title}
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
              {investmentData.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {investmentData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium text-sm"
              >
                <Icon name={tag.icon} className="text-primary text-[18px]" />
                {tag.text}
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-xl border border-neutral-100 bg-white shadow-card">
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">
                Profit Share
              </p>
              <p className="text-primary text-2xl lg:text-3xl font-bold">
                {investmentData.stats.profitShare}
              </p>
              <p className="text-neutral-400 text-xs font-medium">
                {investmentData.stats.profitShareLabel}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-100 bg-white shadow-card">
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">
                Target
              </p>
              <p className="text-neutral-900 text-2xl lg:text-3xl font-bold">
                {investmentData.stats.target}
              </p>
              <p className="text-neutral-400 text-xs font-medium">
                {investmentData.stats.targetUnit}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-100 bg-white shadow-card">
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">
                Vault Validity
              </p>
              <p className="text-neutral-900 text-2xl lg:text-2xl font-bold truncate">
                {investmentData.stats.validity}
              </p>
              <p className="text-neutral-400 text-xs font-medium">
                {investmentData.stats.validitySub}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-100 bg-white shadow-card">
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">
                Lock Period
              </p>
              <p className="text-neutral-900 text-2xl lg:text-3xl font-bold">
                {investmentData.stats.lockPeriod}
              </p>
              <p className="text-neutral-400 text-xs font-medium">
                {investmentData.stats.lockPeriodSub}
              </p>
            </div>
          </div>

          {/* Active Investment Card */}
          <div className="bg-white border border-accent/30 rounded-2xl p-6 lg:p-8 shadow-card flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Icon
                    name="account_balance_wallet"
                    className="text-accent text-2xl"
                  />
                  Active Investment
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-neutral-900">
                    {investmentData.activeInvestment.amount}
                  </span>
                  <span className="text-base text-neutral-500 font-medium">
                    {investmentData.activeInvestment.unit}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-neutral-600 text-sm font-bold hover:bg-neutral-50 whitespace-nowrap self-start sm:self-center"
              >
                Initiate Vault Closure
              </Button>
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
              <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
                <span>Lock Period Remaining</span>
                <span className="font-bold text-neutral-900">
                  {investmentData.activeInvestment.lockPeriodRemaining}
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{
                    width: `${investmentData.activeInvestment.progress}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-500 mt-1">
                <span>Started: {investmentData.activeInvestment.started}</span>
                <span>
                  Unlock Date: {investmentData.activeInvestment.unlockDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar/Funding) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 shadow-soft sticky top-24">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-neutral-500 text-sm font-semibold mb-1">
                  Total Raised / Target
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-900">
                    {investmentData.funding.totalRaised}
                  </span>
                  <span className="text-sm text-neutral-500 font-medium">
                    / {investmentData.funding.target}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-primary font-bold text-lg bg-accent/10 px-2 py-0.5 rounded">
                  {investmentData.funding.percentage}%
                </span>
                <p className="text-neutral-500 text-[10px] mt-1 font-semibold">
                  Funded
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-accent rounded-full relative"
                style={{ width: `${investmentData.funding.percentage}%` }}
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
                {investmentData.funding.ltvRatio}
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
                    Balance: {investmentData.funding.balance}
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
        </div>
      </div>

      <hr className="border-neutral-100" />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Collateral Asset */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Icon name="inventory_2" className="text-primary" />
                Collateral Asset
              </h3>
              <button className="text-xs font-bold text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors">
                View WMS Ledger
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Commodity
                      </th>
                      <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">
                        Quantity
                      </th>
                      <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">
                        Valuation (IDR)
                      </th>
                      <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Certificate / Contract
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm">
                    <tr className="group hover:bg-neutral-50 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-neutral-900">
                          {investmentData.collateral.commodity}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-600">
                        {investmentData.collateral.grade}
                      </td>
                      <td className="p-4 text-right text-neutral-900 font-mono font-medium">
                        {investmentData.collateral.quantity}
                      </td>
                      <td className="p-4 text-right text-primary font-mono font-bold">
                        {investmentData.collateral.valuation}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-neutral-100 border border-neutral-200 text-neutral-600">
                            {investmentData.collateral.certificate}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Tradeable Assets */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Icon name="sell" className="text-primary" />
                Tradeable Assets
              </h3>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-neutral-50 border-b border-neutral-100 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <div className="col-span-3">Commodity</div>
                <div className="col-span-2">Grade</div>
                <div className="col-span-2 text-right">Quantity</div>
                <div className="col-span-3 text-right">Valuation (IDR)</div>
                <div className="col-span-2 text-center">Status</div>
              </div>
              {investmentData.tradeableAssets.map((asset, index) => (
                <details
                  key={index}
                  className="group border-b border-neutral-100 last:border-0"
                >
                  <summary className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer hover:bg-neutral-50 transition-colors text-sm list-none">
                    <div className="col-span-3 font-bold text-neutral-900 flex items-center gap-2">
                      <Icon
                        name="expand_more"
                        className="text-neutral-400 text-[16px] group-open:rotate-180 transition-transform"
                      />
                      {asset.name}
                    </div>
                    <div className="col-span-2 text-neutral-600">
                      {asset.grade}
                    </div>
                    <div className="col-span-2 text-right font-mono font-medium">
                      {asset.quantity}
                    </div>
                    <div className="col-span-3 text-right font-mono font-bold text-primary">
                      {asset.valuation}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${asset.statusColor === "blue"
                          ? "bg-blue-50 text-blue-700 border-blue-100"
                          : asset.statusColor === "yellow"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                            : "bg-green-50 text-green-700 border-green-100"
                          }`}
                      >
                        {asset.status}
                      </span>
                    </div>
                  </summary>
                  <div className="bg-neutral-50/50 px-6 py-4 border-t border-neutral-100 text-xs">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-neutral-400 font-medium mb-1">
                          Certificate / Contract
                        </p>
                        <p className="font-semibold text-neutral-700">
                          {asset.details.certificate}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-400 font-medium mb-1">
                          Inbound Date
                        </p>
                        <p className="font-semibold text-neutral-700">
                          {asset.details.inboundDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-400 font-medium mb-1">
                          Expiry Date
                        </p>
                        <p className="font-semibold text-neutral-700">
                          {asset.details.expiryDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-400 font-medium mb-1">
                          Location
                        </p>
                        <p className="font-semibold text-neutral-700">
                          {asset.details.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Cash Pool */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Icon name="savings" className="text-primary" />
                Cash Pool
              </h3>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon
                      name="account_balance_wallet"
                      className="text-[16px]"
                    />
                    Cash Pool Cap
                  </p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {investmentData.cashPool.cap}{" "}
                    <span className="text-sm text-neutral-500 font-medium">
                      IDRP
                    </span>
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Max Limit (Collateral x 70% LTV)
                  </p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon name="monetization_on" className="text-[16px]" />
                    Current Cash Pool
                  </p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {investmentData.cashPool.current}{" "}
                    <span className="text-sm text-neutral-500 font-medium">
                      IDRP
                    </span>
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Total Investment Submitted
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-xs font-bold text-neutral-700 mb-3">
                  Capital Allocation
                </p>
                <div className="w-full h-3 flex rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[25%]"></div>
                  <div className="bg-primary h-full w-[34%]"></div>
                  <div className="bg-neutral-100 h-full w-[41%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-accent"></div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">
                      Available Liquidity
                    </span>
                  </div>
                  <p className="font-bold text-neutral-900">
                    {investmentData.cashPool.liquidity}{" "}
                    <span className="text-xs text-neutral-500 font-medium">
                      IDRP
                    </span>
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Idle capital (12% of Pool)
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">
                      Deployed Capital
                    </span>
                  </div>
                  <p className="font-bold text-neutral-900">
                    {investmentData.cashPool.deployed}{" "}
                    <span className="text-xs text-neutral-500 font-medium">
                      IDRP
                    </span>
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Allocated to assets (57% of Pool)
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-neutral-200"></div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">
                      Remaining Capacity
                    </span>
                  </div>
                  <p className="font-bold text-neutral-900">
                    {investmentData.cashPool.remaining}{" "}
                    <span className="text-xs text-neutral-500 font-medium">
                      IDRP
                    </span>
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Open for Investment
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Traceability & Audit Trail */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Icon name="timeline" className="text-primary" />
                Traceability & Audit Trail
              </h3>
            </div>
            <div className="relative pl-10 border-l-2 border-neutral-100 ml-6 space-y-10 py-2">
              {investmentData.traceability.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`absolute -left-[61px] top-0 size-10 rounded-full border-4 border-white flex items-center justify-center ${step.active
                      ? "bg-accent text-white"
                      : "bg-neutral-100 text-neutral-400"
                      }`}
                  >
                    <Icon
                      name={
                        index === 0
                          ? "agriculture"
                          : index === 1
                            ? "factory"
                            : "warehouse"
                      }
                      className="text-[20px]"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-neutral-900 text-base">
                        {step.title}
                      </h4>
                      <p className="text-sm text-neutral-500 mt-1 max-w-lg leading-relaxed">
                        {step.description}
                      </p>
                      {step.tag && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px] font-bold text-neutral-600">
                          <Icon
                            name="description"
                            className="text-[12px] mr-1 inline"
                          />
                          {step.tag}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold ${step.active
                          ? "bg-accent/10 text-primary"
                          : "bg-neutral-100 text-neutral-400"
                          }`}
                      >
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Bottom (Vault Manager & Docs) */}
        <div className="flex flex-col gap-8">
          {/* Vault Manager */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
              Vault Manager
            </p>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <Icon name="verified" className="text-primary text-[16px]" />
                  {investmentData.manager.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {investmentData.manager.person}
                </p>
                <p className="text-[10px] text-neutral-400">
                  {investmentData.manager.role}
                </p>
              </div>
              <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <Icon name="person" className="text-[24px]" />
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6 text-center border border-green-100">
              <p className="text-xs font-medium text-neutral-600 mb-1">
                CCR Ratio
              </p>
              <p className="text-3xl font-extrabold text-green-600">
                {investmentData.manager.ccrRatio}
              </p>
              <p className="text-[10px] font-bold text-green-700 mt-1">
                LOW RISK (&gt; 135%)
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">
                  Vaults Managed
                </span>
                <span className="font-bold text-neutral-900">
                  {investmentData.manager.vaultsManaged}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">
                  Active Loans
                </span>
                <span className="font-bold text-neutral-900">
                  {investmentData.manager.activeLoans}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">
                  Total Collateral
                </span>
                <span className="font-bold text-neutral-900">
                  {investmentData.manager.totalCollateral}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full text-xs h-9 border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            >
              View Full Trader Profile
            </Button>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2 mb-4">
              <Icon name="folder_open" className="text-primary" />
              Documents & Credentials
            </h3>
            <div className="flex flex-col gap-3">
              {investmentData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-10 rounded-lg ${doc.bg} ${doc.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon name={doc.icon} className="text-[20px]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {doc.title}
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {doc.subtitle}
                      </p>
                    </div>
                  </div>
                  <Icon
                    name="download"
                    className="text-neutral-400 text-[18px] group-hover:text-primary"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
