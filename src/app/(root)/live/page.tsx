"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import Countdown from "@/components/Countdown";
import {
  Tv,
  Play,
  Radio,
  Calendar,
  Clock,
  Heart,
} from "lucide-react";
import { YoutubeIcon, FacebookIcon } from "@/components/Icons";
import { motion } from "motion/react";

interface VideoItem {
  id: string;
  title: string;
  defaultTitle: string;
  year: string;
  session: string;
}

const broadcastArchive: VideoItem[] = [
  {
    id: "TVxOqNhZbUA",
    title: "One Million Man Worship 2024 - Full Live Recording (Part 1)",
    defaultTitle: "1MMW 2024 Live Recording - Session 1",
    year: "2024",
    session: "Session 1 • Mass Gathering",
  },
  {
    id: "iSAgS4oRAHQ",
    title: "One Million Man Worship - Glorious Worship Atmosphere & Healings",
    defaultTitle: "1MMW 2024 Live Recording - Session 2",
    year: "2024",
    session: "Session 2 • Anointed Praise",
  },
  {
    id: "kAV4E-ayrXo",
    title: "One Million Man Worship - Prophetic Praises & Ministers Consecration",
    defaultTitle: "1MMW 2024 Live Recording - Session 3",
    year: "2024",
    session: "Session 3 • Prophetic Overflow",
  },
];

const schedule2026 = [
  {
    day: "DAY 1",
    date: "Friday, December 18, 2026",
    time: "4:00 PM GMT+1",
    theme: "Opening Night of Glory & Foundation Praise",
    status: "Upcoming Live Stream",
    highlight: "Dunsin Oyekan, Dr. Panam Percy Paul, Wisdom K, Mass Choir",
  },
  {
    day: "DAY 2",
    date: "Saturday, December 19, 2026",
    time: "4:00 PM GMT+1",
    theme: "Prophetic Adoration & Atmosphere of Miracles",
    status: "Upcoming Live Stream",
    highlight: "Tye Tribbett, Min. GUC, Chioma Jesus, Godswill Oyor, Apostle Zilly Aggrey",
  },
  {
    day: "DAY 3",
    date: "Sunday, December 20, 2026",
    time: "4:00 PM GMT+1",
    theme: "Grand Consecration, Apostolic Impartation & National Revival",
    status: "Upcoming Live Stream",
    highlight: "Dr. Paul & Dr. Becky Paul-Enenche, Rev. Chris Ugoh, Pastor George Izunwa",
  },
];

