import type { Vault, VaultStats } from "@/types/vault";
import { MOCK_VAULTS, MOCK_VAULT_STATS } from "@/data/mock-vaults";

/**
 * Data layer for vault management
 * This can be easily replaced with real API calls in the future
 */

export async function getVaultStats(): Promise<VaultStats> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/vaults/stats');
  // return response.json();
  
  // For now, return mock data
  return Promise.resolve(MOCK_VAULT_STATS);
}

export async function getVaults(): Promise<Vault[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/vaults');
  // return response.json();
  
  // For now, return mock data
  return Promise.resolve(MOCK_VAULTS);
}

export async function searchVaults(query: string): Promise<Vault[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/vaults/search?q=${query}`);
  // return response.json();
  
  // For now, filter mock data
  const lowerQuery = query.toLowerCase();
  return Promise.resolve(
    MOCK_VAULTS.filter(
      (vault) =>
        vault.name.toLowerCase().includes(lowerQuery) ||
        vault.owner.name.toLowerCase().includes(lowerQuery),
    ),
  );
}

