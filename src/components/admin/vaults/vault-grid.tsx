"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { VaultCard } from "./vault-card";
import type { Vault } from "@/types/vault";

type VaultGridProps = {
  vaults: Vault[];
  initialSearchQuery?: string;
};

function filterVaults(vaults: Vault[], query: string): Vault[] {
  if (!query.trim()) return vaults;
  const lowerQuery = query.toLowerCase();
  return vaults.filter(
    (vault) =>
      vault.name.toLowerCase().includes(lowerQuery) ||
      vault.owner.name.toLowerCase().includes(lowerQuery),
  );
}

export function VaultGrid({ vaults, initialSearchQuery = "" }: VaultGridProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const filteredVaults = filterVaults(vaults, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full max-w-sm ml-auto">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
        />
        <input
          className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary placeholder:text-neutral-400"
          placeholder="Search vaults..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredVaults.length === 0 ? (
        <div className="text-center py-12 text-sm text-neutral-500">
          No vaults found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </div>
      )}
    </div>
  );
}

