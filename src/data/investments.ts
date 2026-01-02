
export interface Investment {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  status: "OPEN" | "CLOSED";
  collateralValue: string;
  certificate: {
    issuer: string;
    verified: boolean;
  };
  validity: string;
  profitShare: string;
  funded: {
    current: string;
    target: string;
    percentage: number;
  };
  theme: "accent" | "blue";
}

export const INVESTMENTS: Investment[] = [
  {
    id: "1",
    title: "Robusta Harvest Batch #402",
    author: {
      name: "Budi Santoso",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVkAGQU_KZ_f7AbDBXZDwX81Tam-MB18qjkKcbW4CqWw6g2f6aWruxzSxAFdBzlZs4fX5cAa8xtipo467NCsrlF6zEwgke9cEaaRZWRO2lJGn2BORDpBbo_RDRL6y6QIk6jbe4vBLtq9NJ6OLjsapqUcY8gnjQg6gBaLEFlM9onv8zCAFQ1KyW80n9Cp4oL4Dt8F6h0gAyqRHrk8BUX6O3mb4sEEnZZZjA3GcUN7OXw9G7YiQWuBn1rFtBYxUj1h2WEZV9esSxZ-_Y",
    },
    status: "OPEN",
    collateralValue: "500M IDRP",
    certificate: {
      issuer: "Gudangin SRG",
      verified: true,
    },
    validity: "12 Dec 2024",
    profitShare: "70:30",
    funded: {
      current: "325M",
      target: "350M",
      percentage: 92,
    },
    theme: "accent",
  },
  {
    id: "2",
    title: "Arabica Gayo Premium",
    author: {
      name: "Sarah Wijaya",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9cHkhwKarfKaRhddJsGv4bCa42cZB4c_FML6KDTvVFoYCmdazmM9Tf9nLkFM68P01hnExmgz8_TF-OKJvRSWhMgLSs8SkAMHVVm6_7VynOtKS08ocHG4nkjyjnXs0HqXVi9-tU8U-6582g7bThcRKbqK5RT1tQcbI4mOrhikSQIDbaYkaFHjpBrOJGTqlAVI_BxAJ2wHLCH7QvUX_PjX7wJO0pr1J3pDgoGlfILvxvWRVYdC_LHmyOeijvpy4pktyZnEq17T9jMlK",
    },
    status: "OPEN",
    collateralValue: "1.2B IDRP",
    certificate: {
      issuer: "CMA Logistik",
      verified: true,
    },
    validity: "15 Jan 2025",
    profitShare: "70:30",
    funded: {
      current: "750M",
      target: "840M",
      percentage: 89,
    },
    theme: "blue",
  },
  {
    id: "3",
    title: "Lampung Fine Green",
    author: {
      name: "Agus Salim",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3QiYTmVlf_5ca8vOL2y3a_UVWwNVOT-dz3E_fJWuMFCaXmz51Sol8M45bcPRtTciWF0Z5QVpmViZaPLlCoT4vGaLgPH7wO0SjJRbzVTpxkhG779oYAKrNCCTkTaRAvoQtNqWRNhjQXHxu0AlnlLMdDykGN0cRFsjTBw8NnsmR6WBEzrO_GzXD5uJI0DY2NoP-CBHxgoDNti9WV_mAY-ILwpy4Y2lFAKy7V1bJDRuj_DdDL6gKA9uQA3ZO9tB920KWjOKosBpCr6Lb",
    },
    status: "CLOSED",
    collateralValue: "250M IDRP",
    certificate: {
      issuer: "Gudangin SRG",
      verified: true,
    },
    validity: "Expired",
    profitShare: "75:25",
    funded: {
      current: "175M",
      target: "175M",
      percentage: 100,
    },
    theme: "accent",
  },
  {
    id: "4",
    title: "Java Preanger Arabica",
    author: {
      name: "Kevin H.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqhCrCUxCS3X-fFhpBSrM2lQ_k7WE03aHSOm6U58Q9FIukTFVppU6DDSfAZS9MAYH7az1C9RL2C8in0G5YWyuCiAFXirwdH7VQUYcPJgwZlYAFQHlmw83zhMhmJn71dQ2XhekanY04-OHLIuJrUT398PCJkSZU_CT61dfSkHUQD5pP5T71L4GnmXWYoRl_fqkvClzVMms__jcnEMr8Oh9HpvwyXt7JjjujgnNupU7K67bIgvQXyoFdJV970P58s1zTqsAhCKVQ2wbT",
    },
    status: "OPEN",
    collateralValue: "800M IDRP",
    certificate: {
      issuer: "CMA Logistik",
      verified: true,
    },
    validity: "20 Feb 2025",
    profitShare: "70:30",
    funded: {
      current: "80M",
      target: "560M",
      percentage: 14,
    },
    theme: "blue",
  },
  {
    id: "5",
    title: "Toraja Sapan Specialty",
    author: {
      name: "Maria L.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjlUcIzSVhCqDyYJjjDxYHcHCP10v8TpKSauO5ZvGeRE5zFrG2YGcCL5G-WmqO__2ai_C1mzW_OaZxsPFJRuuNlLDDDZQy8yIhnh-Og1TyDDjTOn3i5G1Z8DYI1V9vQ8-xQTWmAXh85Lu7kosxqZJqWSnwK4IJeSRjKiakpDIOg_K8L01ac2Fxghe4PboUZIsDxSBWtr9afFNzcPmyrhOdx74nDB5tBXBzsgRPCfAAofbdT8qn2A4zDjihVhtRZjJahumg7o87G12T",
    },
    status: "OPEN",
    collateralValue: "450M IDRP",
    certificate: {
      issuer: "Gudangin SRG",
      verified: true,
    },
    validity: "05 Mar 2025",
    profitShare: "80:20",
    funded: {
      current: "270M",
      target: "315M",
      percentage: 85,
    },
    theme: "accent",
  },
];

