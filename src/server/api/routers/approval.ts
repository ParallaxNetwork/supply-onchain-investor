import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { SignatureRequestStatus, SignatureRequestType, type Prisma } from "../../../../generated/prisma/client";

export const approvalRouter = createTRPCRouter({
  getInbox: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(SignatureRequestType).optional(),
        vaultId: z.string().optional(),
        status: z.enum(["PENDING", "SIGNED", "REJECTED"]).optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { type, vaultId, status } = input ?? {};

      const where: Prisma.SignatureRequestWhereInput = {
        vault: {
          OR: [
            { traderUserId: userId },
            { investorSignerUserId: userId },
            { adminUserId: userId },
          ],
        },
      };

      if (type) {
        where.type = type;
      }

      if (vaultId && vaultId !== "All Vaults") {
        where.vaultId = vaultId;
      }

      if (status === "SIGNED") {
        where.signatures = {
          some: {
            signerUserId: userId,
          },
        };
      } else if (status === "REJECTED") {
        where.status = SignatureRequestStatus.REJECTED;
      } else {
        // Default: PENDING and Unsigned
        where.status = SignatureRequestStatus.PENDING;
        where.signatures = {
          none: {
            signerUserId: userId,
          },
        };
      }

      const requests = await ctx.db.signatureRequest.findMany({
        where,
        include: {
          vault: {
            select: {
              name: true,
              contractAddress: true,
            },
          },
          createdBy: {
            select: {
              name: true,
              id: true,
            },
          },
          signatures: true,
          fundRelease: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return requests.map((req) => ({
        id: req.id,
        type: req.type,
        status: req.status,
        initiatedBy: req.createdBy.name ?? "Unknown",
        initiatedByAddress: req.createdBy.id, // Using ID as address fallback
        vault: req.vault?.name ?? "Unknown Vault",
        created: req.createdAt.toLocaleDateString(),
        currentSignatures: req.signatures.length,
        requiredSignatures: req.requiredSignatures,
        progressColor: "info" as const, // Defaulting for now
        fundRelease: req.fundRelease,
        payload: req.payload,
        hasSigned: req.signatures.some((s) => s.signerUserId === userId),
      }));
    }),

  getInitiated: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const requests = await ctx.db.signatureRequest.findMany({
      where: {
        createdByUserId: userId,
      },
      include: {
        vault: {
          select: {
            name: true,
          },
        },
        signatures: true,
        fundRelease: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return requests.map((req) => ({
      id: req.id,
      type: req.type,
      status: req.status,
      targetVault: req.vault?.name ?? "Unknown Vault",
      amount: req.fundRelease ? `IDRP ${Number(req.fundRelease.amount).toLocaleString()}` : "N/A",
      lastUpdated: req.updatedAt.toLocaleDateString(),
      currentSignatures: req.signatures.length,
      requiredSignatures: req.requiredSignatures,
      progressColor: req.status === "PENDING" ? "info" : "success" as const,
      note: req.fundRelease?.description,
    }));
  }),
});
