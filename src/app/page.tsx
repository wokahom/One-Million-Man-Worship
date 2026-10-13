"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import MediaAutoplay from "@/components/MediaAutoplay";
import {
  Sparkles,
  ArrowRight,
  Tv,
  HeartHandshake,
  Users,
  Flame,
  Radio,
  Share2,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HomePage() {
  useEffect(() => {
    // Record page view in Firestore if configured
    if (db) {
      addDoc(collection(db, "visits"), {
        page: "home",
        timestamp: serverTimestamp(),
      }).catch(() => {});
    }
  }, []);

  return (
    <div>
      {/* Running Marquee Ticker */}
      <Marquee />

      <div className="container" style={{ paddingTop: 30 }}>
        {/* Main Flyer & Video Showcase */}
        <section style={{ marginBottom: 50 }}>
          <MediaAutoplay
            imageSrc="/assets/images/1mmw_flyer3_1.jpg"
            videoSrc="https://res.cloudinary.com/dtemxjmt6/video/upload/v1764531906/1mmw_2025_ads_video3_1_bual4w.mov"
          />
        </section>

        {/* Hero Action Cards */}
        <section style={{ marginBottom: 60 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {/* Card 1: Avatar Generator */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(229, 57, 53, 0.15) 0%, rgba(20, 20, 26, 0.95) 100%)",
                border: "1px solid rgba(229, 57, 53, 0.3)",
                borderRadius: 18,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(229, 57, 53, 0.2)",
                    color: "#f87171",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  <Sparkles size={14} /> Official 2025 Avatar
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: 10,
                  }}
                >
                  Create Your Custom Avatar
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Join millions across the globe in one visual statement of
                  worship. Upload your photo, reposition, scale, and download
                  instantly.
                </p>
              </div>
              <Link href="/avatar" className="btn-primary" style={{ width: "fit-content" }}>
                <span>Launch Avatar Studio</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2: Live Experience */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(20, 20, 26, 0.95) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.25)",
                borderRadius: 18,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(59, 130, 246, 0.2)",
                    color: "#60a5fa",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  <Radio size={14} /> Broadcast & Archive
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: 10,
                  }}
                >
                  Watch Previous Editions
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Relive glorious atmospheres from past editions of One Million
                  Man Worship. Stream full video recordings and minister sessions.
                </p>
              </div>
              <Link href="/live" className="btn-secondary" style={{ width: "fit-content" }}>
                <span>Stream Recordings</span>
                <Tv size={16} />
              </Link>
            </div>

            {/* Card 3: Experience Jesus & Testimonies */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(20, 20, 26, 0.95) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                borderRadius: 18,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(245, 158, 11, 0.2)",
                    color: "#fbbf24",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  <Flame size={14} /> Testimonies of God
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: 10,
                  }}
                >
                  Share Your Miracles
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  What has the Lord done in your life through 1MMW? Share your
                  story to inspire faith and glorify God worldwide.
                </p>
              </div>
              <Link href="/testimony" className="btn-secondary" style={{ width: "fit-content" }}>
                <span>Submit Testimony</span>
                <HeartHandshake size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          style={{
            background: "rgba(18, 18, 24, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
            padding: "48px 36px",
            marginBottom: 70,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
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
            {/* Image */}
            <div
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
                aspectRatio: "16 / 10",
              }}
            >
              <Image
                src="/assets/images/1mmw_banner2.jpg"
                alt="One Million Man Worship Gathering"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Text */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#f87171",
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
                  color: "#ffffff",
                  lineHeight: 1.2,
                  marginBottom: 18,
                }}
              >
                ONE MILLION MAN WORSHIP
              </h2>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                One Million Man Worship is a global worship movement that gathers
                believers from different cities, nations, and denominations for
                one purpose — <strong>to lift up the name of Jesus with one voice</strong>.
              </p>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Through heartfelt praise, deep worship, intercessory prayer, and
                anointed ministrations, One Million Man Worship creates an
                atmosphere where men and women encounter God&apos;s tangible presence
                in a transformative and life-changing encounter.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/about" className="btn-primary">
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/avatar" className="btn-secondary">
                  <span>Create 2025 Avatar</span>
                  <Sparkles size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Route / Location Banner */}
        <section style={{ marginBottom: 60, textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.6)",
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
          </div>
        </section>
      </div>
    </div>
  );
}
