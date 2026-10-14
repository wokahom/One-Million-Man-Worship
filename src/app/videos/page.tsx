"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import { Play, Video as VideoIcon } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { motion } from "motion/react";

interface VideoMoment {
  id: string;
  title: string;
  defaultTitle: string;
}

const initialMoments: VideoMoment[] = [
  {
    id: "vLguT07FH8M",
    title: "1MMW Powerful Worship Moment 1",
    defaultTitle: "Inspiring Moment 1",
  },
  {
    id: "76SDYB5mZ24",
    title: "1MMW Anointed Praise Session 2",
    defaultTitle: "Inspiring Moment 2",
  },
  {
    id: "OwknAfw_kCE",
    title: "1MMW Deep Worship Intercession 3",
    defaultTitle: "Inspiring Moment 3",
  },
  {
    id: "0mxeeKXWFpA",
    title: "1MMW High Praise & Celebration 4",
    defaultTitle: "Inspiring Moment 4",
  },
  {
    id: "mNKFExzXma8",
    title: "1MMW Congregational Worship 5",
    defaultTitle: "Inspiring Moment 5",
  },
  {
    id: "CiOakZASGQE",
    title: "1MMW Divine Encounter Session 6",
    defaultTitle: "Inspiring Moment 6",
  },
];

export default function VideosPage() {
  const [activeVideoId, setActiveVideoId] = useState(initialMoments[0].id);
  const [videoList, setVideoList] = useState(initialMoments);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    initialMoments.forEach((v, index) => {
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
        .catch(() => {});
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
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: -100,
          right: -100,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)",
          bottom: 20,
          left: -120,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
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
              gap: 6,
              background: "rgba(229, 57, 53, 0.15)",
              color: "#f87171",
              border: "1px solid rgba(229, 57, 53, 0.3)",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <VideoIcon size={16} /> Highlights & Ministrations
          </span>
          <h1 className="section-title">INSPIRING MOMENTS AT 1MMW 2025</h1>
          <p className="section-subtitle">
            Relive profound worship clips, prophetic decrees, and praise
            highlights that marked our sacred gathering.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Main Video Screen */}
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
                title={activeVideo?.title || "1MMW Inspiring Moment"}
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
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.4,
                }}
              >
                {activeVideo?.title}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 10,
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    color: "var(--primary-red)",
                  }}
                >
                  <YoutubeIcon size={16} /> Featured Ministration
                </span>
              </div>
            </div>
          </motion.div>

          {/* Video List */}
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
              <VideoIcon size={18} color="var(--primary-red)" />
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                Inspiring Videos ({videoList.length})
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxHeight: 520,
                overflowY: "auto",
                paddingRight: 4,
              }}
            >
              {videoList.map((item, idx) => {
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
                        width: 100,
                        height: 62,
                        borderRadius: 8,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                        alt={item.title}
                        fill
                        sizes="100px"
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
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: isActive ? "var(--primary-red)" : "rgba(0,0,0,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                          }}
                        >
                          <Play size={10} fill="#fff" />
                        </div>
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: isActive ? "var(--primary-red)" : "var(--text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        Clip #{idx + 1}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                          marginTop: 2,
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
