"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownProps {
  targetDate?: string;
  title?: string;
}

export default function Countdown({
  targetDate = "December 19, 2025 16:00:00",
  title = "Countdown to One Million Man Worship 2025",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  useEffect(() => {
    const eventTime = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at center, rgba(229, 57, 53, 0.15) 0%, rgba(10, 10, 14, 0.95) 70%)",
        border: "1px solid rgba(229, 57, 53, 0.25)",
        borderRadius: 20,
        padding: "36px 24px",
        margin: "30px auto",
        maxWidth: 720,
        textAlign: "center",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(229, 57, 53, 0.15)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#f87171",
          fontSize: "0.9rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 10,
        }}
      >
        <Clock size={16} /> Gathering Of Believers
      </div>

      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "#ffffff",
          marginBottom: 28,
        }}
      >
        {timeLeft.isFinished ? "The Event Has Begun! Praise The Lord!" : title}
      </h2>

      {!timeLeft.isFinished && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          {units.map((unit, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 14,
                padding: "18px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(10px)",
                transition: "transform 0.2s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1,
                  background: "linear-gradient(180deg, #ffffff 40%, #fca5a5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#94a3b8",
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
