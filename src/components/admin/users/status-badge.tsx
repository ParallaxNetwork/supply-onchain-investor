import { Badge } from "@/components/ui/badge";
import type { KYCStatus } from "@/types/user";
import { getKYCStatusVariant, getKYCStatusLabel } from "@/lib/utils/kyc-status";

type StatusBadgeProps = {
  status: KYCStatus;
  className?: string;
};

/**
 * Reusable badge component for KYC status
 * Uses helper functions for maintainability
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={getKYCStatusVariant(status)} className={className}>
      {getKYCStatusLabel(status)}
    </Badge>
  );
}

