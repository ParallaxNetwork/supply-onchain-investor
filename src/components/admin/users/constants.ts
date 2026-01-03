/**
 * Constants for User Table
 * Centralized configuration for maintainability
 */

export const TABLE_COLUMNS = [
  { key: "name", label: "User Name" },
  { key: "email", label: "Email Address" },
  { key: "kycStatus", label: "KYC Status" },
  { key: "joinedDate", label: "Joined Date" },
  { key: "totalInvested", label: "Total Invested" },
] as const;

export const COLUMN_COUNT = TABLE_COLUMNS.length;

