import React from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/trpc/server";
import { InvestmentSidebar } from "@/components/investor/investment-sidebar";

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investmentData = await api.vault.getById({ id });

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
                <Icon name="verified" className="text-primary text-[18px]" />
                {tag}
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
                Investor Share
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
                IDR
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
                Expires
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
                Minimum
              </p>
            </div>
          </div>

          {/* Active Investment Card */}
          {investmentData.myInvestment && (
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
                      {investmentData.myInvestment.amount}
                    </span>
                    <span className="text-base text-neutral-500 font-medium">
                      IDR
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
                    N/A
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${investmentData.myInvestment.progress}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500 mt-1">
                  <span>Started: N/A</span>
                  <span>
                    Unlock Date: {investmentData.myInvestment.unlockDate}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar/Funding) */}
        <div className="lg:col-span-5">
          <InvestmentSidebar funding={investmentData.funding} />
        </div>
      </div>

      <hr className="border-neutral-100" />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Collateral Asset */}
          {/* ... (Collateral Table is complex, I will simplify or map correctly) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Icon name="inventory_2" className="text-primary" />
                Collateral Assets
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm">
                    {investmentData.assets.map((asset, i) => (
                      <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-neutral-900">
                            {asset.commodity}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-600">
                          {asset.grade}
                        </td>
                        <td className="p-4 text-right text-neutral-900 font-mono font-medium">
                          {asset.quantity}
                        </td>
                        <td className="p-4 text-right text-primary font-mono font-bold">
                          {asset.valuation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      name="verified"
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

        {/* Sidebar Info (Manager, Docs, etc.) */}
        <div className="flex flex-col gap-8">
          {/* Manager Profile */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
              Vault Manager
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-full bg-neutral-100 flex items-center justify-center text-primary font-bold text-lg overflow-hidden relative">
                {investmentData.manager.image ? (
                  <Image
                    src={investmentData.manager.image}
                    alt={investmentData.manager.name}
                    fill
                    className="object-cover"
                  />
                ) : "NC"}
              </div>
              <div>
                <h5 className="font-bold text-neutral-900">
                  {investmentData.manager.name}
                </h5>
                <p className="text-xs text-neutral-500 font-medium">
                  {investmentData.manager.role}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">
                  CCR Ratio
                </p>
                <p className="text-lg font-bold text-primary">
                  {investmentData.manager.ccrRatio}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">
                  Vaults Managed
                </p>
                <p className="text-lg font-bold text-neutral-900">
                  {investmentData.manager.vaultsManaged}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-6 border-neutral-200 hover:bg-neutral-50"
            >
              View Full Profile
            </Button>
          </div>

          {/* Documents */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
              Documents & Contracts
            </h4>
            <div className="flex flex-col gap-3">
              {investmentData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer group"
                >
                  <div
                    className="size-10 rounded-lg flex items-center justify-center bg-red-50"
                  >
                    <Icon name="description" className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 truncate group-hover:text-primary transition-colors">
                      {doc.title}
                    </h5>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {doc.date}
                    </p>
                  </div>
                  <Icon
                    name="download"
                    className="text-neutral-300 group-hover:text-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs font-bold">
              View All Documents
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
