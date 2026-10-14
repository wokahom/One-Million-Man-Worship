"use client";

import { useState } from "react";
import Marquee from "@/components/Marquee";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subjectOptions = [
  "General Inquiry",
  "Partnership & Sponsorship",
  "Volunteer & Protocol",
  "Choir & Artiste Ministration",
  "Transportation & Bus Centers",
  "Prayer Request",
  "Media & Press",
];

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Missing required fields", {
        description: "Please fill out your name, email, subject, and message.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      toast.success("Message sent successfully!", {
        description:
          "Thank you for reaching out. A member of our team will get in touch with you shortly.",
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Contact submission error:", err);
      toast.error("Could not send message", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again or email us directly at info@onemillionmanworship.com",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: -100,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 450,
          height: 450,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          bottom: 40,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "inline-block", marginBottom: 12 }}>
            <Badge variant="warning">
              <MessageSquare size={13} /> Get In Touch
            </Badge>
          </div>
          <h1 className="section-title">CONTACT ONE MILLION MAN WORSHIP</h1>
          <p className="section-subtitle">
            Have questions, prayer requests, or want to partner with us? We are
            here to assist you every step of the way.
          </p>
        </motion.div>

        {/* 2-Column Contact Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 36,
            alignItems: "start",
          }}
        >
          {/* Left Column: Direct Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Info Card 1: Official Email */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: "24px 22px",
                boxShadow: "var(--card-shadow)",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(229, 57, 53, 0.15)",
                  color: "var(--primary-red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  Official Email
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 8 }}>
                  For general correspondence, feedback, and minister inquiries.
                </p>
                <a
                  href="mailto:info@onemillionmanworship.com"
                  style={{
                    color: "var(--primary-red)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    wordBreak: "break-all",
                  }}
                >
                  info@onemillionmanworship.com
                </a>
              </div>
            </div>

            {/* Info Card 2: Convocation Center */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: "24px 22px",
                boxShadow: "var(--card-shadow)",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  Convocation Ground
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  Port Harcourt, Rivers State, Nigeria. Multiple designated free bus stations available across major hubs.
                </p>
              </div>
            </div>

            {/* Info Card 3: Date & Time */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: "24px 22px",
                boxShadow: "var(--card-shadow)",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  Date & Worship Schedule
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  Friday, December 19, 2025 • Gates open from 4:00 PM (WAT) till dawn.
                </p>
              </div>
            </div>

            {/* Info Card 4: Social Community */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: "24px 22px",
                boxShadow: "var(--card-shadow)",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(236, 72, 153, 0.15)",
                  color: "#ec4899",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BsInstagram size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  Official Instagram
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 8 }}>
                  Follow live updates, ministration previews, and highlights.
                </p>
                <a
                  href="https://www.instagram.com/onemillionmanworship_ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ec4899", fontWeight: 700, fontSize: "0.95rem" }}
                >
                  @onemillionmanworship_ph
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 24,
              padding: "36px 30px",
              boxShadow: "var(--section-card-shadow)",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                Send Us A Message
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Fill out the form below and our ministry team will get back to you promptly.
              </p>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginBottom: 20,
                    padding: 16,
                    borderRadius: 14,
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.9rem" }}>
                    Thank you! Your message has been received. You can send another message anytime.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Name */}
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
                <Input
                  type="text"
                  required
                  placeholder="e.g. Deacon Joshua Mark"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email & Phone Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
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
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    Phone Number (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
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
                  Subject / Category *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 12,
                    border: "1px solid var(--input-border)",
                    background: "var(--input-bg)",
                    color: "var(--text-primary)",
                    padding: "0 14px",
                    fontSize: "0.92rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
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
                  Your Message *
                </label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help you, or submit your prayer requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                size="lg"
                style={{ width: "100%", marginTop: 6 }}
              >
                <Send size={18} />
                <span>{loading ? "Sending Message..." : "Submit Message"}</span>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
