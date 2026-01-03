import { Badge } from "@/components/ui/badge";
import type { VaultStatus } from "@/types/vault";

type VaultStatusBadgeProps = {
  status: VaultStatus;
  className?: string;
};

/**
 * Reusable badge component for Vault status
 */
export function VaultStatusBadge({ status, className }: VaultStatusBadgeProps) {
  const getVariant = (): "success" | "outline" => {
    switch (status) {
      case "active":
        return "success";
      case "closing":
      case "closed":
      case "expired":
      case "canceled":
        return "outline";
      default:
        return "outline";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "active":
        return "Active";
      case "closing":
        return "Closing";
      case "closed":
        return "Closed";
      case "expired":
        return "Expired";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  return (
    <Badge variant={getVariant()} className={className}>
      {getLabel()}
    </Badge>
  );
}

