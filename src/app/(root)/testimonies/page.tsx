"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import {
  MessageSquareHeart,
  MapPin,
  ArrowRight,
  Quote,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { motion } from "motion/react";

interface TestimonyItem {
  id: string;
  name: string;
  location: string;
  testimony: string;
  imageURL?: string;
  videoURL?: string;
  createdAt?: number;
}

const defaultTestimonies: TestimonyItem[] = [
  {
    id: "seed-1",
    name: "Sister Deborah Amadi",
    location: "Port Harcourt, Rivers State",
    testimony:
      "I came to 1MMW with severe spinal pain of 4 years. While Minister Nathaniel Bassey was leading the congregation in worship, a sudden warmth surged through my back. Immediately, every trace of pain vanished! I can now bend and run without any aid!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105047/601807249_1736132051135946_5180954997817938290_n_tnl2ce.jpg",
  },
  {
    id: "seed-2",
    name: "Pastor Emmanuel Uche",
    location: "Abuja, FCT",
    testimony:
      "The unity of believers lifting up praise at One Million Man Worship ignited a massive revival in our youth ministry. We experienced unprecedented salvations and spiritual renewals. God is truly doing something historic!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105048/601812411_1736131704469314_8206748247949232720_n_b9nmix.jpg",
  },
  {
    id: "seed-3",
    name: "Grace Oladipo",
    location: "Lagos, Nigeria",
    testimony:
      "During the midnight praise session, as thousands roared the name of Jesus, my business breakthrough arrived the very next Monday with a global partnership contract I had prayed for over 2 years. Glory to God alone!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105044/601806188_1736131937802624_2925002357820166592_n_catex0.jpg",
  },
  {
    id: "seed-4",
    name: "Michael Braide",
    location: "Bonny Island, Rivers State",
    testimony:
      "I was battling chronic depression and suicidal thoughts. Standing among the one million men worshipping, a peace that surpasses all understanding flooded my heart. Jesus gave me a fresh reason to live!",
  },
];

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] =
    useState<TestimonyItem[]>(defaultTestimonies);
  const [count, setCount] = useState(defaultTestimonies.length + 128);

  useEffect(() => {
    // 1. Fetch approved testimonies from MongoDB API
    fetch("/api/testimonies?approved=true")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          const apiList: TestimonyItem[] = resData.data.map((d: Record<string, unknown>) => ({
            id: (d._id as string) || (d.id as string),
            name: d.name as string,
            location: d.location as string,
            testimony: d.testimony as string,
            imageURL: d.imageURL as string | undefined,
            videoURL: d.videoURL as string | undefined,
            createdAt: d.createdAt ? new Date(d.createdAt as string).getTime() : undefined,
          }));
          setTestimonies(apiList);
          setCount(apiList.length + 128);
        }
      })
      .catch(() => {});

    // 2. Also subscribe to Firestore if initialized
    if (!db) return;

    try {
      const q = query(
        collection(db, "testimonies"),
        where("approved", "==", true)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: TestimonyItem[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data() as Omit<TestimonyItem, "id">;
              list.push({ id: doc.id, ...data });
            });
            setTestimonies((prev) => {
              const ids = new Set(prev.map((p) => p.id));
              const newItems = list.filter((item) => !ids.has(item.id));
              return [...newItems, ...prev];
            });
          }
        },
        () => {}
      );

      return () => unsubscribe();
    } catch {}
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: -120,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          bottom: 120,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Header & Live Counter */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
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
            <MessageSquareHeart size={16} /> Faith Gallery
          </span>
          <h1 className="section-title">TESTIMONIES OF GOD&apos;S WONDERS</h1>
          <p className="section-subtitle">
            Witness what God has done through the prayers, worship, and presence
            at One Million Man Worship.
          </p>

          {/* Testimonies Counter Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", damping: 20, stiffness: 240 }}
            whileHover={{ scale: 1.03 }}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 20,
              padding: "20px 48px",
              boxShadow: "var(--card-shadow)",
              margin: "0 auto 30px",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3.2rem",
                fontWeight: 900,
                background: "var(--title-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}
            >
              {count}+
            </span>
            <span
              style={{
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "var(--primary-red)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 6,
              }}
            >
              Documented Testimonies & Miracles
            </span>
          </motion.div>

          <div style={{ marginTop: 10 }}>
            <Link href="/testimony" className="btn-primary">
              <span>Share Your Own Testimony</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Testimonies Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {testimonies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: Math.min(idx * 0.08, 0.4),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.015 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--card-shadow)",
                position: "relative",
                transition: "background-color 0.3s ease, border-color 0.3s ease",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  {item.imageURL ? (
                    <div
                      style={{
                        position: "relative",
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #ef4444",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.imageURL}
                        alt={item.name}
                        fill
                        sizes="54px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #ef4444, #991b1b)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        flexShrink: 0,
                      }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        margin: 0,
                      }}
                    >
                      <MapPin size={13} color="var(--primary-red)" />
                      {item.location}
                    </p>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <Quote
                    size={28}
                    color="rgba(229, 57, 53, 0.2)"
                    style={{ position: "absolute", top: -8, left: -6 }}
                  />
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      position: "relative",
                      zIndex: 1,
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{item.testimony}&rdquo;
                  </p>
                </div>
              </div>

              {item.videoURL && (
                <div style={{ marginTop: 16 }}>
                  <video
                    controls
                    src={item.videoURL}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      maxHeight: 220,
                      background: "#000",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
