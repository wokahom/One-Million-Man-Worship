"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/admin");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3px solid var(--border-glass)",
            borderTopColor: "var(--primary-red)",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Verifying administrator credentials...
        </p>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Administrator Top Banner */}
      <div
        style={{
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border-glass)",
          padding: "10px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Authenticated Admin Session
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 1 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {user.name} ({user.email})
                </span>
                <Badge variant="success" style={{ padding: "1px 6px", fontSize: "0.65rem" }}>
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => logout()}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
