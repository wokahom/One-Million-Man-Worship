import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Marquee() {
  const items = [
    {
      text: "SHARE YOUR TESTIMONY AT ONE MILLION MAN WORSHIP",
      cta: "Click here",
      href: "/testimony",
    },
    {
      text: "CREATE YOUR OFFICIAL 1MMW 2025 AVATAR TODAY",
      cta: "Create Avatar",
      href: "/avatar",
    },
    {
      text: "EXPERIENCE THE POWER & PRESENCE OF GOD IN WORSHIP",
      cta: "Watch Live",
      href: "/live",
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
