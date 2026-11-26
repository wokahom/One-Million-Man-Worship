"use client";

import { useState } from "react";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import {
  Send,
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const prayerCategories = [
  "Healing & Divine Health",
  "Financial Breakthrough & Employment",
  "Family & Fruit of the Womb",
  "Spiritual Growth & Deliverance",
  "Academic & Career Success",
  "Peace & Progress in Nigeria",
  "Special Intention",
];

export default function PrayerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(prayerCategories[0]);
  const [request, setRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!request.trim()) {
      toast.error("Missing prayer details", {
        description: "Please write your prayer request petition.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? "Anonymous" : name,
          email: isAnonymous ? undefined : email,
          phone: isAnonymous ? undefined : phone,
          category,
          request,
          isAnonymous,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit prayer request.");
      }

      toast.success("Prayer Request Received!", {
        description: "Our dedicated prayer team has joined their faith with yours.",
      });

      setSubmitted(true);
    } catch (err: unknown) {
      toast.error("Submission error", {
        description: err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Ambient Glow */}
      <div
        className="glow-orb"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: -80,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 460,
          height: 460,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
          bottom: 100,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.15)",
              color: "var(--primary-red)",
              padding: "5px 16px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <Flame size={16} /> Intercessory & Prayer Portal
          </span>
          <h1 className="section-title">SUBMIT YOUR PRAYER REQUEST</h1>
          <p className="section-subtitle">
            &quot;For where two or three are gathered together in my name, there am I in the midst of them.&quot; (Matthew 18:20)
            <br />
            Our anointed intercessory ministers will lift your petition before King Jesus during the 2026 convocation.
          </p>
        </motion.div>

        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "var(--section-card-shadow)",
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "30px 10px" }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 18px",
                }}
              >
                <CheckCircle2 size={38} />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>
                Prayer Petition Received
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
                We stand with you in faith. The prayer and prophetic team at One Million Man Worship is presenting your request before the throne of God. Believe for your testimony!
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/testimony" className="btn-primary">
                  <Sparkles size={16} /> Share Testimony
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setRequest("");
                  }}
                  className="btn-secondary"
                >
                  Submit Another Prayer Request
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                <Lock size={14} color="#10b981" />
                <span>Your prayer request is strictly confidential and handled only by accredited intercessors.</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Anonymous Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--bg-card-secondary)",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1px solid var(--border-glass)",
                  }}
                >
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: "#e53935", cursor: "pointer" }}
                  />
                  <label htmlFor="anonymous" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", cursor: "pointer" }}>
                    Keep My Request Anonymous (Do not store name or phone)
                  </label>
                </div>

                {!isAnonymous && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Full Name (Optional)
                      </label>
                      <Input
                        placeholder="e.g. Sister Grace"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Email Address (Optional)
                      </label>
                      <Input
                        type="email"
                        placeholder="grace@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Phone / WhatsApp (Optional)
                      </label>
                      <Input
                        type="tel"
                        placeholder="080 0000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                    Prayer Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: "var(--bg-card-secondary)",
                      border: "1px solid var(--border-glass)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {prayerCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                    Your Prayer Petition *
                  </label>
                  <Textarea
                    placeholder="Describe what you are believing God for (healing, open doors, deliverance, family restoration)..."
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", justifyContent: "center" }}
                >
                  <Send size={18} />
                  <span>{loading ? "Submitting Prayer Request..." : "Submit Prayer Petition"}</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
