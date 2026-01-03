import * as React from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground ring-primary/20",
  secondary: "bg-secondary text-secondary-foreground ring-secondary/20",
  success: "bg-success/10 text-success ring-success/20",
  warning: "bg-warning/10 text-warning ring-warning/20",
  danger: "bg-danger/10 text-danger ring-danger/20",
  outline: "bg-neutral-100 text-neutral-600 ring-neutral-200",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
