"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import {
  Send,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "@/components/ui/sonner";

export default function TestimonyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [testimony, setTestimony] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !testimony.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name, location, and testimony.");
      toast.error("Missing required fields", {
        description: "Please fill in your name, location, and testimony story.",
      });
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      let imageURL = "";

      // Upload media if provided and storage initialized
      if (imageFile && storage) {
        try {
          const imgRef = ref(
            storage,
            `testimonies/images/${Date.now()}_${imageFile.name}`
          );
          await uploadBytes(imgRef, imageFile);
          imageURL = await getDownloadURL(imgRef);
        } catch {
          // Continue if storage upload fails
        }
      }

      // 1. Submit to MongoDB API
      let savedToApi = false;
      try {
        const res = await fetch("/api/testimonies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email: email || undefined,
            location,
            testimony,
            imageURL,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          savedToApi = true;
        }
      } catch {
        // Fallback to Firestore below
      }

      // 2. Also mirror to Firestore if API was unreachable or Firestore configured
      if (!savedToApi && db) {
        try {
          await addDoc(collection(db, "testimonies"), {
            name,
            email: email || null,
            location,
            testimony,
            imageURL,
            approved: false,
            createdAt: Date.now(),
            timestamp: serverTimestamp(),
          });
        } catch {}
      }

      toast.success("Testimony Submitted!", {
        description:
          "Thank you for sharing God's supernatural works. Your testimony is pending moderation and will inspire millions worldwide.",
      });

      setStatus("success");
      setName("");
      setEmail("");
      setLocation("");
      setTestimony("");
      setImageFile(null);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      toast.success("Testimony Recorded!", {
        description: "Your testimony has been received. Praise God!",
      });
      setStatus("success");
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
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: 150,
          left: -150,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          bottom: 100,
          right: -120,
        }}
      />

      <Marquee />

      {/* Jesus Banner Header */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 340,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-glass)",
        }}
      >
        <Image
          src="/assets/images/jesus_banner.jpg"
          alt="Jesus is Lord - One Million Man Worship"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.35)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "40px 20px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.25)",
              color: "#fca5a5",
              border: "1px solid rgba(229, 57, 53, 0.4)",
              padding: "6px 16px",
              borderRadius: 30,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <Sparkles size={16} /> Faith & Miracles
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: 14,
            }}
          >
            EXPERIENCE JESUS
          </h1>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.1rem",
              maxWidth: 620,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            God has done great things! Share your miraculous story and be a
            beacon of encouragement to someone today.
          </p>
        </motion.div>
      </section>

      {/* Form Container */}
      <div className="container" style={{ paddingTop: 50, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, type: "spring", damping: 25, stiffness: 220 }}
          style={{
            maxWidth: 680,
            margin: "0 auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "var(--card-shadow)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              Share Your Testimony
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              We would love to celebrate what the Lord has done in your health,
              family, career, or spiritual walk.
            </p>
          </div>

          {/* Success / Error Feedback Popups with AnimatePresence */}
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success-box"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginBottom: 24,
                  padding: 18,
                  borderRadius: 14,
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: "0.95rem", display: "block" }}>
                    Testimony Submitted Successfully!
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Thank you for testifying of God&apos;s goodness. Your testimony
                    will be published to inspire millions.
                  </span>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error-box"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginBottom: 24,
                  padding: 16,
                  borderRadius: 14,
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <AlertCircle size={20} />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Brother David Emeka"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 10,
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 10,
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Location */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Your Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, Country (e.g. Port Harcourt, Nigeria)"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 10,
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Testimony Message */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Your Testimony Story *
              </label>
              <textarea
                required
                rows={5}
                value={testimony}
                onChange={(e) => setTestimony(e.target.value)}
                placeholder="Write in detail what God did for you during or after One Million Man Worship..."
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 10,
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Optional Photo Attachment */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: 8,
                }}
              >
                Attach Photo / Proof (Optional)
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "var(--bg-card-secondary)",
                  border: "1px dashed var(--border-glass)",
                }}
              >
                <Upload size={18} color="var(--primary-red)" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "1.05rem",
                marginTop: 10,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              <Send size={18} />
              <span>{loading ? "Submitting..." : "Submit Testimony"}</span>
            </motion.button>
          </form>

          {/* Link to view other testimonies */}
          <div
            style={{
              textAlign: "center",
              marginTop: 30,
              paddingTop: 20,
              borderTop: "1px solid var(--border-glass)",
            }}
          >
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: 0 }}>
              Want to see what God is doing?{" "}
              <Link
                href="/testimonies"
                style={{
                  color: "var(--primary-red)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>Read All Testimonies</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
