import { Icon } from "@/components/ui/icon";
import { VaultStatsCards } from "@/components/admin/vaults/vault-stats-cards";
import { VaultGrid } from "@/components/admin/vaults/vault-grid";
import { getVaultStats, getVaults } from "@/lib/api/vaults";

export default async function AdminVaultsPage() {
  // Server Component: Fetch data on the server
  const [stats, vaults] = await Promise.all([
    getVaultStats(),
    getVaults(),
  ]);

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-8 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Vault Management</h1>
        <div className="lg:hidden flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary">
            <Icon name="menu" />
            Menu
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-white border border-neutral-200 rounded-2xl p-6 shadow-soft flex-1">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Icon name="savings" className="text-primary text-[20px]" />
            System Vaults Monitoring
          </h2>
        </div>
        <VaultStatsCards stats={stats} />
        <VaultGrid vaults={vaults} />
      </div>
    </main>
  );
}

