export type KYCStatus = "verified" | "pending" | "rejected";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  kycStatus: KYCStatus;
  joinedDate: string;
  totalInvested: string;
};

