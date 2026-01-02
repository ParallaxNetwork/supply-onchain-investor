import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const formatCurrency = (amount: bigint | number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const vaultRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const vaults = await ctx.db.vault.findMany({
      include: {
        trader: true,
        collateral: {
          include: {
            certificate: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return vaults.map((vault) => {
      const target = Number(vault.collateralValue) * (vault.fundTargetBps / 10000);
      const percentage = target > 0 ? (Number(vault.totalInvested) / target) * 100 : 0;

      // Get the first certificate issuer if available
      const certificate = vault.collateral[0]?.certificate;

      return {
        id: vault.id,
        title: vault.name,
        theme: "accent", // Default theme
        author: {
          name: vault.trader.name ?? "Unknown Trader",
          avatar: vault.trader.image ?? `https://ui-avatars.com/api/?name=${vault.trader.name}`,
        },
        status: vault.status === "OPEN" ? "OPEN" : "CLOSED",
        collateralValue: formatCurrency(vault.collateralValue),
        certificate: {
          issuer: certificate?.issuerName ?? "Unknown Issuer",
          verified: true, // Assuming seeded certs are verified
        },
        validity: vault.expiresAt ? formatDate(vault.expiresAt) : "N/A",
        profitShare: `${(vault.profitShareBps / 100).toFixed(0)}%`,
        funded: {
          current: formatCurrency(vault.totalInvested),
          target: formatCurrency(target),
          percentage: Math.round(percentage),
        },
      };
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const vault = await ctx.db.vault.findUnique({
        where: { id: input.id },
        include: {
          trader: {
            include: {
              traderVaults: {
                select: { id: true },
              },
            },
          },
          collateral: {
            include: {
              commodityLot: {
                include: {
                  traceEvents: {
                    orderBy: { occurredAt: "asc" },
                  },
                },
              },
              certificate: true,
            },
          },
          documents: {
            include: {
              document: true,
            },
          },
          investments: {
            where: {
              investorUserId: ctx.session?.user?.id,
            },
          },
        },
      });

      if (!vault) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Vault not found" });
      }

      const target = Number(vault.collateralValue) * (vault.fundTargetBps / 10000);
      const percentage = target > 0 ? (Number(vault.totalInvested) / target) * 100 : 0;
      const ltvRatio = (vault.fundTargetBps / 100).toFixed(0);

      // Collect tradeable assets (Commodity Lots)
      const tradeableAssets = vault.collateral
        .filter((c) => c.commodityLot)
        .map((c) => ({
          commodity: c.commodityLot!.commodityType,
          grade: c.commodityLot!.coffeeGrade ?? "N/A",
          quantity: `${(Number(c.commodityLot!.weightGrams) / 1000).toLocaleString()} kg`,
          location: c.commodityLot!.coffeeOrigin ?? "Unknown",
          valuation: formatCurrency(c.collateralValue),
        }));

      // Collect trace events from the first commodity lot (assuming primary collateral)
      // In a real app, you might merge events from all lots or show them separately
      const primaryLot = vault.collateral.find((c) => c.commodityLot)?.commodityLot;
      const traceEvents = primaryLot?.traceEvents.map((event) => {
        const metadata = event.metadata as Record<string, unknown> | null;
        return {
          title: typeof metadata?.description === "string"
            ? metadata.description
            : event.type,
          date: formatDate(event.occurredAt),
          description: event.location ?? "",
          tag: typeof metadata?.tag === "string"
            ? metadata.tag
            : undefined,
          active: typeof metadata?.active === "boolean"
            ? metadata.active
            : false,
        };
      }) ?? [];

      // Documents
      const docs = vault.documents.map((vd) => {
        const metadata = vd.document.metadata as Record<string, unknown> | null;
        return {
          title: typeof metadata?.title === "string"
            ? metadata.title
            : vd.document.kind.replace("_", " "),
          date: formatDate(vd.document.uploadedAt),
          type: "PDF", // Assuming all are PDFs for now
          url: vd.document.url,
        };
      });

      // My Investment
      const myInvestment = vault.investments[0];
      const investmentData = myInvestment ? {
        amount: formatCurrency(myInvestment.amount),
        progress: 0, // Need to calculate real progress if applicable
        unlockDate: vault.expiresAt ? formatDate(vault.expiresAt) : "N/A",
      } : undefined;

      return {
        id: vault.id,
        title: vault.name,
        description: vault.description ?? "",
        tags: ["Open for Investment", "High Grade", "Verified Warehouse"], // Hardcoded or derived
        stats: {
          profitShare: `${(vault.profitShareBps / 100).toFixed(0)}%`,
          target: formatCurrency(target),
          validity: vault.expiresAt ? formatDate(vault.expiresAt) : "N/A",
          lockPeriod: "12 Months", // Could be derived from created -> expires
        },
        funding: {
          totalRaised: formatCurrency(vault.totalInvested),
          target: formatCurrency(target),
          percentage: Math.round(percentage),
          ltvRatio: `${ltvRatio}%`,
          balance: "IDR 50.000.000", // Mock balance for user
        },
        manager: {
          name: vault.trader.name ?? "Unknown Trader",
          role: "Supply Chain Manager",
          image: vault.trader.image ?? `https://ui-avatars.com/api/?name=${vault.trader.name}`,
          ccrRatio: `${((vault.traderCcrBps ?? 0) / 100).toFixed(0)}%`,
          vaultsManaged: vault.trader.traderVaults.length,
        },
        assets: tradeableAssets,
        traceability: traceEvents,
        documents: docs,
        myInvestment: investmentData,
      };
    }),
});
