"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import { Tv, Play, Radio } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";

interface VideoItem {
  id: string;
  title: string;
  defaultTitle: string;
}

const initialVideos: VideoItem[] = [
  {
    id: "TVxOqNhZbUA",
    title: "One Million Man Worship 2024 - Full Live Recording",
    defaultTitle: "1MMW 2024 Live Recording - Session 1",
  },
  {
    id: "iSAgS4oRAHQ",
    title: "One Million Man Worship - Glorious Worship Atmosphere",
    defaultTitle: "1MMW 2024 Live Recording - Session 2",
  },
  {
    id: "kAV4E-ayrXo",
    title: "One Million Man Worship - Prophetic Praises",
    defaultTitle: "1MMW 2024 Live Recording - Session 3",
  },
];

export default function LivePage() {
  const [activeVideoId, setActiveVideoId] = useState(initialVideos[0].id);
  const [videoList, setVideoList] = useState(initialVideos);
  const [isFading, setIsFading] = useState(false);

  // Fetch oEmbed titles for YouTube videos
  useEffect(() => {
    initialVideos.forEach((v, index) => {
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
        .catch(() => {
          // Keep default title if network blocked
        });
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
    <div>
      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <Radio size={16} /> Broadcast Archive
          </span>
          <h1 className="section-title">FULL LIVE RECORD OF 1MMW 2024</h1>
          <p className="section-subtitle">
            Relive the glory, intense praise, and supernatural power captured
            live during the global convocation.
          </p>
        </div>

        {/* Video Player Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Main Embedded Player */}
          <div
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
                  <YoutubeIcon size={16} /> Official Broadcast
                </span>
                <span>•</span>
                <span>Port Harcourt, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Playlist Selector Sidebar */}
          <div
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
                }}
              >
                Available Sessions ({videoList.length})
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {videoList.map((item, idx) => {
                const isActive = item.id === activeVideoId;
                return (
                  <div
                    key={item.id}
                    onClick={() => selectVideo(item.id)}
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
                      transition: "all 0.25s ease",
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
                        Session {idx + 1}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
