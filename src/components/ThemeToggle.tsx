"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder to avoid layout shift before hydration
    return (
      <button
        type="button"
        className="theme-toggle-btn"
        aria-label="Toggle theme"
        style={{
          width: showLabel ? "auto" : 38,
          height: 38,
          borderRadius: showLabel ? 8 : "50%",
          padding: showLabel ? "8px 14px" : 0,
          background: "var(--bg-glass)",
          border: "1px solid var(--border-glass)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: "var(--text-primary)",
        }}
      >
        <span style={{ width: 18, height: 18 }} />
        {showLabel && <span>Theme</span>}
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width: showLabel ? "100%" : 38,
        height: 38,
        borderRadius: showLabel ? 10 : "50%",
        padding: showLabel ? "10px 16px" : 0,
        background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        border: "1px solid var(--border-glass)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: showLabel ? "flex-start" : "center",
        gap: 10,
        color: "var(--text-primary)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDark ? "#fbbf24" : "#e53935",
          transition: "transform 0.4s ease",
          transform: isDark ? "rotate(0deg)" : "rotate(360deg)",
        }}
      >
        {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
      </div>
      {showLabel && (
        <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
