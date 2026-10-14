"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      router.push(redirectPath);
      router.refresh();
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.14) 0%, transparent 70%)",
          top: -80,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
          bottom: -60,
          right: -100,
        }}
      />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 60, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 460,
            margin: "0 auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "var(--section-card-shadow)",
          }}
        >
          {/* Top Badge & Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-block", marginBottom: 12 }}>
              <Badge variant="warning">
                <Lock size={13} /> Admin Portal
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.9rem",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              Sign In to 1MMW
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Enter your ministry administrator credentials to access the moderation desk.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                Administrator Email
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type="email"
                  required
                  placeholder="admin@onemillionmanworship.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 42 }}
                />
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                />
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              size="lg"
              style={{ width: "100%", marginTop: 8 }}
            >
              <ShieldCheck size={18} />
              <span>{loading ? "Authenticating..." : "Sign In to Admin Portal"}</span>
            </Button>
          </form>

          {/* Registration Link */}
          <div
            style={{
              marginTop: 26,
              paddingTop: 18,
              borderTop: "1px solid var(--border-glass)",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: 0 }}>
              Need an administrative account?{" "}
              <Link
                href="/auth/register"
                style={{
                  color: "var(--primary-red)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span>Register here</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "var(--text-secondary)" }}>Loading authentication...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
