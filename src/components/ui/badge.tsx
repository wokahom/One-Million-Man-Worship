import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", style, ...props }: BadgeProps) {
  return (
    <div
      className={cn("ui-badge", `ui-badge--${variant}`, className)}
      style={style}
      {...props}
    />
  );
}

export { Badge };

