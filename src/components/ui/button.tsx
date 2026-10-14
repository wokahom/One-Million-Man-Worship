import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "ui-button",
          `ui-button--${variant}`,
          `ui-button--size-${size}`,
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

