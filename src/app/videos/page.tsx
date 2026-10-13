"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import { Play, Video as VideoIcon, Sparkles } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";

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
    <div>
      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Main Video Screen */}
          <div
            style={{
              background: "rgba(18, 18, 24, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 22,
              padding: 16,
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 57, 53, 0.15)",
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
                  color: "#ffffff",
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
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#ef4444",
                  }}
                >
                  <YoutubeIcon size={16} /> Featured Ministration
                </span>
              </div>
            </div>
          </div>

          {/* Video List */}
          <div
            style={{
              background: "rgba(18, 18, 24, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 22,
              padding: 20,
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <VideoIcon size={18} color="#ef4444" />
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#ffffff",
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
                  <div
                    key={item.id}
                    onClick={() => selectVideo(item.id)}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: 10,
                      borderRadius: 14,
                      background: isActive
                        ? "rgba(229, 57, 53, 0.18)"
                        : "rgba(255, 255, 255, 0.03)",
                      border: isActive
                        ? "1px solid rgba(229, 57, 53, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.06)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
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
                            background: isActive ? "#ef4444" : "rgba(0,0,0,0.7)",
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
                          color: isActive ? "#f87171" : "#94a3b8",
                          textTransform: "uppercase",
                        }}
                      >
                        Clip #{idx + 1}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: isActive ? "#ffffff" : "#cbd5e1",
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
