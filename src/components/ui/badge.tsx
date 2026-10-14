import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
        variant === "default" && "bg-[var(--primary-red)] text-white shadow-sm",
        variant === "secondary" && "bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
        variant === "destructive" && "bg-red-500/20 text-red-400 border border-red-500/30",
        variant === "outline" && "border border-[var(--border-glass)] text-[var(--text-primary)]",
        variant === "success" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        variant === "warning" && "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
