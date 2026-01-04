import { PrismaClient, UserRole, VaultStatus, CommodityType, SignatureRequestType, SignatureRequestStatus, DocumentKind, CertificateType, TraceEventType, WalletCurrency, WalletTransactionType, WalletTransactionStatus, KycStatus, MarketplaceListingStatus, MarketplaceInvestmentStatus } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Admin User with Password
  const adminEmail = "admin@aplx.com";
  const adminPassword =
    process.env.ADMIN_DEFAULT_PASSWORD ?? "Admin1234"; // Use env var if available
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin User",
      role: UserRole.ADMIN,
      password: hashedPassword, // Update password on seed
    },
    create: {
      email: adminEmail,
      name: "Admin User",
      role: UserRole.ADMIN,
      password: hashedPassword, // Hashed password for admin login
      image: "https://ui-avatars.com/api/?name=Admin+User&background=random",
      profile: {
        create: {
          fullName: "Admin User",
          country: "Indonesia",
        }
      },
      wallet: {
        create: {
          currency: WalletCurrency.IDRP,
          balance: 0n,
        }
      }
    },
  });
  console.log("Created Admin:", admin.name);
  if (process.env.NODE_ENV === "development") {
    console.log("Admin credentials:", { email: adminEmail, password: adminPassword });
  } else {
    console.log("Admin user created with email:", adminEmail);
  }

  const traderEmail = "trader@example.com";
  const trader = await db.user.upsert({
    where: { email: traderEmail },
    update: {
      name: "Budi Santoso",
      role: UserRole.TRADER,
    },
    create: {
      email: traderEmail,
      name: "Budi Santoso", // Updated to match mock
      role: UserRole.TRADER,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVkAGQU_KZ_f7AbDBXZDwX81Tam-MB18qjkKcbW4CqWw6g2f6aWruxzSxAFdBzlZs4fX5cAa8xtipo467NCsrlF6zEwgke9cEaaRZWRO2lJGn2BORDpBbo_RDRL6y6QIk6jbe4vBLtq9NJ6OLjsapqUcY8gnjQg6gBaLEFlM9onv8zCAFQ1KyW80n9Cp4oL4Dt8F6h0gAyqRHrk8BUX6O3mb4sEEnZZZjA3GcUN7OXw9G7YiQWuBn1rFtBYxUj1h2WEZV9esSxZ-_Y",
      profile: {
        create: {
          fullName: "Budi Santoso",
          phoneNumber: "+6281234567890",
          city: "Jakarta",
          country: "Indonesia",
        }
      },
      wallet: {
        create: {
          currency: WalletCurrency.IDRP,
          balance: 50000000n, // 50M IDRP
        }
      }
    },
  });
  console.log("Created Trader:", trader.name);

  const investorEmail = "investor@example.com";
  const investor = await db.user.upsert({
    where: { email: investorEmail },
    update: {
      name: "Bob Investor",
      role: UserRole.INVESTOR,
    },
    create: {
      email: investorEmail,
      name: "Bob Investor",
      role: UserRole.INVESTOR,
      image: "https://ui-avatars.com/api/?name=Bob+Investor&background=random",
      profile: {
        create: {
          fullName: "Bob Investor",
          city: "Singapore",
          country: "Singapore",
        }
      },
      wallet: {
        create: {
          currency: WalletCurrency.IDRP,
          balance: 1000000000n, // 1B IDRP
          transactions: {
            create: [
              {
                type: WalletTransactionType.DEPOSIT,
                status: WalletTransactionStatus.POSTED,
                amount: 1000000000n,
                referenceId: "DEP-001",
                metadata: { bank: "BCA", account: "****1234" }
              }
            ]
          }
        }
      }
    },
  });
  console.log("Created Investor:", investor.name);

  const mockInvestorEmail = "mock-investor@example.com";
  const mockInvestor = await db.user.upsert({
    where: { email: mockInvestorEmail },
    update: {
      name: "Mock INVESTOR",
      role: UserRole.INVESTOR,
    },
    create: {
      email: mockInvestorEmail,
      name: "Mock INVESTOR",
      role: UserRole.INVESTOR,
      image: "https://ui-avatars.com/api/?name=Mock+Investor&background=random",
      profile: {
        create: {
          fullName: "Mock Investor",
          city: "Jakarta",
          country: "Indonesia",
        }
      },
      wallet: {
        create: {
          currency: WalletCurrency.IDRP,
          balance: 1000000000n,
        }
      }
    },
  });
  console.log("Created Mock Investor:", mockInvestor.name);

  // 1b. Create KYC Applications
  await db.kycApplication.create({
    data: {
      userId: trader.id,
      status: KycStatus.APPROVED,
      reviewedByUserId: admin.id,
      reviewedAt: new Date(),
    }
  });

  await db.kycApplication.create({
    data: {
      userId: investor.id,
      status: KycStatus.PENDING,
      submittedAt: new Date(),
    }
  });
  console.log("Created KYC Applications");

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

  // Create Marketplace Listing for Lot B
  await db.marketplaceListing.create({
    data: {
      commodityLotId: lotB.id,
      ownerUserId: trader.id,
      warehouseId: warehouse.id,
      status: MarketplaceListingStatus.ACTIVE,
      collateralValue: 1000000000n, // 1B IDRP
      profitShareBps: 2000, // 20%
      investments: {
        create: [
          {
            investorUserId: investor.id,
            amount: 50000000n, // 50M IDRP
            status: MarketplaceInvestmentStatus.CONFIRMED,
          }
        ]
      }
    }
  });
  console.log("Created Marketplace Listing for Lot B");

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

  // Add Signature
  await db.signature.create({
    data: {
      requestId: signatureRequest.id,
      signerUserId: trader.id,
      signerRole: UserRole.TRADER,
      signature: "0xMockSignatureByTrader",
      signedAt: new Date(),
    }
  });
  console.log("Added Signature to Request");

  // 8b. Create Add Asset Request
  const addAssetRequest = await db.signatureRequest.create({
    data: {
      type: SignatureRequestType.ADD_ASSET,
      createdByUserId: trader.id,
      vaultId: vault.id,
      requiredSignatures: 2,
      payload: {
        asset: "Cocoa Beans",
        reason: "Market diversification",
        description: "Adding Cocoa Beans as a new tradeable asset class."
      },
    },
  });
  // Sign it by Trader
  await db.signature.create({
    data: {
      requestId: addAssetRequest.id,
      signerUserId: trader.id,
      signerRole: UserRole.TRADER,
      signature: "0xMockSignatureByTraderAddAsset",
      signedAt: new Date(),
    }
  });
  console.log("Created Add Asset Request");

  // 8c. Create Close Vault Request (Fully Signed / Executed for History)
  const closeVaultRequest = await db.signatureRequest.create({
    data: {
      type: SignatureRequestType.CLOSE_VAULT,
      createdByUserId: admin.id,
      vaultId: vault.id,
      requiredSignatures: 2,
      status: "APPROVED",
      payload: {
        reason: "End of season",
        distributionPlan: "Pro-rata"
      },
    },
  });
  // Sign by Admin
  await db.signature.create({
    data: {
      requestId: closeVaultRequest.id,
      signerUserId: admin.id,
      signerRole: UserRole.ADMIN,
      signature: "0xMockSignatureByAdminClose",
      signedAt: new Date(),
    }
  });
  // Sign by Investor
  await db.signature.create({
    data: {
      requestId: closeVaultRequest.id,
      signerUserId: investor.id,
      signerRole: UserRole.INVESTOR,
      signature: "0xMockSignatureByInvestorClose",
      signedAt: new Date(),
    }
  });
  console.log("Created Close Vault Request (Approved)");

  // --- MOCK INVESTOR SPECIFIC DATA ---
  const mockVault = await db.vault.create({
    data: {
      name: "Robusta Coffee Harvest 2024",
      description: "High-yield Robusta coffee from Lampung.",
      traderUserId: trader.id,
      adminUserId: admin.id,
      investorSignerUserId: mockInvestor.id, // Linked to Mock Investor
      status: VaultStatus.OPEN,
      collateralValue: 500000000n,
      fundTargetBps: 6000,
      profitShareBps: 4000,
      traderCcrBps: 1000,
      totalInvested: 100000000n,
      totalSpent: 50000000n,
      contractAddress: "0xMockContractAddress2",
    },
  });

  // Mock Request 1: Fund Release
  const mockReq1 = await db.signatureRequest.create({
    data: {
      type: SignatureRequestType.FUND_RELEASE,
      createdByUserId: trader.id,
      vaultId: mockVault.id,
      requiredSignatures: 2,
      fundRelease: {
        create: {
          vendorAddress: "0xVendorAddressMock",
          amount: 25000000n,
          description: "Logistics Payment",
        },
      },
    },
  });
  // Sign by Trader
  await db.signature.create({
    data: {
      requestId: mockReq1.id,
      signerUserId: trader.id,
      signerRole: UserRole.TRADER,
      signature: "0xMockSig",
      signedAt: new Date(),
    }
  });

  // Mock Request 2: Add Asset
  const mockReq2 = await db.signatureRequest.create({
    data: {
      type: SignatureRequestType.ADD_ASSET,
      createdByUserId: trader.id,
      vaultId: mockVault.id,
      requiredSignatures: 2,
      payload: {
        asset: "Spices",
        reason: "Diversification",
        description: "Adding Cloves and Nutmeg."
      },
    },
  });
  // Sign by Trader
  await db.signature.create({
    data: {
      requestId: mockReq2.id,
      signerUserId: trader.id,
      signerRole: UserRole.TRADER,
      signature: "0xMockSig2",
      signedAt: new Date(),
    }
  });
  console.log("Created Mock Investor Data");

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
