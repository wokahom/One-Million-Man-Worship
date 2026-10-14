"use client";

import { Toaster as Sonner, toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--bg-card)] group-[.toaster]:text-[var(--text-primary)] group-[.toaster]:border-[var(--border-glass)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-[var(--text-secondary)]",
          actionButton:
            "group-[.toast]:bg-[var(--primary-red)] group-[.toast]:text-white font-medium",
          cancelButton:
            "group-[.toast]:bg-[var(--bg-card-secondary)] group-[.toast]:text-[var(--text-primary)]",
          success:
            "group-[.toaster]:border-emerald-500/30 group-[.toaster]:bg-emerald-950/20 text-emerald-400",
          error:
            "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-950/20 text-red-400",
          info:
            "group-[.toaster]:border-sky-500/30 group-[.toaster]:bg-sky-950/20 text-sky-400",
        },
      }}
      position="top-right"
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster, toast };