export const MOCK_INVESTMENT_DETAIL = {
  title: "Gayo Coffee Harvest 2024",
  description:
    "Invest in high-grade Arabica coffee sourced directly from the Gayo highlands. Backed by physical inventory managed under the SRG scheme, offering stable yield through commodity trade financing.",
  tags: [
    { icon: "verified", text: "Verified by Gudangin" },
    { icon: "security", text: "Insured 100%" },
    { icon: "lock_clock", text: "6 Month Lock" },
  ],
  stats: {
    profitShare: "70 : 30",
    profitShareLabel: "Investor : Trader",
    target: "500M",
    targetUnit: "IDRP",
    validity: "30 Oct 25",
    validitySub: "365 Days Left",
    lockPeriod: "6 Mo",
    lockPeriodSub: "From Close",
  },
  activeInvestment: {
    amount: "120,000,000",
    unit: "IDRP",
    lockPeriodRemaining: "3 Months Left",
    progress: 50,
    started: "15 Oct 2024",
    unlockDate: "15 Apr 2025",
  },
  funding: {
    totalRaised: "350M",
    target: "500M IDRP",
    percentage: 70,
    ltvRatio: "70%",
    balance: "45,000,000 IDRP",
  },
  collateral: {
    commodity: "Arabica Gayo",
    grade: "Grade 1 (Specialty)",
    quantity: "20,000 kg",
    valuation: "850,000,000",
    certificate: "SRG #10293",
  },
  tradeableAssets: [
    {
      name: "Arabica Gayo Lot A",
      grade: "Grade 1",
      quantity: "5,000 kg",
      valuation: "212,500,000",
      status: "In Vault",
      statusColor: "blue",
      details: {
        certificate: "SRG #10293-A",
        inboundDate: "15 Sep 2024",
        expiryDate: "15 Sep 2025",
        location: "Aceh Tengah WMS",
      },
    },
    {
      name: "Arabica Gayo Lot B",
      grade: "Grade 1",
      quantity: "8,000 kg",
      valuation: "340,000,000",
      status: "Pending",
      statusColor: "yellow",
      details: {
        certificate: "Processing...",
        inboundDate: "20 Oct 2024",
        expiryDate: "20 Oct 2025",
        location: "Transit to Gudangin",
      },
    },
    {
      name: "Robusta Lampung Lot X",
      grade: "Grade 2",
      quantity: "7,000 kg",
      valuation: "210,000,000",
      status: "Sold",
      statusColor: "green",
      details: {
        certificate: "CMA Agreement #992",
        inboundDate: "01 Aug 2024",
        expiryDate: "01 Aug 2025",
        location: "Lampung WMS",
      },
    },
  ],
  cashPool: {
    cap: "595,000,000",
    current: "350,000,000",
    liquidity: "150,000,000",
    deployed: "200,000,000",
    remaining: "245,000,000",
  },
  traceability: [
    {
      title: "Harvest & Aggregation",
      description:
        "Coffee cherries collected from 142 partner farmers in Bener Meriah district.",
      date: "Sep 12, 2024",
      tag: "Cooperative Alpha",
      active: false,
    },
    {
      title: "Processing & Grading",
      description:
        "Wet hulling process completed. Quality assessment passed for Grade 1 classification.",
      date: "Sep 20, 2024",
      tag: "QC Report #9921",
      active: false,
    },
    {
      title: "Warehousing (Gudangin)",
      description:
        "Commodities entered Gudangin WMS. SRG issued and verified. Collateral locked.",
      date: "Current Stage",
      tag: null,
      active: true,
    },
  ],
  manager: {
    name: "Nusantara Commodities",
    person: "Budi Santoso",
    role: "PT Kopi Nusantara Trading Tbk.",
    ccrRatio: "145%",
    vaultsManaged: 12,
    activeLoans: "12.5B IDRP",
    totalCollateral: "45.2B IDRP",
  },
  documents: [
    {
      title: "SRG Certificate #10293",
      subtitle: "Verified Warehouse Receipt",
      icon: "description",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Insurance Policy (All-Risk)",
      subtitle: "Coverage for 1.5B IDRP",
      icon: "security",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "CMA Agreement",
      subtitle: "Collateral Management Terms",
      icon: "description",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ],
};

export async function getInvestments() {
  return INVESTMENTS;
}

export async function getInvestmentDetail(_id: string) {
  // Mock async fetch
  return MOCK_INVESTMENT_DETAIL;
}
