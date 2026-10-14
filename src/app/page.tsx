"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Marquee from "@/components/Marquee";
import MediaAutoplay from "@/components/MediaAutoplay";
import Countdown from "@/components/Countdown";
import MinisterSlider from "@/components/MinisterSlider";
import {
  Sparkles,
  ArrowRight,
  Tv,
  HeartHandshake,
  Users,
  Flame,
  Radio,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Download,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * 0.12, ease: "easeOut" },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"route" | "venue">("route");

  useEffect(() => {
    // Record page view in Firestore if configured
    if (db) {
      addDoc(collection(db, "visits"), {
        page: "home",
        timestamp: serverTimestamp(),
      }).catch(() => {});
    }
  }, []);

  const stats = [
    { number: "1,000,000+", label: "Believers Gathering", icon: <Users size={16} color="var(--primary-red)" /> },
    { number: "DEC 19, 2025", label: "Flagship Date", icon: <Calendar size={16} color="var(--primary-gold)" /> },
    { number: "Global Stream", label: "Across Continents", icon: <Globe2 size={16} color="#3b82f6" /> },
    { number: "Free Admission", label: "Everyone Welcome", icon: <ShieldCheck size={16} color="#10b981" /> },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Ambient Glow Orbs */}
      <div
        className="glow-orb glow-orb-red"
        style={{ top: "4%", left: "15%", width: 480, height: 480 }}
      />
      <div
        className="glow-orb glow-orb-gold"
        style={{ top: "25%", right: "8%", width: 420, height: 420 }}
      />
      <div
        className="glow-orb glow-orb-blue"
        style={{ top: "60%", left: "5%", width: 500, height: 500 }}
      />

      {/* Running Marquee Ticker */}
      <Marquee />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 30 }}>
        {/* =========================================
            HERO INTRO SECTION
            ========================================= */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          {/* Live Badge */}
          <motion.div
            variants={fadeIn}
            custom={0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--bg-glass)",
              border: "1px solid var(--border-glow)",
              borderRadius: 30,
              padding: "7px 18px",
              boxShadow: "0 4px 20px rgba(229, 57, 53, 0.15)",
              marginBottom: 18,
            }}
            className="badge-shimmer"
          >
            <span className="pulse-dot" />
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Annual Global Worship Convocation • December 19, 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeIn}
            custom={1}
            className="section-title"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              lineHeight: 1.15,
              maxWidth: 960,
              margin: "0 auto 18px",
            }}
          >
            ONE MILLION MAN WORSHIP
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn}
            custom={2}
            className="section-subtitle"
            style={{
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              maxWidth: 720,
              margin: "0 auto 28px",
              lineHeight: 1.65,
            }}
          >
            A sacred convocation of one million hearts gathering across cities and nations
            to lift up the highest praise and adoration to King Jesus with one voice.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            variants={fadeIn}
            custom={3}
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/avatar" className="btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                <Sparkles size={18} />
                <span>Create 2025 Avatar</span>
                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/live" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                <Tv size={18} />
                <span>Previous Broadcasts</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/testimony"
                className="btn-secondary"
                style={{
                  padding: "14px 24px",
                  fontSize: "1rem",
                  borderColor: "rgba(245, 158, 11, 0.4)",
                  color: "var(--primary-gold)",
                }}
              >
                <HeartHandshake size={18} />
                <span>Share Testimony</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Stats Strip */}
          <motion.div
            variants={fadeIn}
            custom={4}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginBottom: 44,
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-pill"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {stat.icon}
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* =========================================
            SLICK MEDIA SHOWCASE (PROMO & FLYER)
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 60 }}
        >
          <div className="slick-media-frame">
            <MediaAutoplay
              imageSrc="/assets/images/1mmw_flyer3_1.jpg"
              videoSrc="https://res.cloudinary.com/dtemxjmt6/video/upload/v1764531906/1mmw_2025_ads_video3_1_bual4w.mov"
            />
          </div>
        </motion.section>

        {/* =========================================
            LIVE EVENT COUNTDOWN
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 65 }}
        >
          <Countdown targetDate="December 19, 2025 16:00:00" />
        </motion.section>

        {/* =========================================
            MINISTERS & ARTISTES SLIDER
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 70 }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(229, 57, 53, 0.15)",
                color: "var(--primary-red)",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              <Users size={14} /> Anointed Vessels
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              MINISTERS & WORSHIP ARTISTES
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 20 }}>
              Leading a global congregation into the Holy of Holies through prophetic praise and adoration.
            </p>
          </div>

          <MinisterSlider />
        </motion.section>

        {/* =========================================
            HERO ACTION CARDS (3 WAYS TO ENGAGE)
            ========================================= */}
        <section style={{ marginBottom: 75 }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(59, 130, 246, 0.15)",
                color: "#3b82f6",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              <Sparkles size={14} /> Be Part Of It
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              GET INVOLVED & CONNECT
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 10 }}>
              Everything you need to prepare, attend, and share the experience worldwide.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: 24,
            }}
          >
            {/* Card 1: Avatar Generator */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                background: "var(--hero-card-1-bg)",
                border: "1px solid var(--hero-card-1-border)",
                borderRadius: 22,
                padding: "30px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--card-shadow)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 150,
                  height: 150,
                  background: "radial-gradient(circle, rgba(229, 57, 53, 0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(229, 57, 53, 0.2)",
                      color: "var(--primary-red)",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    <Sparkles size={13} /> Official 2025 Badge
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-red)", fontWeight: 700 }}>
                    #1 Most Popular
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  Create Your Custom Avatar
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Join millions across the globe in one visual statement of worship.
                  Upload your photo, adjust zoom and position, and share directly to WhatsApp.
                </p>

                {/* Feature checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-red)" />
                    <span>Official 1MMW 2025 High-Res Frame</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-red)" />
                    <span>Instant PNG Download & WhatsApp Sharing</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/avatar" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Launch Avatar Studio</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Card 2: Live Experience */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                background: "var(--hero-card-2-bg)",
                border: "1px solid var(--hero-card-2-border)",
                borderRadius: 22,
                padding: "30px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--card-shadow)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 150,
                  height: 150,
                  background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(59, 130, 246, 0.2)",
                      color: "#3b82f6",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    <Radio size={13} /> Global Broadcast Archive
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#3b82f6", fontWeight: 700 }}>
                    Full HD Replays
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  Watch Previous Editions
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Relive glorious atmospheres from past editions of One Million Man Worship.
                  Stream high-definition recordings, minister sessions, and anointed praises.
                </p>

                {/* Feature checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="#3b82f6" />
                    <span>Multi-session Live Recordings from 2024</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="#3b82f6" />
                    <span>Inspiring Video Highlights & Mini-Clips</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/live" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Stream Recordings</span>
                  <Tv size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Card 3: Experience Jesus & Testimonies */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                background: "var(--hero-card-3-bg)",
                border: "1px solid var(--hero-card-3-border)",
                borderRadius: 22,
                padding: "30px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--card-shadow)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 150,
                  height: 150,
                  background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(245, 158, 11, 0.2)",
                      color: "var(--primary-gold)",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    <Flame size={13} /> Testimonies of God
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-gold)", fontWeight: 700 }}>
                    128+ Documented
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  Share Your Miracles
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  What has the Lord done in your life through 1MMW? Share your
                  breakthrough, healing, and answered prayers to inspire faith worldwide.
                </p>

                {/* Feature checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-gold)" />
                    <span>Real Documented Healing & Miracles</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-gold)" />
                    <span>Instant Online Submission Portal</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/testimony" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Submit Testimony</span>
                  <HeartHandshake size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            ABOUT / MOVEMENT HIGHLIGHTS
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: 24,
            padding: "48px 36px",
            marginBottom: 75,
            boxShadow: "var(--section-card-shadow)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            {/* Visual Image with Hover Zoom */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border-glass)",
                boxShadow: "var(--card-shadow)",
                aspectRatio: "16 / 11",
              }}
            >
              <Image
                src="/assets/images/1mmw_banner2.jpg"
                alt="One Million Man Worship Gathering"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <MapPin size={13} color="#ef4444" />
                <span>Port Harcourt, Rivers State, Nigeria</span>
              </div>
            </motion.div>

            {/* Content Breakdown */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--primary-red)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                <Users size={16} /> Global Worship Convocation
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                  marginBottom: 18,
                }}
              >
                ONE MILLION MAN WORSHIP
              </h2>

              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                One Million Man Worship is a global worship movement that gathers
                believers from different cities, nations, and denominations for
                one sacred purpose — <strong>to lift up the name of Jesus with one voice</strong>.
              </p>

              {/* 2 Core Pillars Pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    background: "var(--bg-card-secondary)",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid var(--border-glass)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(229, 57, 53, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-red)",
                      flexShrink: 0,
                    }}
                  >
                    <Flame size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Pure Unhindered Praise:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2, margin: 0 }}>
                      Transcending barriers and denomination walls in true spiritual adoration.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    background: "var(--bg-card-secondary)",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid var(--border-glass)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(245, 158, 11, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-gold)",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Miracles & Life Encounters:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2, margin: 0 }}>
                      An atmosphere charged with divine presence bringing healings, peace, and spiritual revival.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/about" className="btn-primary">
                  <span>Learn About Movement</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/testimonies" className="btn-secondary">
                  <span>Read Testimonies Feed</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =========================================
            TRANSPORTATION & BUS ROUTE HUB
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 70, textAlign: "center" }}
        >
          <div style={{ marginBottom: 28 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              <MapPin size={14} /> Transit & Logistics
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              GETTING TO THE CONVOCATION
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 20 }}>
              Convenient transit locations, designated pickup spots, and transportation guides across major terminals.
            </p>

            {/* Interactive Toggle */}
            <div
              style={{
                display: "inline-flex",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 30,
                padding: 4,
                boxShadow: "var(--card-shadow)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("route")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: activeTab === "route" ? "var(--primary-red)" : "transparent",
                  color: activeTab === "route" ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.25s ease",
                }}
              >
                Bus Route Map
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("venue")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: activeTab === "venue" ? "var(--primary-red)" : "transparent",
                  color: activeTab === "venue" ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.25s ease",
                }}
              >
                Transit Information
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "route" ? (
              <motion.div
                key="route-map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 960,
                  margin: "0 auto",
                  borderRadius: 22,
                  overflow: "hidden",
                  border: "1px solid var(--border-glass)",
                  boxShadow: "var(--section-card-shadow)",
                }}
              >
                <Image
                  src="/assets/images/1mmw_2025bus_route.jpg"
                  alt="One Million Man Worship 2025 Bus Route"
                  width={1200}
                  height={700}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="venue-info"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: 820,
                  margin: "0 auto",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 22,
                  padding: "36px 30px",
                  boxShadow: "var(--card-shadow)",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 20, borderRadius: 16 }}>
                    <h4 style={{ color: "var(--primary-red)", fontSize: "1.05rem", fontWeight: 800, marginBottom: 8 }}>
                      🚌 Free Transit Shuttle
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                      Designated buses will be available at strategic junctions across Port Harcourt from 12:00 PM on Friday, December 19.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 20, borderRadius: 16 }}>
                    <h4 style={{ color: "#3b82f6", fontSize: "1.05rem", fontWeight: 800, marginBottom: 8 }}>
                      📍 Venue Security & Parking
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                      Dedicated parking grounds and multi-agency security personnel will be stationed along all transit corridors.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 20, borderRadius: 16 }}>
                    <h4 style={{ color: "var(--primary-gold)", fontSize: "1.05rem", fontWeight: 800, marginBottom: 8 }}>
                      🌐 Out-of-State & International
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                      Airport pickup coordination and hotel affiliate rates are available for attendees travelling from other regions.
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: 28 }}>
                  <a
                    href="/assets/images/1mmw_2025bus_route.jpg"
                    download="1mmw_2025_bus_route.jpg"
                    className="btn-primary"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <Download size={16} />
                    <span>Download Full Resolution Route Map</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
}
