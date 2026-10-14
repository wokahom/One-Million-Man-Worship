"use client";

import Marquee from "@/components/Marquee";
import MediaAutoplay from "@/components/MediaAutoplay";
import MinisterSlider from "@/components/MinisterSlider";
import Countdown from "@/components/Countdown";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function AdsClient() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: 0,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          bottom: 40,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 30, paddingBottom: 60, position: "relative", zIndex: 1 }}>
        {/* Intro Video & Flyer Autoplay */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          <MediaAutoplay
            imageSrc="/assets/images/1mmw_flyer3_1.jpg"
            videoSrc="https://res.cloudinary.com/dtemxjmt6/video/upload/v1764531906/1mmw_2025_ads_video3_1_bual4w.mov"
          />
        </motion.section>

        {/* Live Countdown to Event */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          <Countdown targetDate="December 19, 2025 16:00:00" />
        </motion.section>

        {/* Ministers and Artistes Slider */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 50 }}
        >
          <MinisterSlider />
        </motion.section>

        {/* Call To Action Banner */}
        <motion.section
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, type: "spring", damping: 25, stiffness: 240 }}
          style={{
            background: "var(--hero-card-1-bg)",
            border: "1px solid var(--hero-card-1-border)",
            borderRadius: 24,
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: 850,
            margin: "0 auto",
            boxShadow: "var(--section-card-shadow)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.15)",
              color: "var(--primary-red)",
              padding: "4px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            <Sparkles size={16} /> Be Part Of History
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              marginBottom: 14,
            }}
          >
            Represent Your State, City & Nation
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Generate your official badge and invite your church, fellowship, and
            community to this grand convocation of praise.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/avatar" className="btn-primary">
                <span>Create Your 2025 Avatar</span>
                <ArrowRight size={17} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/live" className="btn-secondary">
                <span>Watch Previous Broadcasts</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
