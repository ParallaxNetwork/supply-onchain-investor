"use client";

import { Icon } from "@/components/ui/icon";
import type { Vault } from "@/types/vault";

type CloseVaultModalProps = {
  vault: Vault;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CloseVaultModal({
  vault,
  isOpen,
  onClose,
  onConfirm,
}: CloseVaultModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-900">
            Close Vault Confirmation
          </h3>
          <button
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm text-neutral-600 mb-6">
          <p>
            Are you sure you want to initiate the closing process for{" "}
            <span className="font-semibold text-neutral-900">{vault.name}</span>?
          </p>

          <div className="flex items-start gap-3 rounded-lg bg-warning/10 p-4 text-warning ring-1 ring-inset ring-warning/20">
            <Icon
              name="warning"
              className="text-xl shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            />
            <div>
              <p className="font-semibold">
                Warning: Vault still contains remaining assets.
              </p>
              <p>Currently holding: {vault.remainingAssets}.</p>
            </div>
          </div>

          <p>Initiating close will trigger a multisig request to all signers.</p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 transition-colors text-sm font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors text-sm font-bold shadow-sm"
            onClick={onConfirm}
          >
            Initiate Multisig Sign
          </button>
        </div>
      </div>
    </div>
  );
}

