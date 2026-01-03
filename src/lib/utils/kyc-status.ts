import type { KYCStatus } from "@/types/user";
import type { BadgeVariant } from "@/components/ui/badge";

/**
 * Helper functions for KYC status mapping
 * Use this if you want to use Badge directly instead of StatusBadge component
 */

export function getKYCStatusVariant(status: KYCStatus): BadgeVariant {
  switch (status) {
    case "verified":
      return "success";
    case "pending":
      return "outline";
    case "rejected":
      return "danger";
    default:
      return "outline";
  }
}

export function getKYCStatusLabel(status: KYCStatus): string {
  switch (status) {
    case "verified":
      return "Verified";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

