"use client";

import { useState } from "react";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";

const allPhotos = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105050/601814423_1736131854469299_2926881306216183961_n_mfk69e.jpg",
    title: "Thousands in Deep Reverence",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105048/601812411_1736131704469314_8206748247949232720_n_b9nmix.jpg",
    title: "Anointed Minister on Stage",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105047/601807249_1736132051135946_5180954997817938290_n_tnl2ce.jpg",
    title: "Hands Lifted in Holy Worship",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105044/601806188_1736131937802624_2925002357820166592_n_catex0.jpg",
    title: "Atmosphere of Miracles & Joy",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105042/601519025_1736134424469042_5280779710771731341_n_cgdbrl.jpg",
    title: "Prophetic Adoration",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105041/600394143_1735794001169751_6309423566317643769_n_h0njhy.jpg",
    title: "United Believers in Prayer",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105041/601805931_1735778487837969_4796710921697180997_n_shjwc9.jpg",
    title: "Tears of Gratitude & Praise",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/601533422_1735778371171314_8234935736717962226_n_pei7nn.jpg",
    title: "Choir & Mass Worship Band",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/600978115_1735793931169758_8531156171123650146_n_jsjtbt.jpg",
    title: "Mass Congregation Gathering",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105039/600350884_1735811974501287_7634278073864609618_n_z5lfkf.jpg",
    title: "The Glory of the Lord Revealed",
  },
];

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visiblePhotos = allPhotos.slice(0, visibleCount);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allPhotos.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allPhotos.length) % allPhotos.length);
  };

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
            <ImageIcon size={16} /> Visual Memories & Archive
          </span>
          <h1 className="section-title">ONE MILLION MAN WORSHIP GALLERY</h1>
          <p className="section-subtitle">
            Experience the divine beauty and grandeur of the gathering through
            high-resolution photos from past editions.
          </p>
        </div>

        {/* Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: 20,
          }}
        >
          {visiblePhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(idx)}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                aspectRatio: "4 / 3",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              />

              {/* Hover Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 16,
                  transition: "background 0.3s ease",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < allPhotos.length && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="btn-secondary"
            >
              <span>Load More Photos</span>
              <Sparkles size={16} />
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div
            onClick={() => setSelectedIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(12px)",
              zIndex: 3000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                zIndex: 3010,
              }}
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                zIndex: 3010,
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                zIndex: 3010,
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Active Image container */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: 900,
                height: 600,
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              }}
            >
              <Image
                src={allPhotos[selectedIndex].src}
                alt={allPhotos[selectedIndex].title}
                fill
                sizes="90vw"
                style={{ objectFit: "contain", background: "#000" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.9))",
                  padding: "16px 20px",
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                }}
              >
                {allPhotos[selectedIndex].title} ({selectedIndex + 1} of{" "}
                {allPhotos.length})
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
