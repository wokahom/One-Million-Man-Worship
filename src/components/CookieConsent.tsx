"use client";

import { useEffect, useState } from "react";
import { Cookie, Check, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent_status");
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("cookie_consent_status", accepted ? "accepted" : "declined");
    setVisible(false);

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: accepted ? "granted" : "denied",
        analytics_storage: accepted ? "granted" : "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 24,
        left: 20,
        right: 20,
        maxWidth: 440,
        margin: "0 auto",
        background: "rgba(18, 18, 24, 0.96)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 16,
        padding: "18px 20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 57, 53, 0.2)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUpFade 0.4s ease-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            padding: 8,
            borderRadius: 10,
            background: "rgba(229, 57, 53, 0.15)",
            color: "#ef4444",
            flexShrink: 0,
          }}
        >
          <Cookie size={22} />
        </div>
        <div>
          <h4
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 4,
            }}
          >
            We Value Your Privacy
          </h4>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#94a3b8",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            We use cookies and telemetry to optimize your experience, enable
            avatar creation, and track global event visits. Do you accept?
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={() => handleConsent(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255, 255, 255, 0.08)",
            color: "#cbd5e1",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <X size={15} /> Decline
        </button>
        <button
          type="button"
          onClick={() => handleConsent(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#ffffff",
            border: "none",
            padding: "8px 18px",
            borderRadius: 8,
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
            transition: "all 0.2s ease",
          }}
        >
          <Check size={15} /> Accept All
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
