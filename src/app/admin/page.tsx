import Link from "next/link";
import { Icon } from "@/components/ui/icon";

type Activity = {
  id: string;
  title: string;
  date: string;
  status: "success" | "new" | "pending";
  icon: string;
  iconBg: "accent" | "primary" | "warning";
};

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "New User Registered",
    date: "Jan 18 • User ID: #001241",
    status: "success",
    icon: "person_add",
    iconBg: "accent",
  },
  {
    id: "2",
    title: "Vault Created",
    date: "Jan 17 • Vault ID: #VAULT0013",
    status: "new",
    icon: "account_balance",
    iconBg: "primary",
  },
  {
    id: "3",
    title: "Multisig Initiated",
    date: "Jan 16 • Approval ID: #APP0056",
    status: "pending",
    icon: "approval",
    iconBg: "warning",
  },
  {
    id: "4",
    title: "New User Registered",
    date: "Jan 15 • User ID: #001240",
    status: "success",
    icon: "person_add",
    iconBg: "accent",
  },
  {
    id: "5",
    title: "Vault Created",
    date: "Jan 14 • Vault ID: #VAULT0012",
    status: "new",
    icon: "account_balance",
    iconBg: "primary",
  },
];

function StatsCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  label,
  buttonLabel,
  buttonHref,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  badge?: string;
  label: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <div className="bg-primary text-white rounded-2xl p-6 lg:p-10 shadow-soft flex flex-col justify-between items-start gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-accent opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Icon name={icon} className="text-white text-[24px]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            {subtitle && (
              <p className="text-xs text-white/60 font-medium">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start relative z-10 w-full">
        <p className="text-sm opacity-80 font-medium mb-1">{label}</p>
        <span className="text-4xl font-extrabold tracking-tight">{value}</span>
      </div>
      {buttonLabel && (
        <div className="w-full pt-6 border-t border-white/10 relative z-10 flex flex-wrap gap-4">
          {buttonHref ? (
            <Link href={buttonHref}>
              <button className="bg-primary border border-white/20 text-white hover:bg-white/5 transition-colors text-base font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 flex-1 sm:flex-none">
                <span>{buttonLabel}</span>
                <Icon name="arrow_forward" className="text-[20px]" />
              </button>
            </Link>
          ) : (
            <button className="bg-primary border border-white/20 text-white hover:bg-white/5 transition-colors text-base font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 flex-1 sm:flex-none">
              <span>{buttonLabel}</span>
              <Icon name="arrow_forward" className="text-[20px]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ActivityList({ activities }: { activities: Activity[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-accent";
      case "new":
        return "text-primary";
      case "pending":
        return "text-warning";
      default:
        return "text-neutral-600";
    }
  };

  const getIconBg = (bg: string) => {
    switch (bg) {
      case "accent":
        return "bg-accent/10 text-accent";
      case "primary":
        return "bg-primary/5 text-primary";
      case "warning":
        return "bg-warning/10 text-warning";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-neutral-200 rounded-2xl p-6 shadow-soft flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Icon name="history" className="text-primary text-[20px]" />
          Recent System Activity
        </h2>
      </div>
      <div className="relative">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
        />
        <input
          className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary placeholder:text-neutral-400"
          placeholder="Filter activity..."
          type="text"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[500px]">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`size-8 rounded-full flex items-center justify-center shrink-0 ${getIconBg(
                  activity.iconBg,
                )}`}
              >
                <Icon name={activity.icon} className="text-[16px]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {activity.title}
                </p>
                <p className="text-[10px] text-neutral-600">{activity.date}</p>
              </div>
            </div>
            <span
              className={`text-xs font-bold whitespace-nowrap ${getStatusColor(
                activity.status,
              )}`}
            >
              {activity.status.charAt(0).toUpperCase() +
                activity.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-auto text-xs font-bold text-primary hover:text-primary/80 transition-colors w-full text-center py-2 border border-dashed border-neutral-300 rounded-lg">
        View All Activity
      </button>
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <main className="flex-1 w-full px-4 md:px-8 py-8 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">
          Overview
        </h1>
        <div className="lg:hidden flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary">
            <Icon name="menu" />
            Menu
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Hero Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <StatsCard
            title="Total Active Vaults"
            value="12"
            subtitle="Currently operational vaults"
            icon="account_balance"
            badge="Active"
            label="Number of Vaults"
            buttonLabel="Manage Vaults"
            buttonHref="/admin/vaults"
          />
          <StatsCard
            title="Total Registered Users"
            value="1,240"
            subtitle="Platform users"
            icon="group"
            badge="Investors"
            label="Total Users"
            buttonLabel="View Users"
            buttonHref="/admin/users"
          />
        </div>

        {/* Activity List */}
        <ActivityList activities={MOCK_ACTIVITIES} />
      </div>
    </main>
  );
}
