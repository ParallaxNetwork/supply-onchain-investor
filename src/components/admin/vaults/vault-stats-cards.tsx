import type { VaultStats } from "@/types/vault";

type VaultStatsCardsProps = {
  stats: VaultStats;
};

export function VaultStatsCards({ stats }: VaultStatsCardsProps) {
  const statItems = [
    {
      label: "Total Active Vaults",
      value: stats.totalActiveVaults.toString(),
    },
    {
      label: "Overall Collateral Value",
      value: stats.overallCollateralValue,
    },
    {
      label: "Total Remaining Assets",
      value: stats.totalRemainingAssets,
    },
    {
      label: "Vaults Requiring Attention",
      value: stats.vaultsRequiringAttention.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 flex flex-col gap-1"
        >
          <p className="text-xs font-medium text-neutral-600">{item.label}</p>
          <p className="text-xl font-bold text-neutral-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

