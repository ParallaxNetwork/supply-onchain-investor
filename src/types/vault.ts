export type VaultStatus = "active" | "closing" | "closed" | "expired" | "canceled";

export type Vault = {
  id: string;
  name: string;
  status: VaultStatus;
  owner: {
    name: string;
    id: string;
  };
  totalCollateral: string; // Formatted currency
  remainingAssets: string; // e.g., "50 Tons"
};

export type VaultStats = {
  totalActiveVaults: number;
  overallCollateralValue: string; // Formatted currency
  totalRemainingAssets: string; // e.g., "1,200 Tons"
  vaultsRequiringAttention: number;
};

