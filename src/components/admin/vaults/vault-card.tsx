"use client";

import { useState } from "react";
import type { Vault } from "@/types/vault";
import { VaultStatusBadge } from "./vault-status-badge";
import { CloseVaultModal } from "./close-vault-modal";

type VaultCardProps = {
  vault: Vault;
};

export function VaultCard({ vault }: VaultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // TODO: Implement actual multisig initiation logic
    console.log("Initiating multisig for vault:", vault.id);
    setIsModalOpen(false);
    // Here you would typically call an API to initiate the multisig process
  };

  return (
    <>
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900">{vault.name}</h3>
          <VaultStatusBadge status={vault.status} />
        </div>
        <div className="flex flex-col gap-2 text-sm text-neutral-600">
          <div className="flex justify-between items-center">
            <span className="font-medium">Owner:</span>
            <span className="text-neutral-900">{vault.owner.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Collateral:</span>
            <span className="text-neutral-900">{vault.totalCollateral}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Remaining Assets:</span>
            <span className="text-neutral-900">{vault.remainingAssets}</span>
          </div>
        </div>
        <button
          onClick={handleCloseClick}
          className="w-full border border-danger text-danger hover:bg-danger/5 transition-colors text-sm font-bold px-5 py-2.5 rounded-lg"
        >
          Manage / Close
        </button>
      </div>

      <CloseVaultModal
        vault={vault}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

