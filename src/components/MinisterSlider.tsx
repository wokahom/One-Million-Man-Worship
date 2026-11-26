"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Mic2, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Minister {
  id: string;
  src: string;
  name: string;
  role: string;
  tag: string;
}

export const ministers2026: Minister[] = [
  {
    id: "paul-enenche",
    src: "/assets/2026/PAUL.png",
    name: "Dr. Pst. Paul & Dr. Mrs. Becky Paul-Enenche",
    role: "Senior Pastors, Dunamis International Gospel Centre",
    tag: "Host & General Overseer",
  },
  {
    id: "tye-tribbett",
    src: "/assets/2026/TYE.png",
    name: "Tye Tribbett",
    role: "Grammy Award-Winning Gospel Artiste",
    tag: "International Guest Artiste",
  },
  {
    id: "dunsin-oyekan",
    src: "/assets/2026/DUN TEAM.png",
    name: "Dunsin Oyekan, Wisdom K & God's Oracle",
    role: "Prophetic Revivalist & Psalmists",
    tag: "Worship Ministers",
  },
  {
    id: "min-guc",
    src: "/assets/2026/TEA GUC.png",
    name: "Min. GUC, Owie Abutu & Faith Tekpo",
    role: "Anointed Gospel Artistes & Psalmists",
    tag: "Worship Ministers",
  },
  {
    id: "chioma-jesus",
    src: "/assets/2026/TEAM CHIO.png",
    name: "Chioma Jesus, Victor Sam & Min. Ale",
    role: "Prophetic Praise & Adoration Ministers",
    tag: "Praise & Worship",
  },
  {
    id: "zilly-aggrey",
    src: "/assets/2026/ZILLY.png",
    name: "Apostle Zilly Aggrey",
    role: "General Overseer, Royal House of Grace",
    tag: "Guest Minister",
  },
  {
    id: "chris-ugoh",
    src: "/assets/2026/PAS.png",
    name: "Rev. Chris Ugoh",
    role: "Lead Pastor, The King's Assembly",
    tag: "Guest Minister",
  },
  {
    id: "george-izunwa",
    src: "/assets/2026/DAD.png",
    name: "Pastor George Izunwa",
    role: "Lead Pastor, Gateway International Church",
    tag: "Guest Minister",
  },
  {
    id: "panam-percy-paul",
    src: "/assets/2026/valen team.png",
    name: "Panam Percy Paul, DK Vallen & African Joy",
    role: "Legendary Gospel Pioneer & Artistes",
    tag: "Worship Ministers",
  },
  {
    id: "godswill-oyor",
    src: "/assets/2026/TEAM GODSWILL.png",
    name: "Godswill Oyor, Profit & Afy Douglas",
    role: "Revival Chants & Worship Leaders",
    tag: "Revival Ministers",
  },
  {
    id: "chinyere-udoma",
    src: "/assets/2026/TEAM CHI.png",
    name: "Chinyere Udoma, Chinelo & Favour Michael",
    role: "Praise & Worship Psalmists",
    tag: "Worship Ministers",
  },
  {
    id: "lilian-nneji",
    src: "/assets/2026/TEAM LIA.png",
    name: "Lilian Nneji, Mr. Wealth & Favour",
    role: "Anointed Music Ministers",
    tag: "Worship Ministers",
  },
];

export default function MinisterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<Minister | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ministers2026.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ministers2026.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ministers2026.length);
  };

  return (
    <>
      <div
        style={{
          margin: "30px auto",
          position: "relative",
          maxWidth: 1240,
          padding: "0 16px",
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
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#ef4444",
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              <Mic2 size={16} /> 2026 Anointed Lineup • 4th Edition
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              Anointed Ministers & Artistes
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 2 }}>
              Click any poster to view the official high-resolution 2026 announcement flyer
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <motion.button
              type="button"
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 350 }}
              aria-label="Previous Minister"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "var(--card-shadow)",
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
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "var(--card-shadow)",
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
            borderRadius: 20,
            background: "var(--bg-slider)",
            padding: "20px 0",
            border: "1px solid var(--border-glass)",
            boxShadow: "var(--section-card-shadow)",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 18,
              transform: `translateX(-${currentIndex * 280}px)`,
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              paddingLeft: 18,
            }}
          >
            {ministers2026.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedPoster(item)}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  flexShrink: 0,
                  width: 260,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  boxShadow: "var(--card-shadow)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    backgroundColor: "#111",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="260px"
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
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      padding: "4px 8px",
                      borderRadius: 20,
                      color: "#fff",
                      fontSize: "0.72rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <ZoomIn size={12} /> View
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      background: "var(--primary-red)",
                      padding: "3px 10px",
                      borderRadius: 20,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <div style={{ padding: "14px 14px 16px" }}>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel indicator dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 16,
          }}
        >
          {ministers2026.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: currentIndex === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  currentIndex === i ? "var(--primary-red)" : "var(--border-glass)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* High-Res Poster Lightbox Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(10px)",
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
                maxWidth: 600,
                width: "100%",
                maxHeight: "90vh",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glow)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                aria-label="Close flyer"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 10,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  maxHeight: "70vh",
                }}
              >
                <Image
                  src={selectedPoster.src}
                  alt={selectedPoster.name}
                  fill
                  sizes="600px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  background: "var(--bg-card-secondary)",
                  borderTop: "1px solid var(--border-glass)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      background: "var(--primary-red)",
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedPoster.tag}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--primary-gold)", fontWeight: 700 }}>
                    1MMW 2026 • 4th Edition
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    margin: "4px 0",
                  }}
                >
                  {selectedPoster.name}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                  {selectedPoster.role}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
