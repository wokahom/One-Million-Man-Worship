"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User as UserIcon, Eye, EyeOff, UserPlus, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !code) {
      toast.error("Missing fields", {
        description: "Please fill out all required fields.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Weak password", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure your passwords match exactly.",
      });
      return;
    }

    setLoading(true);
    const success = await register(name, email, password, code);
    setLoading(false);

    if (success) {
      router.push("/admin");
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
          right: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          bottom: -60,
          left: -100,
        }}
      />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 60, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 480,
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
                <ShieldAlert size={13} /> Admin Registration
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
              Create Admin Account
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Register official credentials to manage convocation testimonies and inquiries.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Full Name */}
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
                Full Name *
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Pastor Samuel Ojo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: 42 }}
                />
                <UserIcon
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

            {/* Email */}
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
                Official Email Address *
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

            {/* Password */}
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
                Password * (min. 6 characters)
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

            {/* Confirm Password */}
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
                Confirm Password *
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: 42 }}
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
              </div>
            </div>

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
                Admin Access Code *
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type="password"
                  required
                  placeholder="Enter authorized access code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ paddingLeft: 42 }}
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
              <UserPlus size={18} />
              <span>{loading ? "Creating Account..." : "Register Admin Account"}</span>
            </Button>
          </form>

          {/* Login Link */}
          <div
            style={{
              marginTop: 26,
              paddingTop: 18,
              borderTop: "1px solid var(--border-glass)",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: 0 }}>
              Already registered?{" "}
              <Link
                href="/auth/login"
                style={{
                  color: "var(--primary-red)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span>Sign in here</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
