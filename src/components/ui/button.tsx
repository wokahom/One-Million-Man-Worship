import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
          // Variants
          variant === "default" && "bg-[var(--primary-red)] text-white hover:brightness-110 shadow-lg shadow-red-500/20",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20",
          variant === "outline" && "border border-[var(--border-glass)] bg-transparent hover:bg-[var(--bg-card-secondary)] text-[var(--text-primary)]",
          variant === "secondary" && "bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] border border-[var(--border-glass)]",
          variant === "ghost" && "hover:bg-[var(--bg-card-secondary)] text-[var(--text-primary)]",
          variant === "link" && "text-[var(--primary-red)] underline-offset-4 hover:underline p-0 h-auto",
          // Sizes
          size === "default" && "h-11 px-5 py-2.5",
          size === "sm" && "h-9 rounded-lg px-3.5 text-xs",
          size === "lg" && "h-13 rounded-2xl px-8 text-base",
          size === "icon" && "h-10 w-10 p-0 rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
