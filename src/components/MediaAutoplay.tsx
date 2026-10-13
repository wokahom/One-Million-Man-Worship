"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface MediaAutoplayProps {
  imageSrc?: string;
  videoSrc?: string;
  altText?: string;
}

export default function MediaAutoplay({
  imageSrc = "/assets/images/1mmw_flyer3_1.jpg",
  videoSrc = "https://res.cloudinary.com/dtemxjmt6/video/upload/v1764531906/1mmw_2025_ads_video3_1_bual4w.mov",
  altText = "One Million Man Worship Official",
}: MediaAutoplayProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Show image for 3 seconds then start video
    const timer = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with muted is allowed, if blocked, fallback gracefully
          });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    // When video ends, show image for 3 seconds then replay
    setShowVideo(false);
    setIsPlaying(false);
    setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 3000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setShowVideo(true);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 960,
        margin: "24px auto",
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#000000",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(229, 57, 53, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        aspectRatio: "16 / 9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Intro Flyer Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: showVideo ? 0 : 1,
          transition: "opacity 0.8s ease-in-out",
          pointerEvents: showVideo ? "none" : "auto",
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 960px"
          style={{ objectFit: "contain", backgroundColor: "#000" }}
        />
      </div>

      {/* Main Promo Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted={isMuted}
        onEnded={handleVideoEnded}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: showVideo ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      />

      {/* Floating Control Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(10px)",
          padding: "8px 14px",
          borderRadius: 30,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
}
