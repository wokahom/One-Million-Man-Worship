import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import {
  Users,
  Heart,
  Globe2,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Music2,
} from "lucide-react";

export const metadata = {
  title: "About The Movement",
  description:
    "Learn about the mission, vision, and heart behind One Million Man Worship global convocation.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Flame size={24} color="#ef4444" />,
      title: "Atmosphere of Miracles",
      desc: "Creating an unhindered environment where heaven meets earth, bringing healings, deliverances, and supernatural interventions.",
    },
    {
      icon: <Globe2 size={24} color="#3b82f6" />,
      title: "One Voice, Global Reach",
      desc: "Transcending denominational walls, cities, and tribes to unite believers in true adoration of Jesus Christ.",
    },
    {
      icon: <Music2 size={24} color="#f59e0b" />,
      title: "Deep Prophetic Worship",
      desc: "Led by anointed ministers and psalmists dedicated to pure worship that ushers the congregation into the Holy of Holies.",
    },
    {
      icon: <ShieldCheck size={24} color="#10b981" />,
      title: "Spiritual Revival",
      desc: "Igniting hearts with passion for righteousness, kingdom impact, and prayer in our generation.",
    },
  ];

  return (
    <div>
      <Marquee />

      {/* Hero Banner with Avatar CTA */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Image
          src="/assets/images/1mmw_banner1.jpeg"
          alt="Create Your Own Avatar Banner"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.35)" }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "50px 20px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.25)",
              color: "#fca5a5",
              border: "1px solid rgba(229, 57, 53, 0.4)",
              padding: "6px 16px",
              borderRadius: 30,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <Sparkles size={16} /> Official Badge & Identity
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: 14,
            }}
          >
            Create Your Own Avatar
          </h1>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.1rem",
              maxWidth: 620,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Download and share with friends, family, and loved ones as we
            prepare our hearts for an historic encounter.
          </p>
          <Link href="/avatar" className="btn-primary">
            <span>Click Here to Generate Avatar</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Main Movement Story */}
      <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <section
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: 24,
            padding: "48px 36px",
            marginBottom: 60,
            boxShadow: "var(--section-card-shadow)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 11",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border-glass)",
              }}
            >
              <Image
                src="/assets/images/1mmw_banner2.jpg"
                alt="About One Million Man Worship"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--primary-red)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                <Users size={16} /> Heart of the Vision
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  marginBottom: 18,
                  lineHeight: 1.2,
                }}
              >
                ONE MILLION MAN WORSHIP
              </h2>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                One Million Man Worship is a global worship movement that gathers
                believers from different cities, nations, and backgrounds for one
                purpose: <strong>to lift up the name of Jesus with one voice</strong>.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Through heartfelt praise, deep worship, intense prayer, and
                powerful ministrations, One Million Man Worship creates an
                atmosphere where people encounter God&apos;s presence in a fresh,
                life-changing way. Here, chains are broken, hearts are aligned, and
                cities are transformed.
              </p>
              <Link href="/testimony" className="btn-secondary">
                <span>Experience Jesus Today</span>
                <Heart size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section style={{ marginBottom: 60 }}>
          <h2 className="section-title">Why We Gather In Worship</h2>
          <p className="section-subtitle">
            More than just an event — a sacred convocation dedicated entirely to
            the King of Glory.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {pillars.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  boxShadow: "var(--card-shadow)",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: "var(--bg-card-secondary)",
                    border: "1px solid var(--border-glass)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bus Routes Banner */}
        <section style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Transportation & Bus Routes
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              marginBottom: 24,
            }}
          >
            Free transit locations and pickup centers across key junctions.
          </p>
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid var(--border-glass)",
              maxWidth: 960,
              margin: "0 auto",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <Image
              src="/assets/images/1mmw_2025bus_route.jpg"
              alt="1MMW Bus Route Map"
              width={1200}
              height={700}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
