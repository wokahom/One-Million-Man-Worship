"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Mic2 } from "lucide-react";
import { motion } from "motion/react";

const ministers = [
  { id: "artist1", src: "/assets/slider1/artist1.jpg", title: "Minister / Artiste" },
  { id: "mins1", src: "/assets/slider1/mins1.jpg", title: "Gospel Artiste" },
  { id: "artist2", src: "/assets/slider1/artist2.jpg", title: "Worship Leader" },
  { id: "mins2", src: "/assets/slider1/mins2.jpg", title: "Minister" },
  { id: "artist3", src: "/assets/slider1/artist3.jpg", title: "Worship Leader" },
  { id: "mins3", src: "/assets/slider1/mins3.jpg", title: "Gospel Artiste" },
  { id: "artist4", src: "/assets/slider1/artist4.jpg", title: "Minister" },
  { id: "mins4", src: "/assets/slider1/mins4.jpg", title: "Worship Leader" },
  { id: "artist5", src: "/assets/slider1/artist5.jpg", title: "Gospel Artiste" },
  { id: "mins5", src: "/assets/slider1/mins5.jpg", title: "Minister" },
  { id: "artist6", src: "/assets/slider1/artist6.jpg", title: "Worship Leader" },
  { id: "mins6", src: "/assets/slider1/mins6.jpg", title: "Gospel Artiste" },
  { id: "artist7", src: "/assets/slider1/artist7.jpg", title: "Minister" },
  { id: "mins7", src: "/assets/slider1/mins7.jpg", title: "Worship Leader" },
  { id: "artist8", src: "/assets/slider1/artist8.jpg", title: "Gospel Artiste" },
  { id: "mins8", src: "/assets/slider1/mins8.jpg", title: "Minister" },
  { id: "artist9", src: "/assets/slider1/artist9.jpg", title: "Worship Leader" },
  { id: "artist10", src: "/assets/slider1/artist10.jpg", title: "Gospel Artiste" },
];

export default function MinisterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ministers.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ministers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ministers.length);
  };

  return (
    <div
      style={{
        margin: "40px auto",
        position: "relative",
        maxWidth: 1200,
        padding: "0 20px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#f87171",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            <Mic2 size={16} /> Power Packed Lineup
          </div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            Anointed Ministers & Artistes
          </h3>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <motion.button
            type="button"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 350 }}
            aria-label="Previous Minister"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--bg-card-secondary)",
              border: "1px solid var(--border-glass)",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            type="button"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 350 }}
            aria-label="Next Minister"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--bg-card-secondary)",
              border: "1px solid var(--border-glass)",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          background: "var(--bg-slider)",
          padding: "16px 0",
          border: "1px solid var(--border-glass)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 16,
            transform: `translateX(-${currentIndex * 260}px)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            paddingLeft: 16,
          }}
        >
          {ministers.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                flexShrink: 0,
                width: 240,
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                boxShadow: "var(--card-shadow)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 280,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="240px"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    background: "rgba(229, 57, 53, 0.85)",
                    padding: "3px 10px",
                    borderRadius: 12,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

