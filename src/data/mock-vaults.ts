import type { Vault, VaultStats } from "@/types/vault";

export const MOCK_VAULT_STATS: VaultStats = {
  totalActiveVaults: 12,
  overallCollateralValue: "IDR 250,000,000",
  totalRemainingAssets: "1,200 Tons",
  vaultsRequiringAttention: 3,
};

export const MOCK_VAULTS: Vault[] = [
  {
    id: "1",
    name: "Sumatra Coffee V2",
    status: "active",
    owner: {
      name: "John Doe",
      id: "user-1",
    },
    totalCollateral: "IDR 150,000,000",
    remainingAssets: "50 Tons",
  },
  {
    id: "2",
    name: "Borneo Palm Oil",
    status: "closing",
    owner: {
      name: "Jane Smith",
      id: "user-2",
    },
    totalCollateral: "IDR 80,000,000",
    remainingAssets: "200 Tons",
  },
  {
    id: "3",
    name: "Robusta Beans 2024",
    status: "active",
    owner: {
      name: "Alice Johnson",
      id: "user-3",
    },
    totalCollateral: "IDR 90,000,000",
    remainingAssets: "120 Tons",
  },
  {
    id: "4",
    name: "Java Tea Leaves",
    status: "active",
    owner: {
      name: "Charlie Brown",
      id: "user-5",
    },
    totalCollateral: "IDR 60,000,000",
    remainingAssets: "80 Tons",
  },
  {
    id: "5",
    name: "Flores Cocoa Beans",
    status: "closing",
    owner: {
      name: "Diana Prince",
      id: "user-6",
    },
    totalCollateral: "IDR 75,000,000",
    remainingAssets: "100 Tons",
  },
  {
    id: "6",
    name: "Papuan Vanilla Pods",
    status: "active",
    owner: {
      name: "Bob Williams",
      id: "user-4",
    },
    totalCollateral: "IDR 40,000,000",
    remainingAssets: "30 Tons",
  },
];

