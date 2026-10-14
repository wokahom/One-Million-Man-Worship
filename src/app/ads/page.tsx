import Marquee from "@/components/Marquee";
import MediaAutoplay from "@/components/MediaAutoplay";
import MinisterSlider from "@/components/MinisterSlider";
import Countdown from "@/components/Countdown";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Event Lineup & Promo",
  description:
    "Explore the anointed ministers lineup, event countdown, and promo broadcasts for One Million Man Worship 2025.",
};

export default function AdsPage() {
  return (
    <div>
      <Marquee />

      <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
        {/* Intro Video & Flyer Autoplay */}
        <section style={{ marginBottom: 40 }}>
          <MediaAutoplay
            imageSrc="/assets/images/1mmw_flyer3_1.jpg"
            videoSrc="https://res.cloudinary.com/dtemxjmt6/video/upload/v1764531906/1mmw_2025_ads_video3_1_bual4w.mov"
          />
        </section>

        {/* Live Countdown to Event */}
        <section style={{ marginBottom: 40 }}>
          <Countdown targetDate="December 19, 2025 16:00:00" />
        </section>

        {/* Ministers and Artistes Slider */}
        <section style={{ marginBottom: 50 }}>
          <MinisterSlider />
        </section>

        {/* Call To Action Banner */}
        <section
          style={{
            background: "var(--hero-card-1-bg)",
            border: "1px solid var(--hero-card-1-border)",
            borderRadius: 24,
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: 850,
            margin: "0 auto",
            boxShadow: "var(--section-card-shadow)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.15)",
              color: "var(--primary-red)",
              padding: "4px 14px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            <Sparkles size={16} /> Be Part Of History
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              marginBottom: 14,
            }}
          >
            Represent Your State, City & Nation
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Generate your official badge and invite your church, fellowship, and
            community to this grand convocation of praise.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/avatar" className="btn-primary">
              <span>Create Your 2025 Avatar</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/live" className="btn-secondary">
              <span>Watch Previous Broadcasts</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
