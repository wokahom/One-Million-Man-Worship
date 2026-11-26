import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Marquee() {
  const items = [
    {
      text: "ONE MILLION MAN WORSHIP 2026 • 4TH EDITION • 3 DAYS, ONE GOD, ONE SOUND, ONE STAGE",
      cta: "Explore 2026",
      href: "/about",
    },
    {
      text: "CREATE YOUR OFFICIAL 1MMW 2026 'I'LL BE ATTENDING' AVATAR",
      cta: "Create Avatar",
      href: "/avatar",
    },
    {
      text: "DECEMBER 18 – 20, 2026 • YAKUBU GOWON STADIUM, PORT HARCOURT • ACCESS FREE",
      cta: "Event Info",
      href: "/ads",
    },
    {
      text: "JOIN THE 2026 VOLUNTEER WORKFORCE",
      cta: "Register Now",
      href: "/volunteer",
    },
    {
      text: "STREAM LIVE BROADCASTS & WATCH HISTORIC MOMENTS",
      cta: "Watch Live",
      href: "/live",
    },
    {
      text: "SUBMIT YOUR TESTIMONY OR PRAYER REQUEST",
      cta: "Share Story",
      href: "/testimony",
    },
  ];

  return (
    <section className="ticker-section" aria-label="Announcements Ticker">
      <div className="ticker-track">
        {/* Render twice for continuous infinite loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="ticker-item">
            <Sparkles size={14} color="#fef08a" />
            <span>{item.text} —</span>
            <Link href={item.href} className="ticker-cta">
              {item.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
