"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
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
        background: "var(--countdown-bg)",
        border: "1px solid var(--border-glow)",
        borderRadius: 20,
        padding: "36px 24px",
        margin: "30px auto",
        maxWidth: 720,
        textAlign: "center",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "var(--primary-red)",
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
          color: "var(--text-primary)",
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
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                background: "var(--bg-card-secondary)",
                border: "1px solid var(--border-glass)",
                borderRadius: 14,
                padding: "18px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  background: "var(--countdown-digit-gradient)",
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
                  color: "var(--text-secondary)",
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
