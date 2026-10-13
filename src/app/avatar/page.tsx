"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import confetti from "canvas-confetti";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AvatarPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Canvas & Transformation states
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [scale, setScale] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Template & Image references
  const templateRef = useRef<HTMLImageElement | null>(null);
  const userImgRef = useRef<HTMLImageElement | null>(null);

  // Coordinate references
  const circleX = 640;
  const circleY = 640;
  const radius = 350;

  const imgCoords = useRef<{ x: number; y: number; scale: number }>({
    x: 640,
    y: 640,
    scale: 1,
  });

  // Dragging & Gesture interaction refs
  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    lastTouchDist: number | null;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastTouchDist: null,
  });

  // Redraw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw base template background
    if (templateRef.current) {
      ctx.drawImage(templateRef.current, 0, 0);
    }

    // 2. Draw user image in circle clip if loaded
    const uImg = userImgRef.current;
    if (uImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
      ctx.clip();

      const displayW = uImg.width * imgCoords.current.scale;
      const displayH = uImg.height * imgCoords.current.scale;

      ctx.drawImage(
        uImg,
        imgCoords.current.x - displayW / 2,
        imgCoords.current.y - displayH / 2,
        displayW,
        displayH
      );
      ctx.restore();

      // 3. Re-draw template on top for foreground borders and badges
      if (templateRef.current) {
        ctx.drawImage(templateRef.current, 0, 0);
      }
    }
  }, [circleX, circleY, radius]);

  // Load template on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const t = new window.Image();
    t.src = "/assets/images/1mmw2025_avatar.png";
    t.onload = () => {
      canvas.width = t.width || 1280;
      canvas.height = t.height || 1280;
      templateRef.current = t;
      setTemplateLoaded(true);
      drawCanvas();
    };

    // Log page view in Firestore
    if (db) {
      addDoc(collection(db, "visits"), {
        page: "avatar",
        timestamp: serverTimestamp(),
      }).catch(() => {});
    }
  }, [drawCanvas]);

  // Handle image upload
  const handleFileUpload = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const u = new window.Image();
      u.src = e.target?.result as string;
      u.onload = () => {
        userImgRef.current = u;

        // Calculate initial optimal scale to cover circle
        const minScale = Math.max(
          (radius * 2) / u.width,
          (radius * 2) / u.height
        );
        imgCoords.current = {
          x: circleX,
          y: circleY,
          scale: minScale * 1.05,
        };
        setScale(minScale * 1.05);
        setHasImage(true);
        drawCanvas();
      };
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Adjust zoom via slider / buttons
  const adjustScale = (newScale: number) => {
    const clamped = Math.max(0.2, Math.min(5, newScale));
    imgCoords.current.scale = clamped;
    setScale(clamped);
    drawCanvas();
  };

  const resetPosition = () => {
    if (!userImgRef.current) return;
    const minScale = Math.max(
      (radius * 2) / userImgRef.current.width,
      (radius * 2) / userImgRef.current.height
    );
    imgCoords.current = {
      x: circleX,
      y: circleY,
      scale: minScale,
    };
    setScale(minScale);
    drawCanvas();
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = 1280 / rect.width;
    dragRef.current.isDragging = true;
    dragRef.current.startX =
      (e.clientX - rect.left) * scaleFactor - imgCoords.current.x;
    dragRef.current.startY =
      (e.clientY - rect.top) * scaleFactor - imgCoords.current.y;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.isDragging || !hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = 1280 / rect.width;
    imgCoords.current.x =
      (e.clientX - rect.left) * scaleFactor - dragRef.current.startX;
    imgCoords.current.y =
      (e.clientY - rect.top) * scaleFactor - dragRef.current.startY;
    drawCanvas();
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    adjustScale(imgCoords.current.scale + delta);
  };

  // Touch handlers (drag & pinch zoom)
  const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = 1280 / rect.width;

    if (e.touches.length === 1) {
      dragRef.current.isDragging = true;
      const t = e.touches[0];
      dragRef.current.startX =
        (t.clientX - rect.left) * scaleFactor - imgCoords.current.x;
      dragRef.current.startY =
        (t.clientY - rect.top) * scaleFactor - imgCoords.current.y;
    } else if (e.touches.length === 2) {
      dragRef.current.lastTouchDist = getTouchDist(
        e.touches[0],
        e.touches[1]
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = 1280 / rect.width;

    if (e.touches.length === 1 && dragRef.current.isDragging) {
      const t = e.touches[0];
      imgCoords.current.x =
        (t.clientX - rect.left) * scaleFactor - dragRef.current.startX;
      imgCoords.current.y =
        (t.clientY - rect.top) * scaleFactor - dragRef.current.startY;
      drawCanvas();
    } else if (e.touches.length === 2) {
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      if (dragRef.current.lastTouchDist) {
        const factor = dist / dragRef.current.lastTouchDist;
        adjustScale(imgCoords.current.scale * factor);
      }
      dragRef.current.lastTouchDist = dist;
    }
  };

  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
    dragRef.current.lastTouchDist = null;
  };

  // Download Avatar
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f59e0b", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    // Log download in Firestore
    if (db) {
      addDoc(collection(db, "downloads"), {
        timestamp: serverTimestamp(),
      }).catch(() => {});
    }

    // Canvas to Blob & download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (!isMobile) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "onemillionmanworship_avatar2025.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Mobile: open image in new window / same tab for long-press saving
        window.open(url, "_blank");
      }

      setDownloadSuccess(true);
    }, "image/png");
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const siteUrl = "https://onemillionmanworship.com/avatar";
    const text = encodeURIComponent(
      "Check out my official One Million Man Worship 2025 avatar! Create yours here: "
    );
    window.open(`https://wa.me/?text=${text}${siteUrl}`, "_blank");
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(229, 57, 53, 0.15)",
            color: "#f87171",
            padding: "5px 14px",
            borderRadius: 20,
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
          }}
        >
          <Sparkles size={16} /> Official 2025 Badge Studio
        </span>
        <h1 className="section-title">
          Create Your One Million Man Worship Avatar
        </h1>
        <p className="section-subtitle">
          Upload your photo, adjust positioning and scale, and download your
          custom high-resolution avatar to share with loved ones.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 40,
          alignItems: "start",
          maxWidth: 1050,
          margin: "0 auto",
        }}
      >
        {/* Canvas Studio Preview */}
        <div
          style={{
            background: "rgba(18, 18, 24, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 24,
            padding: 24,
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 57, 53, 0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              aspectRatio: "1 / 1",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "#0d0d12",
              cursor: hasImage ? "grab" : "default",
              touchAction: "none",
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />

            {!hasImage && templateLoaded && (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 0, 0, 0.4)",
                  cursor: "pointer",
                  gap: 12,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(229, 57, 53, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    boxShadow: "0 0 24px rgba(229, 57, 53, 0.8)",
                  }}
                >
                  <Upload size={28} />
                </div>
                <p
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  Click Here To Upload Your Photo
                </p>
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                  }}
                >
                  Supports JPG, PNG, WEBP (Square or Portrait)
                </span>
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginTop: 14,
              textAlign: "center",
            }}
          >
            💡 <em>Tip: Click and drag to move • Scroll or pinch to zoom photo</em>
          </p>
        </div>

        {/* Studio Controls */}
        <div
          style={{
            background: "rgba(18, 18, 24, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
            padding: 32,
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: 20,
            }}
          >
            Customization Studio
          </h3>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />

          {/* Step 1: Upload Button */}
          <div style={{ marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                fontSize: "1rem",
              }}
            >
              <ImageIcon size={18} />
              <span>{hasImage ? "Change Uploaded Photo" : "Upload Your Photo"}</span>
            </button>
          </div>

          {/* Step 2: Zoom and Adjust Controls */}
          {hasImage && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 14,
                padding: 18,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#cbd5e1",
                  }}
                >
                  Adjust Size & Zoom
                </span>
                <button
                  type="button"
                  onClick={resetPosition}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f87171",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => adjustScale(scale - 0.1)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: 8,
                    color: "#ffffff",
                    padding: 8,
                  }}
                >
                  <ZoomOut size={16} />
                </button>

                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.05"
                  value={scale}
                  onChange={(e) => adjustScale(parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: "#e53935", cursor: "pointer" }}
                />

                <button
                  type="button"
                  onClick={() => adjustScale(scale + 0.1)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: 8,
                    color: "#ffffff",
                    padding: 8,
                  }}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Download Button */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasImage}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "1.05rem",
                opacity: hasImage ? 1 : 0.5,
                cursor: hasImage ? "pointer" : "not-allowed",
              }}
            >
              <Download size={20} />
              <span>Download Official Avatar</span>
            </button>

            {/* Step 4: Share WhatsApp Button */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="btn-secondary"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "0.95rem",
                color: "#22c55e",
                borderColor: "rgba(34, 197, 94, 0.3)",
              }}
            >
              <Share2 size={18} />
              <span>Share Link On WhatsApp</span>
            </button>
          </div>

          {/* Feedback & Continue */}
          {downloadSuccess && (
            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 14,
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#10b981",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={18} />
                <strong style={{ fontSize: "0.95rem" }}>
                  Avatar Downloaded Successfully!
                </strong>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#d1fae5", margin: 0 }}>
                Set it as your display picture on WhatsApp, Instagram, and
                Facebook.
              </p>
              <Link
                href="/ads"
                className="btn-primary"
                style={{
                  alignSelf: "flex-start",
                  marginTop: 6,
                  padding: "8px 18px",
                  fontSize: "0.88rem",
                }}
              >
                <span>Continue to Ministers & Promo</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
