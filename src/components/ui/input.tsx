import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn("ui-input", className)}
        style={{
          width: "100%",
          height: 48,
          borderRadius: 12,
          border: "1px solid var(--input-border)",
          backgroundColor: "var(--input-bg)",
          color: "var(--text-primary)",
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          fontSize: "0.95rem",
          fontFamily: "var(--font-main)",
          outline: "none",
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

