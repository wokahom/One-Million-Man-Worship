"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
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
  const [rotation, setRotation] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Template & Image references
  const templateRef = useRef<HTMLImageElement | null>(null);
  const userImgRef = useRef<HTMLImageElement | null>(null);

  // Exact 2026 Template Dimensions & Circle Coordinates
  const templateW = 2100;
  const templateH = 2100;
  const circleX = 1036;
  const circleY = 824;
  const radius = 392;

  const imgCoords = useRef<{ x: number; y: number; scale: number; rotation: number }>({
    x: circleX,
    y: circleY,
    scale: 1,
    rotation: 0,
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

    // 1. Draw 2026 base template background
    if (templateRef.current) {
      ctx.drawImage(templateRef.current, 0, 0, canvas.width, canvas.height);
    }

    // 2. Draw user image inside the 2026 circular cutout
    const uImg = userImgRef.current;
    if (uImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
      ctx.clip();

      const displayW = uImg.width * imgCoords.current.scale;
      const displayH = uImg.height * imgCoords.current.scale;

      ctx.save();
      ctx.translate(imgCoords.current.x, imgCoords.current.y);
      ctx.rotate((imgCoords.current.rotation * Math.PI) / 180);
      ctx.drawImage(
        uImg,
        -displayW / 2,
        -displayH / 2,
        displayW,
        displayH
      );
      ctx.restore();
      ctx.restore();

      // 3. Draw a clean inner ring stroke to blend seamlessly with the template's red border
      ctx.save();
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(182, 10, 8, 0.4)";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    }
  }, [circleX, circleY, radius]);

  // Load 2026 template on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const t = new window.Image();
    t.src = "/assets/2026/i will be attend.png";
    t.onload = () => {
      canvas.width = templateW;
      canvas.height = templateH;
      templateRef.current = t;
      setTemplateLoaded(true);
      drawCanvas();
    };

    // Log page view in Firestore
    if (db) {
      addDoc(collection(db, "visits"), {
        page: "avatar-2026",
        timestamp: serverTimestamp(),
      }).catch(() => { });
    }
  }, [drawCanvas, templateW, templateH]);

  // Handle image upload
  const handleFileUpload = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const u = new window.Image();
      u.src = e.target?.result as string;
      u.onload = () => {
        userImgRef.current = u;

        // Calculate initial scale to cover the circular frame completely
        const minScale = Math.max(
          (radius * 2) / u.width,
          (radius * 2) / u.height
        );
        const initialScale = minScale * 1.05;
        imgCoords.current = {
          x: circleX,
          y: circleY,
          scale: initialScale,
          rotation: 0,
        };
        setScale(initialScale);
        setRotation(0);
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
    const clamped = Math.max(0.1, Math.min(6, newScale));
    imgCoords.current.scale = clamped;
    setScale(clamped);
    drawCanvas();
  };

  // Rotate 90 degrees
  const rotatePhoto = (direction: "cw" | "ccw") => {
    const delta = direction === "cw" ? 90 : -90;
    const newRot = (imgCoords.current.rotation + delta) % 360;
    imgCoords.current.rotation = newRot;
    setRotation(newRot);
    drawCanvas();
  };

  const resetPosition = () => {
    if (!userImgRef.current) return;
    const minScale = Math.max(
      (radius * 2) / userImgRef.current.width,
      (radius * 2) / userImgRef.current.height
    );
    const initialScale = minScale * 1.05;
    imgCoords.current = {
      x: circleX,
      y: circleY,
      scale: initialScale,
      rotation: 0,
    };
    setScale(initialScale);
    setRotation(0);
    drawCanvas();
  };

  // Mouse drag handlers with accurate 2100px coordinate projection
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = templateW / rect.width;
    dragRef.current.isDragging = true;
    dragRef.current.startX =
      (e.clientX - rect.left) * scaleFactor - imgCoords.current.x;
    dragRef.current.startY =
      (e.clientY - rect.top) * scaleFactor - imgCoords.current.y;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.isDragging || !hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = templateW / rect.width;
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

  // Touch handlers (drag & pinch zoom on mobile devices)
  const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = templateW / rect.width;

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
    const scaleFactor = templateW / rect.width;

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

  // Download Avatar (High Res 2100x2100 PNG)
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f59e0b", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    // Log download in Firestore
    if (db) {
      addDoc(collection(db, "downloads"), {
        edition: "2026",
        timestamp: serverTimestamp(),
      }).catch(() => { });
    }

    // Convert Canvas to Blob & download
    canvas.toBlob((blob) => {
      setIsProcessing(false);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const filename = "1MMW2026_Avatar.png";

      if (!isMobile) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Mobile fallback: open full-res image for direct long-press save or share
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      setDownloadSuccess(true);
    }, "image/png");
  };

  // Native Web Share API or WhatsApp Share
  const handleShare = async () => {
    const shareText =
      "I will be attending One Million Man Worship 2026 (4th Edition)! 3 DAYS • ONE GOD • ONE SOUND • ONE STAGE. Dec 18 - 20, 2026 at Yakubu Gowon Stadium, Port Harcourt. Create your official avatar here:";
    const shareUrl = "https://onemillionmanworship.com/avatar";

    if (canvasRef.current && navigator.share) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "1MMW2026_Avatar.png", { type: "image/png" })] })) {
            const file = new File([blob], "1MMW2026_Avatar.png", { type: "image/png" });
            await navigator.share({
              title: "My 1MMW 2026 Avatar",
              text: `${shareText} #1MMW2026`,
              files: [file],
            });
          } else {
            await navigator.share({
              title: "One Million Man Worship 2026 Avatar",
              text: shareText,
              url: shareUrl,
            });
          }
        }, "image/png");
        return;
      } catch (err) {
        console.log("Web Share fallback:", err);
      }
    }

    // Fallback to WhatsApp
    const encoded = encodeURIComponent(`${shareText} ${shareUrl} #1MMW2026 #OneMillionManWorship`);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Ambient Glow */}
      <div
        className="glow-orb glow-orb-red"
        style={{ top: "5%", left: "10%", width: 450, height: 450 }}
      />
      <div
        className="glow-orb glow-orb-gold"
        style={{ top: "35%", right: "8%", width: 380, height: 380 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 40, paddingBottom: 80 }}>
        {/* Page Header */}
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
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <Sparkles size={16} /> Official 2026 Badge Studio • 4th Edition
          </span>
          <h1 className="section-title">
            CREATE YOUR 2026 OFFICIAL AVATAR
          </h1>
          <p className="section-subtitle">
            Upload your photo, adjust zoom and rotation, and download your
            high-resolution <strong>&quot;I&apos;ll Be Attending&quot;</strong> badge to celebrate the 2026 convocation.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            alignItems: "start",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          {/* Canvas Studio Preview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 24,
              padding: 24,
              boxShadow: "var(--card-shadow)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 460,
                aspectRatio: "1 / 1",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border-glow)",
                background: "#0d0d12",
                cursor: hasImage ? "grab" : "default",
                touchAction: "none",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
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
                    background: "rgba(0, 0, 0, 0.45)",
                    cursor: "pointer",
                    gap: 12,
                    padding: 24,
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: "50%",
                      background: "var(--primary-red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      boxShadow: "0 0 28px rgba(229, 57, 53, 0.8)",
                    }}
                  >
                    <Upload size={30} />
                  </motion.div>
                  <p
                    style={{
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      margin: 0,
                    }}
                  >
                    Tap Here To Upload Your Photo
                  </p>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Supports JPG, PNG, WEBP • Works on mobile and desktop
                  </span>
                </div>
              )}
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              💡 <em>Tip: Drag with finger or mouse to adjust position • Use zoom slider below to fit</em>
            </p>
          </motion.div>

          {/* Studio Controls */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 24,
              padding: 32,
              boxShadow: "var(--card-shadow)",
              transition: "background-color 0.3s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Badge Studio Controls
              </h3>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--primary-gold)",
                  background: "rgba(245, 158, 11, 0.15)",
                  padding: "3px 10px",
                  borderRadius: 12,
                }}
              >
                2026 Edition
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleInputChange}
              style={{ display: "none" }}
            />

            {/* Step 1: Upload Button */}
            <div style={{ marginBottom: 20 }}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                <span>{hasImage ? "Choose Another Photo" : "Upload Your Photo"}</span>
              </motion.button>
            </div>

            {/* Step 2: Zoom, Rotate & Adjust Controls */}
            {hasImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--bg-card-secondary)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 24,
                }}
              >
                {/* Header with reset */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Scale & Zoom ({scale.toFixed(2)}x)
                  </span>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetPosition}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--primary-red)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <RotateCcw size={13} /> Reset
                  </motion.button>
                </div>

                {/* Slider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => adjustScale(scale - 0.1)}
                    aria-label="Zoom Out"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: 8,
                      color: "var(--text-primary)",
                      padding: 8,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ZoomOut size={16} />
                  </motion.button>

                  <input
                    type="range"
                    min="0.2"
                    max="4"
                    step="0.05"
                    value={scale}
                    onChange={(e) => adjustScale(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: "#e53935", cursor: "pointer" }}
                  />

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => adjustScale(scale + 0.1)}
                    aria-label="Zoom In"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: 8,
                      color: "var(--text-primary)",
                      padding: 8,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ZoomIn size={16} />
                  </motion.button>
                </div>

                {/* Rotate Controls */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-glass)", paddingTop: 12 }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                    Orientation ({rotation}°):
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => rotatePhoto("ccw")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 8,
                        color: "var(--text-primary)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      <RotateCcw size={13} /> -90°
                    </button>
                    <button
                      type="button"
                      onClick={() => rotatePhoto("cw")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 8,
                        color: "var(--text-primary)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      <RotateCw size={13} /> +90°
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <motion.button
                type="button"
                whileHover={{ scale: hasImage ? 1.02 : 1 }}
                whileTap={{ scale: hasImage ? 0.98 : 1 }}
                onClick={handleDownload}
                disabled={!hasImage || isProcessing}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "1.05rem",
                  opacity: hasImage ? 1 : 0.5,
                  cursor: hasImage ? "pointer" : "not-allowed",
                  justifyContent: "center",
                }}
              >
                <Download size={20} />
                <span>{isProcessing ? "Generating High-Res Badge..." : "Download Official 2026 Avatar"}</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="btn-secondary"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "0.95rem",
                  color: "#22c55e",
                  borderColor: "rgba(34, 197, 94, 0.35)",
                  justifyContent: "center",
                }}
              >
                <Share2 size={18} />
                <span>Share On WhatsApp & Social Media</span>
              </motion.button>
            </div>

            {/* Success Feedback Banner */}
            <AnimatePresence>
              {downloadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginTop: 24,
                    padding: 18,
                    borderRadius: 16,
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
                    <strong style={{ fontSize: "0.98rem" }}>
                      2026 Avatar Created Successfully!
                    </strong>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", margin: 0, lineHeight: 1.5 }}>
                    Your high-resolution PNG is ready. Set it as your WhatsApp DP, Instagram Story, or Facebook profile to invite friends and family to the convocation!
                  </p>
                  <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                    <Link
                      href="/live"
                      className="btn-primary"
                      style={{
                        padding: "8px 16px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <span>Explore 2026 Live Broadcast</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/volunteer"
                      className="btn-secondary"
                      style={{
                        padding: "8px 16px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <span>Join 2026 Workforce</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