export default function LivePage() {
  const [activeVideoId, setActiveVideoId] = useState(broadcastArchive[0].id);
  const [videoList, setVideoList] = useState(broadcastArchive);
  const [isFading, setIsFading] = useState(false);

  // Fetch oEmbed titles for YouTube videos
  useEffect(() => {
    broadcastArchive.forEach((v, index) => {
      fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${v.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.title) {
            setVideoList((prev) =>
              prev.map((item, i) =>
                i === index ? { ...item, title: data.title } : item
              )
            );
          }
        })
        .catch(() => { });
    });
  }, []);

  const selectVideo = (id: string) => {
    if (id === activeVideoId) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveVideoId(id);
      setIsFading(false);
    }, 280);
  };

  const activeVideo = videoList.find((v) => v.id === activeVideoId);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.15) 0%, transparent 70%)",
          top: -100,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
          bottom: 40,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: "0.85rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <Radio size={16} /> 2026 Global Live Broadcast Center
          </span>
          <h1 className="section-title">ONE MILLION MAN WORSHIP LIVE</h1>
          <p className="section-subtitle">
            Join believers streaming across nations for <strong>3 Days of glory, intense praise, and supernatural power</strong>.
            December 18 – 20, 2026 • Live from Yakubu Gowon Stadium, Port Harcourt.
          </p>
        </motion.div>

        {/* 2026 Broadcast Countdown Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <Countdown
            targetDate="December 18, 2026 16:00:00"
            title="Countdown to 2026 Live Broadcast (Day 1)"
          />
        </motion.section>

        {/* 2026 3-Day Program Schedule */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 55 }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span
              style={{
                fontSize: "0.82rem",
                color: "var(--primary-gold)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              3 Days • One God • One Sound • One Stage
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: "4px 0 10px",
              }}
            >
              2026 Streaming Schedule
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: 20,
            }}
          >
            {schedule2026.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "var(--card-shadow)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span
                      style={{
                        background: "var(--primary-red)",
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: "0.78rem",
                        padding: "4px 12px",
                        borderRadius: 20,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {s.day}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--primary-gold)", fontWeight: 700 }}>
                      {s.status}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.theme}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "14px 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={14} color="var(--primary-gold)" />
                      <span>{s.date}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={14} color="#3b82f6" />
                      <span>{s.time} (Gates Open 12:00 PM)</span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    <strong>Key Vessels:</strong> {s.highlight}
                  </p>
                </div>

                <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border-glass)" }}>
                  <a
                    href="https://youtube.com/@onemillionmanworship?si=D2MsxAavJ1DCJQI1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "0.85rem" }}
                  >
                    <YoutubeIcon size={16} /> Set Reminder On YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Video Player & Broadcast Archives Layout */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <span
            style={{
              fontSize: "0.82rem",
              color: "var(--primary-red)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Video Archive & Replays
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              margin: "4px 0 10px",
            }}
          >
            Watch Full Previous Convocation Recordings
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", maxWidth: 700, margin: "0 auto" }}>
            While we count down to the 2026 edition, relive the high praises, prophecy, and miraculous atmospheres recorded live.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Main Embedded Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 22,
              padding: 16,
              boxShadow: "var(--section-card-shadow)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 16,
                overflow: "hidden",
                background: "#000",
                opacity: isFading ? 0 : 1,
                transition: "opacity 0.28s ease",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title={activeVideo?.title || "1MMW Video Broadcast"}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div style={{ padding: "16px 8px 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    background: "rgba(229, 57, 53, 0.15)",
                    color: "var(--primary-red)",
                    padding: "3px 10px",
                    borderRadius: 12,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {activeVideo?.session}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  Port Harcourt, Nigeria
                </span>
              </div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.4,
                  margin: "6px 0",
                }}
              >
                {activeVideo?.title}
              </h2>

              {/* Streaming channels strip */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 14,
                  flexWrap: "wrap",
                  alignItems: "center",
                  borderTop: "1px solid var(--border-glass)",
                  paddingTop: 12,
                }}
              >
                <a
                  href="https://youtube.com/@onemillionmanworship?si=D2MsxAavJ1DCJQI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  <YoutubeIcon size={16} /> Official YouTube Channel
                </a>
                <span style={{ color: "var(--border-glass)" }}>|</span>
                <a
                  href="https://https://www.facebook.com/onemillionmanworshipph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.85rem",
                    color: "#3b82f6",
                    fontWeight: 700,
                  }}
                >
                  <FacebookIcon size={16} /> Facebook Live
                </a>
                <span style={{ color: "var(--border-glass)" }}>|</span>
                <Link
                  href="/prayer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.85rem",
                    color: "var(--primary-gold)",
                    fontWeight: 700,
                  }}
                >
                  <Heart size={14} /> Send Prayer Request
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Playlist Selector Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 22,
              padding: 20,
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border-glass)",
              }}
            >
              <Tv size={18} color="var(--primary-red)" />
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Broadcast Sessions ({videoList.length})
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {videoList.map((item) => {
                const isActive = item.id === activeVideoId;
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => selectVideo(item.id)}
                    whileHover={{ x: 6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: 10,
                      borderRadius: 14,
                      background: isActive
                        ? "rgba(229, 57, 53, 0.15)"
                        : "var(--bg-card-secondary)",
                      border: isActive
                        ? "1px solid var(--primary-red)"
                        : "1px solid var(--border-subtle)",
                      cursor: "pointer",
                      boxShadow: isActive ? "0 4px 16px rgba(229, 57, 53, 0.15)" : "none",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 110,
                        height: 68,
                        borderRadius: 8,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                        alt={item.title}
                        fill
                        sizes="110px"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background: isActive ? "var(--primary-red)" : "rgba(0,0,0,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                          }}
                        >
                          <Play size={12} fill="#fff" />
                        </div>
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: isActive ? "var(--primary-red)" : "var(--text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.session}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                          marginTop: 3,
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Viewing Centers / Church Broadcast Note */}
            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 14,
                background: "var(--bg-card-secondary)",
                border: "1px solid var(--border-glass)",
              }}
            >
              <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 6px" }}>
                📡 Hosting A Viewing Center?
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                Churches, fellowships, and youth groups setting up public viewing halls or satellite feeds for 1MMW 2026 can contact technical support at <strong>info@onemillionmanworship.com</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
