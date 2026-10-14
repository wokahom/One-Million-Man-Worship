import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("ui-textarea", className)}
        style={{
          width: "100%",
          minHeight: 120,
          borderRadius: 12,
          border: "1px solid var(--input-border)",
          backgroundColor: "var(--input-bg)",
          color: "var(--text-primary)",
          padding: "14px 16px",
          fontSize: "0.95rem",
          fontFamily: "var(--font-main)",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

