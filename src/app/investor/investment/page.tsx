import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { getInvestments } from "@/data/investments";

export default async function InvestmentPage() {
  const investments = await getInvestments();

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-8 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-primary">
              Marketplace
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Active Vaults
          </h1>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary">
            <Icon name="menu" />
            Menu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {investments.map((investment) => (
          <article
            key={investment.id}
            className={`group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 relative border-t-4 ${investment.theme === "accent"
              ? "border-t-accent"
              : "border-t-blue-500"
              } ${investment.status === "CLOSED" ? "opacity-80 hover:opacity-100" : ""}`}
          >
            {/* Header */}
            <div className="px-6 pt-6 flex items-start justify-between">
              <div className="flex flex-col gap-2 flex-1 min-w-0 pr-4">
                <h3 className="text-xl font-bold tracking-tight text-primary truncate">
                  {investment.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full bg-neutral-200 bg-cover border border-white"
                    style={{ backgroundImage: `url("${investment.author.avatar}")` }}
                  />
                  <span className="text-neutral-500 text-xs font-medium">
                    {investment.author.name}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${investment.status === "OPEN"
                    ? "bg-neutral-50 border-neutral-200 text-primary"
                    : "bg-neutral-100 border-neutral-200 text-neutral-500"
                    }`}
                >
                  {investment.status === "OPEN" ? (
                    <span className="size-2 rounded-full bg-accent animate-pulse" />
                  ) : (
                    <span className="size-2 rounded-full bg-neutral-400" />
                  )}
                  {investment.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5 flex-1">
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div className="flex flex-col">
                  <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Collateral Value
                  </span>
                  <span className="text-primary font-bold text-base">
                    {investment.collateralValue}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Certificate
                  </span>
                  <div className="flex items-center gap-1">
                    {investment.certificate.verified && (
                      <Icon
                        name="verified"
                        className={`!text-base ${investment.certificate.issuer.includes("Gudangin")
                          ? investment.status === "CLOSED" ? "text-neutral-400" : "text-accent"
                          : "text-blue-500"
                          }`}
                      />
                    )}
                    <span className={`font-bold text-base ${investment.status === "CLOSED" ? "text-neutral-600" : "text-primary"}`}>
                      {investment.certificate.issuer}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Validity
                  </span>
                  <span className={`font-bold text-base ${investment.validity === "Expired" ? "text-neutral-500" : "text-primary"}`}>
                    {investment.validity}
                  </span>
                </div>
                <div className="flex flex-col relative group/tooltip">
                  <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Profit Share
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-extrabold text-lg ${investment.status === "CLOSED" ? "text-neutral-600" : "text-accent"}`}>
                      {investment.profitShare}
                    </span>
                    <Icon
                      name="help"
                      className="text-neutral-300 !text-sm cursor-help hover:text-primary transition-colors"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-primary text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                    Investor : Trader Ratio
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 mt-auto">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-500 font-medium">
                        Funded Amount
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {investment.funded.current}{" "}
                        <span className="text-neutral-400 font-normal">
                          / {investment.funded.target}
                        </span>
                      </span>
                    </div>
                    <span className={`font-bold text-sm ${investment.status === "CLOSED" ? "text-neutral-500" : "text-accent"}`}>
                      {investment.funded.percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full relative overflow-hidden ${investment.status === "CLOSED" ? "bg-neutral-400" : "bg-primary"}`}
                      style={{ width: `${investment.funded.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/10" />
                    </div>
                  </div>
                </div>
                {investment.status === "CLOSED" ? (
                  <Link
                    href={`/investor/investment/${investment.id}/detail`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer h-10 px-5 text-sm border border-neutral-200 bg-white hover:bg-neutral-50 focus-visible:ring-primary/30 w-full text-primary"
                  >
                    View Details
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/investor/investment/${investment.id}/detail`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer h-10 px-5 text-sm border border-neutral-200 bg-white hover:bg-neutral-50 focus-visible:ring-primary/30 text-primary"
                    >
                      View Details
                    </Link>
                    <Button className="bg-primary text-white hover:!bg-accent hover:!text-primary shadow-md shadow-primary/10 border-0">
                      Invest Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
