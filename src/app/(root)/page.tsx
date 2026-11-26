"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Marquee from "@/components/Marquee";
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
  Bus,
  Clock,
  PhoneCall,
  Award,
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
  const [activeTab, setActiveTab] = useState<"zones" | "gates" | "travel">("zones");
  const [showBannerModal, setShowBannerModal] = useState(false);

  useEffect(() => {
    // Record page view in Firestore if configured
    if (db) {
      addDoc(collection(db, "visits"), {
        page: "home-2026",
        timestamp: serverTimestamp(),
      }).catch(() => { });
    }
  }, []);

  const stats = [
    { number: "DEC 18 – 20, 2026", label: "3 Days Of Glory", icon: <Calendar size={16} color="var(--primary-gold)" /> },
    { number: "1,000,000+", label: "Believers Gathering", icon: <Users size={16} color="var(--primary-red)" /> },
    { number: "4:00 PM (GMT+1)", label: "Daily Start Time", icon: <Clock size={16} color="#3b82f6" /> },
    { number: "ACCESS FREE", label: "Everyone Welcome", icon: <ShieldCheck size={16} color="#10b981" /> },
  ];

  const transitZones = [
    {
      id: "zone1",
      title: "Zone 1: Port Harcourt City / Old GRA / Town",
      pickup: "Isaac Boro Park (Main Gate) & Mile 1 Flyover Hub",
      time: "Shuttles run from 1:00 PM daily",
      contact: "0803 000 1121",
    },
    {
      id: "zone2",
      title: "Zone 2: Obio/Akpor / Rumuokoro / Choba",
      pickup: "Rumuokoro Roundabout (Park Side) & Choba Junction (Uniport Gate)",
      time: "Shuttles run from 1:00 PM daily",
      contact: "0803 000 1122",
    },
    {
      id: "zone3",
      title: "Zone 3: Eleme / Oyigbo / Refinery Corridor",
      pickup: "Eleme Junction (Aba Road) & Trailer Park Junction",
      time: "Shuttles run from 12:30 PM daily",
      contact: "0803 000 1123",
    },
    {
      id: "zone4",
      title: "Zone 4: Ikwerre / Airport Road / Igwuruta",
      pickup: "Airport Roundabout & Igwuruta Central Junction",
      time: "Shuttles run from 1:00 PM daily",
      contact: "0803 000 1124",
    },
    {
      id: "zone5",
      title: "Zone 5: Diobu / Mile 3 / UST / Agip",
      pickup: "Rivers State University Main Gate & Agip Flyover Transit Point",
      time: "Shuttles run from 1:15 PM daily",
      contact: "0803 000 1125",
    },
    {
      id: "zone6",
      title: "Zone 6: Trans-Amadi / Peter Odili / Woji",
      pickup: "Slaughter Junction Transit Park & Peter Odili Roundabout",
      time: "Shuttles run from 1:30 PM daily",
      contact: "0803 000 1126",
    },
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
          style={{ textAlign: "center", marginBottom: 35 }}
        >
          {/* 2026 Live Badge */}
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
              padding: "8px 20px",
              boxShadow: "0 4px 20px rgba(229, 57, 53, 0.18)",
              marginBottom: 18,
            }}
            className="badge-shimmer"
          >
            <span className="pulse-dot" />
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              4th Edition • 3 Days, One God, One Sound, One Stage
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeIn}
            custom={1}
            className="section-title"
            style={{
              fontSize: "clamp(2.3rem, 5.8vw, 4rem)",
              lineHeight: 1.15,
              maxWidth: 960,
              margin: "0 auto 12px",
              fontWeight: 900,
            }}
          >
            ONE MILLION MAN WORSHIP 2026
          </motion.h1>

          {/* Theme Banner Callout */}
          <motion.div
            variants={fadeIn}
            custom={2}
            style={{
              display: "inline-block",
              background: "rgba(229, 57, 53, 0.15)",
              border: "1px solid rgba(229, 57, 53, 0.35)",
              color: "var(--primary-red)",
              padding: "6px 20px",
              borderRadius: 30,
              fontSize: "1.05rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              marginBottom: 18,
            }}
          >
            THEME: JESUS
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn}
            custom={3}
            className="section-subtitle"
            style={{
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              maxWidth: 780,
              margin: "0 auto 28px",
              lineHeight: 1.65,
            }}
          >
            A sacred convocation of over one million hearts gathering across cities and nations
            to lift up the highest praise and adoration to King Jesus with one voice.
            <br />
            <strong>December 18 – 20, 2026</strong> • Yakubu Gowon Stadium, Elekahia, Port Harcourt.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            variants={fadeIn}
            custom={4}
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
                <span>Create 2026 Avatar</span>
                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/volunteer" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                <Users size={18} color="var(--primary-gold)" />
                <span>Volunteer for 2026</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/live" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                <Tv size={18} />
                <span>2026 Live Broadcast</span>
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
            custom={5}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginBottom: 35,
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
            2026 OFFICIAL EVENT BANNER SHOWCASE
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 55 }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid var(--border-glow)",
              boxShadow: "0 20px 60px rgba(229, 57, 53, 0.25)",
              background: "#0a0a0d",
              aspectRatio: "16 / 9",
              cursor: "pointer",
            }}
            onClick={() => setShowBannerModal(true)}
          >
            <Image
              src="/assets/2026/1MMW 2026 MAIN TV.png"
              alt="One Million Man Worship 2026 Official Banner"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: "contain" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(8px)",
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontSize: "0.8rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Sparkles size={14} color="var(--primary-gold)" />
              <span>Click to Expand Official 2026 Poster</span>
            </div>
          </div>
        </motion.section>

        {/* =========================================
            LIVE 2026 COUNTDOWN
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 65 }}
        >
          <Countdown
            targetDate="December 18, 2026 16:00:00"
            title="Countdown to One Million Man Worship 2026"
          />
        </motion.section>

        {/* =========================================
            2026 MINISTERS & ARTISTES SLIDER
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 70 }}
        >
          <MinisterSlider />
        </motion.section>

        {/* =========================================
            HERO ACTION CARDS (KEY 2026 PILLARS)
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
              GET INVOLVED & PREPARE FOR 2026
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 10 }}>
              Connect with the movement, generate your custom badge, and join over a million voices.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: 24,
            }}
          >
            {/* Card 1: Avatar Generator 2026 */}
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
                    <Sparkles size={13} /> Official 2026 Badge Studio
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-red)", fontWeight: 700 }}>
                    #1MMW2026
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
                  Create &quot;I&apos;ll Be Attending&quot; Avatar
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Announce your presence at the 4th edition! Upload your photograph, scale and position it
                  seamlessly inside the official 2026 frame, and share directly to WhatsApp and social media.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-red)" />
                    <span>Official 2026 High-Res 2100px Artwork</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-red)" />
                    <span>Direct PNG Download & WhatsApp 1-Click Share</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/avatar" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Launch 2026 Avatar Studio</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Card 2: Volunteer Registration Portal */}
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
                    <Users size={13} /> 2026 Workforce
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#3b82f6", fontWeight: 700 }}>
                    Open Now
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
                  Volunteer For 1MMW 2026
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Serve in the Lord&apos;s house during the 3-day convocation. Departments include Protocol,
                  Ushering, Choir, Media & Tech, Medical, Security, Logistics, and Prayer team.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="#3b82f6" />
                    <span>8 Specialized Volunteer Departments</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="#3b82f6" />
                    <span>Pre-Event Training & Official Accreditation</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/volunteer" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Register As A Volunteer</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Card 3: 2026 Live Broadcast & Streams */}
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
                    <Radio size={13} /> Global Broadcast
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-gold)", fontWeight: 700 }}>
                    3 Days Live
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
                  2026 Live Broadcast
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Join the global streaming audience from anywhere in the world. Watch multi-camera HD broadcasts
                  across YouTube, Facebook, and satellite feeds for all 3 days of worship.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-gold)" />
                    <span>Day 1, Day 2 & Day 3 Full Coverage</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} color="var(--primary-gold)" />
                    <span>Watch Past Archives & Inspiring Moments</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/live" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Open Live Portal</span>
                  <Tv size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            ABOUT / 2026 4TH EDITION HIGHLIGHTS
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
            {/* Visual Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border-glass)",
                boxShadow: "var(--card-shadow)",
                aspectRatio: "1 / 1",
              }}
            >
              <Image
                src="/assets/2026/1MMW 2026 MAIN SQ.png"
                alt="One Million Man Worship 2026 Convocation"
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
                <span>Yakubu Gowon Stadium, Port Harcourt</span>
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
                <Award size={16} /> 4th Edition • Jesus Convocation
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
                3 DAYS • ONE GOD • ONE SOUND • ONE STAGE
              </h2>

              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                One Million Man Worship returns for its historic 4th edition from <strong>December 18 to 20, 2026</strong>.
                For three continuous days, believers from every tribe, denomination, and city will unite at
                Yakubu Gowon Stadium, Port Harcourt, lifting up the unmatched name of King Jesus.
              </p>

              {/* 3 Pillars */}
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
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Pure Uncompromised Adoration:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2, margin: 0 }}>
                      Transcending all barriers and denomination walls in true prophetic spiritual adoration.
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
                      An atmosphere charged with God&apos;s manifest presence bringing salvation, healings, and national revival.
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
                  <span>Read Documented Testimonies</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =========================================
            TRANSPORTATION & LOGISTICS (PROPOSAL ITEM 7)
            ========================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 70 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
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
              <Bus size={14} /> Transportation & Logistics Hub
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              GETTING TO YAKUBU GOWON STADIUM
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 20 }}>
              Convenient transit arrangements, designated pickup points across 6 Port Harcourt corridors, and gate access.
            </p>

            {/* Interactive Toggle Tabs */}
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
                onClick={() => setActiveTab("zones")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: activeTab === "zones" ? "var(--primary-red)" : "transparent",
                  color: activeTab === "zones" ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.25s ease",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Bus Pickup Zones
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("gates")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: activeTab === "gates" ? "var(--primary-red)" : "transparent",
                  color: activeTab === "gates" ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.25s ease",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Stadium & Parking
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("travel")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: activeTab === "travel" ? "var(--primary-red)" : "transparent",
                  color: activeTab === "travel" ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.25s ease",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Out-of-State / Airport
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "zones" && (
              <motion.div
                key="zones"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: 1080,
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 16,
                }}
              >
                {transitZones.map((zone) => (
                  <div
                    key={zone.id}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: 18,
                      padding: "20px 22px",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Bus size={18} color="var(--primary-red)" />
                      <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                        {zone.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "6px 0 10px", lineHeight: 1.5 }}>
                      <strong>Pickup:</strong> {zone.pickup}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-secondary)", borderTop: "1px solid var(--border-glass)", paddingTop: 8 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={12} color="var(--primary-gold)" /> {zone.time}
                      </span>
                      <a
                        href={`tel:${zone.contact.replace(/\s+/g, "")}`}
                        style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--primary-red)", fontWeight: 700 }}
                      >
                        <PhoneCall size={12} /> Contact Coordinator
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "gates" && (
              <motion.div
                key="gates"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: 900,
                  margin: "0 auto",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 22,
                  padding: "32px 28px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "var(--primary-red)", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      🏟️ Stadium Gate Access
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      Gates 1 & 2 are designated for General Believers. Gate 3 is reserved for Accredited Ministers & Artistes. Gate 4 provides access for Protocol, Volunteers, and Technical Staff.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "#3b82f6", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      🅿️ Parking Arrangements
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      Dedicated bus staging grounds are located along the stadium bypass. Private vehicles will be guided into secure designated parking zones under Nigerian Police & civil security surveillance.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "var(--primary-gold)", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      🚑 Medical & Emergency
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      Fully equipped Mobile Medical Clinics and Red Cross emergency teams will be positioned at all entry quadrants with ambulance lanes active 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "travel" && (
              <motion.div
                key="travel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: 900,
                  margin: "0 auto",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 22,
                  padding: "32px 28px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "#3b82f6", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      ✈️ Airport Reception Desk
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      An official 1MMW Protocol Desk will operate at Port Harcourt International Airport (Omagwa) from Wednesday, December 16, assisting arriving delegates and international guests.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "var(--primary-gold)", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      🏨 Partner Hotels & Lodging
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      Discounted affiliate hotel rates are negotiated in Old GRA, Stadium Road, and Elekahia for convocation delegates. Reach out to our hospitality desk for reservations.
                    </p>
                  </div>
                  <div style={{ background: "var(--bg-card-secondary)", padding: 18, borderRadius: 14 }}>
                    <h4 style={{ color: "var(--primary-red)", fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>
                      📞 Hospitality Hotline
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>
                      For specialized group transportation, interstate delegations, or accommodation booking assistance, email <strong>team@onemillionmanworship.com</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>

      {/* Banner Lightbox Modal */}
      <AnimatePresence>
        {showBannerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBannerModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 1000,
                width: "100%",
                background: "var(--bg-card)",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border-glow)",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
                <Image
                  src="/assets/2026/1MMW 2026 MAIN TV.png"
                  alt="One Million Man Worship 2026 Master Banner"
                  fill
                  sizes="1000px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--bg-card-secondary)",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    One Million Man Worship 2026 • 4th Edition
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    December 18 – 20, 2026 • Yakubu Gowon Stadium, Elekahia, Port Harcourt
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="btn-primary"
                  style={{ padding: "8px 20px" }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
