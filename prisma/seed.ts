import { PrismaClient, UserRole, VaultStatus, CommodityType } from "../generated/prisma/client";
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
      name: "Alice Trader",
      role: UserRole.TRADER,
      image: "https://ui-avatars.com/api/?name=Alice+Trader&background=random",
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
      name: "Central Coffee Storage",
      isVerified: true,
      wmsSystem: "WMS-2024-X",
    },
  });
  console.log("Created Warehouse:", warehouse.name);

  // 3. Create Commodity Lot
  const commodityLot = await db.commodityLot.create({
    data: {
      commodityType: CommodityType.COFFEE,
      coffeeType: "Arabica",
      coffeeGrade: "Grade 1",
      coffeeOrigin: "Aceh Gayo",
      weightGrams: 1000000n, // 1000 kg
      ownerUserId: trader.id,
      warehouseId: warehouse.id,
    },
  });
  console.log("Created Commodity Lot:", commodityLot.id);

  // 4. Create Vault
  const vault = await db.vault.create({
    data: {
      name: "Aceh Gayo Premium Harvest 2024",
      description: "High-altitude Arabica coffee from the Gayo highlands. Fully washed and sun-dried.",
      traderUserId: trader.id,
      status: VaultStatus.ACTIVE,
      collateralValue: 150000000n, // 150M IDR
      fundTargetBps: 8000, // 80%
      profitShareBps: 2000, // 20%
      traderCcrBps: 1000, // 10%
      collateral: {
        create: {
          commodityLotId: commodityLot.id,
          collateralValue: 150000000n,
        },
      },
    },
  });
  console.log("Created Vault:", vault.name);

  // 5. Create Investment
  const investment = await db.vaultInvestment.create({
    data: {
      vaultId: vault.id,
      investorUserId: investor.id,
      amount: 10000000n, // 10M IDR
      status: "CONFIRMED",
    },
  });
  console.log("Created Investment for:", investor.name);

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
