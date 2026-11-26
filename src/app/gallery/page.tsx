"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Marquee from "@/components/Marquee";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  year: "2026" | "2025" | "2024";
  category: "ministers" | "worship" | "crowd";
}

const photoArchive: GalleryPhoto[] = [
  // 2026 Official Posters & Announcements
  {
    id: "2026-main",
    src: "/assets/2026/1MMW 2026 MAIN TV.png",
    title: "1MMW 2026 Official Banner • 3 Days One God One Sound One Stage",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-paul",
    src: "/assets/2026/PAUL.png",
    title: "Dr. Pst. Paul & Dr. Mrs. Becky Paul-Enenche (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-tye",
    src: "/assets/2026/TYE.png",
    title: "Tye Tribbett • International Guest Artiste (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-dunsin",
    src: "/assets/2026/DUN TEAM.png",
    title: "Wisdom K, Dunsin Oyekan & God's Oracle (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-guc",
    src: "/assets/2026/TEA GUC.png",
    title: "Owie Abutu, Min. GUC & Faith Tekpo (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-chioma",
    src: "/assets/2026/TEAM CHIO.png",
    title: "Victor Sam, Chioma Jesus & Min. Ale (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-panam",
    src: "/assets/2026/valen team.png",
    title: "DK Vallen, Panam Percy Paul & African Joy (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-godswill",
    src: "/assets/2026/TEAM GODSWILL.png",
    title: "Profit, Godswill Oyor & Afy Douglas (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-chinyere",
    src: "/assets/2026/TEAM CHI.png",
    title: "Chinelo, Chinyere Udoma & Favour Michael (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-lilian",
    src: "/assets/2026/TEAM LIA.png",
    title: "Lilian Nneji, Mr. Wealth & Favour (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-zilly",
    src: "/assets/2026/ZILLY.png",
    title: "Apostle Zilly Aggrey (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-chris",
    src: "/assets/2026/PAS.png",
    title: "Rev. Chris Ugoh (2026 Poster)",
    year: "2026",
    category: "ministers",
  },
  {
    id: "2026-george",
    src: "/assets/2026/DAD.png",
    title: "Pastor George Izunwa (2026 Poster)",
    year: "2026",
    category: "ministers",
  },

  // 2025 Edition Photographs
  {
    id: "2025-1",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105050/601814423_1736131854469299_2926881306216183961_n_mfk69e.jpg",
    title: "Thousands in Deep Reverence & Adoration",
    year: "2025",
    category: "worship",
  },
  {
    id: "2025-2",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105048/601812411_1736131704469314_8206748247949232720_n_b9nmix.jpg",
    title: "Anointed Minister on Stage during Worship Atmosphere",
    year: "2025",
    category: "ministers",
  },
  {
    id: "2025-3",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105047/601807249_1736132051135946_5180954997817938290_n_tnl2ce.jpg",
    title: "Hands Lifted in Holy Worship Across the Stadium",
    year: "2025",
    category: "worship",
  },
  {
    id: "2025-4",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105044/601806188_1736131937802624_2925002357820166592_n_catex0.jpg",
    title: "Atmosphere of Miracles & Joyful Praise",
    year: "2025",
    category: "worship",
  },
  {
    id: "2025-5",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105042/601519025_1736134424469042_5280779710771731341_n_cgdbrl.jpg",
    title: "Prophetic Adoration and Believers Intercession",
    year: "2025",
    category: "worship",
  },
  {
    id: "2025-6",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/601533422_1735778371171314_8234935736717962226_n_pei7nn.jpg",
    title: "1MMW Choir & Mass Orchestra in Symphony",
    year: "2025",
    category: "ministers",
  },

  // 2024 Edition Photographs
  {
    id: "2024-1",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105041/600394143_1735794001169751_6309423566317643769_n_h0njhy.jpg",
    title: "United Believers in Prayer and Supplication",
    year: "2024",
    category: "crowd",
  },
  {
    id: "2024-2",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105041/601805931_1735778487837969_4796710921697180997_n_shjwc9.jpg",
    title: "Tears of Gratitude & Praise Under God's Power",
    year: "2024",
    category: "worship",
  },
  {
    id: "2024-3",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/600978115_1735793931169758_8531156171123650146_n_jsjtbt.jpg",
    title: "Mass Congregation Gathering Across Stadium Stands",
    year: "2024",
    category: "crowd",
  },
  {
    id: "2024-4",
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105039/600350884_1735811974501287_7634278073864609618_n_z5lfkf.jpg",
    title: "The Glory of the Lord Revealed at Nightfall",
    year: "2024",
    category: "crowd",
  },
];

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Filtered photo list
  const filteredPhotos = useMemo(() => {
    return photoArchive.filter((p) => {
      const matchYear = selectedYear === "all" || p.year === selectedYear;
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchYear && matchCategory;
    });
  }, [selectedYear, selectedCategory]);

  const activePhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Ambient Glow */}
      <div
        className="glow-orb glow-orb-red"
        style={{ top: "8%", left: "10%", width: 440, height: 440 }}
      />
      <div
        className="glow-orb glow-orb-gold"
        style={{ top: "40%", right: "8%", width: 390, height: 390 }}
      />

      <Marquee />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 40, paddingBottom: 80 }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.15)",
              color: "var(--primary-red)",
              border: "1px solid var(--border-glow)",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <ImageIcon size={16} /> Visual Memories & Archive (2026 - 2024)
          </span>
          <h1 className="section-title">ONE MILLION MAN WORSHIP GALLERY</h1>
          <p className="section-subtitle">
            Explore high-resolution media across all editions: from 2026 announcement posters to previous mass stadium praise atmospheres.
          </p>
        </motion.div>

        {/* Filter Controls (Year & Category) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          {/* Year Filter Tabs */}
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 6,
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 30,
              padding: 5,
              boxShadow: "var(--card-shadow)",
            }}
          >
            {[
              { id: "all", label: "All Editions" },
              { id: "2026", label: "2026 Edition (New)" },
              { id: "2025", label: "2025 Convocation" },
              { id: "2024", label: "2024 Archive" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedYear(tab.id);
                  setSelectedIndex(null);
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 24,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  background: selectedYear === tab.id ? "var(--primary-red)" : "transparent",
                  color: selectedYear === tab.id ? "#ffffff" : "var(--text-secondary)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 6,
              fontSize: "0.82rem",
            }}
          >
            {[
              { id: "all", label: "All Categories" },
              { id: "ministers", label: "Ministers & Artistes" },
              { id: "worship", label: "Worship Atmosphere" },
              { id: "crowd", label: "Stadium & Crowd" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedIndex(null);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background:
                    selectedCategory === cat.id
                      ? "rgba(245, 158, 11, 0.2)"
                      : "var(--bg-card-secondary)",
                  color:
                    selectedCategory === cat.id
                      ? "var(--primary-gold)"
                      : "var(--text-secondary)",
                  border:
                    selectedCategory === cat.id
                      ? "1px solid var(--primary-gold)"
                      : "1px solid var(--border-glass)",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ textAlign: "center", marginBottom: 20, color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          Showing <strong>{filteredPhotos.length}</strong> photographs in gallery
        </div>

        {/* Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: 20,
          }}
        >
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedIndex(idx)}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                boxShadow: "var(--card-shadow)",
                cursor: "pointer",
                aspectRatio: photo.year === "2026" ? "4 / 5" : "16 / 11",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* Year badge */}
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: photo.year === "2026" ? "var(--primary-red)" : "rgba(0,0,0,0.7)",
                  color: "#fff",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 12,
                  backdropFilter: "blur(6px)",
                }}
              >
                {photo.year}
              </span>

              {/* Title label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  right: 12,
                }}
              >
                <h4
                  style={{
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.3,
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {photo.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 900,
                width: "100%",
                background: "var(--bg-card)",
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid var(--border-glow)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close photo"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 20,
                  width: 38,
                  height: 38,
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

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  width: 42,
                  height: 42,
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
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  width: 42,
                  height: 42,
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
                <ChevronRight size={22} />
              </button>

              {/* Main Image Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "65vh",
                  maxHeight: 650,
                  background: "#08080a",
                }}
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  sizes="900px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              {/* Footer Details */}
              <div
                style={{
                  padding: "18px 24px",
                  background: "var(--bg-card-secondary)",
                  borderTop: "1px solid var(--border-glass)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        background: activePhoto.year === "2026" ? "var(--primary-red)" : "var(--primary-gold)",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 10,
                      }}
                    >
                      {activePhoto.year} Edition
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>
                      Category: {activePhoto.category}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {activePhoto.title}
                  </h3>
                </div>

                <a
                  href={activePhoto.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                >
                  <Download size={14} /> Open Full Size
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
