import { PrismaClient, UserRole, VaultStatus, CommodityType, SignatureRequestType, DocumentKind, CertificateType, TraceEventType } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Users
  const adminEmail = "admin@example.com";
  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin User",
      role: UserRole.ADMIN,
      image: "https://ui-avatars.com/api/?name=Admin+User&background=random",
    },
  });
  console.log("Created Admin:", admin.name);

  const traderEmail = "trader@example.com";
  const trader = await db.user.upsert({
    where: { email: traderEmail },
    update: {},
    create: {
      email: traderEmail,
      name: "Budi Santoso", // Updated to match mock
      role: UserRole.TRADER,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVkAGQU_KZ_f7AbDBXZDwX81Tam-MB18qjkKcbW4CqWw6g2f6aWruxzSxAFdBzlZs4fX5cAa8xtipo467NCsrlF6zEwgke9cEaaRZWRO2lJGn2BORDpBbo_RDRL6y6QIk6jbe4vBLtq9NJ6OLjsapqUcY8gnjQg6gBaLEFlM9onv8zCAFQ1KyW80n9Cp4oL4Dt8F6h0gAyqRHrk8BUX6O3mb4sEEnZZZjA3GcUN7OXw9G7YiQWuBn1rFtBYxUj1h2WEZV9esSxZ-_Y",
    },
  });
  console.log("Created Trader:", trader.name);

  const investorEmail = "investor@example.com";
  const investor = await db.user.upsert({
    where: { email: investorEmail },
    update: {},
    create: {
      email: investorEmail,
      name: "Bob Investor",
      role: UserRole.INVESTOR,
      image: "https://ui-avatars.com/api/?name=Bob+Investor&background=random",
    },
  });
  console.log("Created Investor:", investor.name);

  // 2. Create Warehouse
  const warehouse = await db.warehouse.create({
    data: {
      name: "Gudangin WMS",
      isVerified: true,
      wmsSystem: "Gudangin-v1",
    },
  });
  console.log("Created Warehouse:", warehouse.name);

  // 3. Create Commodity Lots (Matching Tradeable Assets)
  const lotA = await db.commodityLot.create({
    data: {
      commodityType: CommodityType.COFFEE,
      coffeeType: "Arabica",
      coffeeGrade: "Grade 1",
      coffeeOrigin: "Aceh Gayo",
      weightGrams: 5000000n, // 5,000 kg
      tokenId: 1n,
      ownerUserId: trader.id,
      warehouseId: warehouse.id,
      traceEvents: {
        create: [
          {
            type: TraceEventType.CREATED,
            occurredAt: new Date("2024-09-12"),
            location: "Bener Meriah",
            metadata: { description: "Harvest & Aggregation", tag: "Cooperative Alpha" }
          },
          {
            type: TraceEventType.INSPECTED,
            occurredAt: new Date("2024-09-20"),
            location: "Processing Center",
            metadata: { description: "Processing & Grading", tag: "QC Report #9921" }
          },
          {
            type: TraceEventType.STORED,
            occurredAt: new Date(), // Current Stage
            location: "Gudangin WMS",
            metadata: { description: "Warehousing (Gudangin)", active: true }
          }
        ]
      }
    },
  });
  console.log("Created Lot A with Trace Events");

  const lotB = await db.commodityLot.create({
    data: {
      commodityType: CommodityType.COFFEE,
      coffeeType: "Arabica",
      coffeeGrade: "Grade 1",
      coffeeOrigin: "Aceh Gayo",
      weightGrams: 8000000n, // 8,000 kg
      tokenId: 2n,
      ownerUserId: trader.id,
      warehouseId: warehouse.id,
    },
  });

  const lotX = await db.commodityLot.create({
    data: {
      commodityType: CommodityType.COFFEE,
      coffeeType: "Robusta",
      coffeeGrade: "Grade 2",
      coffeeOrigin: "Lampung",
      weightGrams: 7000000n, // 7,000 kg
      tokenId: 3n,
      ownerUserId: trader.id,
      warehouseId: warehouse.id,
    },
  });

  // 4. Create Certificates
  const srgCert = await db.collateralCertificate.create({
    data: {
      type: CertificateType.SRG,
      certificateNumber: "SRG #10293",
      issuerName: "Gudangin SRG",
      issuedAt: new Date("2024-10-15"),
      expiresAt: new Date("2025-10-15"),
      commodityLotId: lotA.id,
    }
  });

  const cmaCert = await db.collateralCertificate.create({
    data: {
      type: CertificateType.CMA,
      certificateNumber: "CMA #992",
      issuerName: "CMA Logistik",
      commodityLotId: lotX.id,
    }
  });

  // 5. Create Documents
  const srgDoc = await db.document.create({
    data: {
      kind: DocumentKind.SRG_CERTIFICATE,
      storageKey: "mock/srg_cert.pdf",
      url: "https://example.com/srg.pdf",
      metadata: { title: "SRG Certificate #10293", subtitle: "Verified Warehouse Receipt" }
    }
  });

  const insuranceDoc = await db.document.create({
    data: {
      kind: DocumentKind.OTHER, // Assuming Insurance fits here
      storageKey: "mock/insurance.pdf",
      url: "https://example.com/insurance.pdf",
      metadata: { title: "Insurance Policy (All-Risk)", subtitle: "Coverage for 1.5B IDRP" }
    }
  });

  const cmaDoc = await db.document.create({
    data: {
      kind: DocumentKind.CMA_CONTRACT,
      storageKey: "mock/cma.pdf",
      url: "https://example.com/cma.pdf",
      metadata: { title: "CMA Agreement", subtitle: "Collateral Management Terms" }
    }
  });

  // 6. Create Vault (Linking it all)
  const vault = await db.vault.create({
    data: {
      name: "Gayo Coffee Harvest 2024", // Match mock title
      description: "Invest in high-grade Arabica coffee sourced directly from the Gayo highlands. Backed by physical inventory managed under the SRG scheme.",
      traderUserId: trader.id,
      adminUserId: admin.id,
      investorSignerUserId: investor.id,
      status: VaultStatus.OPEN, // Match mock status
      collateralValue: 850000000n, // 850M IDR (Valuation)
      fundTargetBps: 7000, // 70% (LTV)
      profitShareBps: 3000, // 30% (Trader Share, so Investor gets 70%?) Mock says "70:30 Investor:Trader", so profitShareBps usually tracks one side. Assuming this is Trader's share.
      traderCcrBps: 1000,
      totalInvested: 350000000n, // 350M Raised
      totalSpent: 200000000n, // 200M Deployed
      contractAddress: "0xMockContractAddress",

      // Link Collateral (Lot A)
      collateral: {
        create: [
          {
            commodityLotId: lotA.id,
            certificateId: srgCert.id,
            collateralValue: 212500000n, // Valuation of Lot A
          },
          // In a real scenario, you'd add Lot B and X here if they are collateral for *this* vault
        ]
      },

      // Link Documents
      documents: {
        create: [
          { documentId: srgDoc.id },
          { documentId: insuranceDoc.id },
          { documentId: cmaDoc.id } // Linking broadly to the vault for display
        ]
      }
    },
  });
  console.log("Created Vault:", vault.name);

  // 7. Create Investment
  const investment = await db.vaultInvestment.create({
    data: {
      vaultId: vault.id,
      investorUserId: investor.id,
      amount: 120000000n, // 120M IDR (Active Investment)
      status: "CONFIRMED",
    },
  });
  console.log("Created Investment for:", investor.name);

  // 8. Create Fund Release Request
  const signatureRequest = await db.signatureRequest.create({
    data: {
      type: SignatureRequestType.FUND_RELEASE,
      createdByUserId: trader.id,
      vaultId: vault.id,
      requiredSignatures: 2,
      fundRelease: {
        create: {
          vendorAddress: "0xVendorAddress123",
          amount: 50000000n,
          description: "Payment for fertilizer shipment",
        },
      },
    },
  });
  console.log("Created Fund Release Request:", signatureRequest.id);

  console.log("✅ Seed completed!");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
