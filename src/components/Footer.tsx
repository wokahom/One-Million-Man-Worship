import Link from "next/link";
import { Mail, Heart, MapPin } from "lucide-react";
import { InstagramIcon, TikTokIcon, YoutubeIcon, FacebookIcon, XTwitterIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <h3>ONE MILLION MAN WORSHIP</h3>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.8rem",
                color: "var(--primary-gold)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              4th Edition • 3 Days, One God, One Sound, One Stage
            </span>
            <p>
              A global worship convocation gathering believers across cities and
              nations to lift up the highest praise to King Jesus with one heart
              and one voice. December 18 – 20, 2026 at Yakubu Gowon Stadium, Elekahia, Port Harcourt.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="https://www.instagram.com/onemillionmanworship_ph?gwpx=MXdxcDhrZ3JoMm82cA=="
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram (@onemillionmanworship_ph)"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://https://www.facebook.com/onemillionmanworshipph/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Facebook (@onemillionmanworship)"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href="https://youtube.com/@onemillionmanworship?si=D2MsxAavJ1DCJQI1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube (@onemillionmanworship)"
              >
                <YoutubeIcon size={17} />
              </a>
              <a
                href="https://www.tiktok.com/@onemillionmanworship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="TikTok (@onemillionmanworship)"
              >
                <TikTokIcon size={15} />
              </a>
              <a
                href="https://x.com/onemillionmanworship_ph"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="X / Twitter (@onemillionmanworship_ph)"
              >
                <XTwitterIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Movement</Link>
              </li>
              <li>
                <Link href="/avatar">Create 2026 Avatar</Link>
              </li>
              <li>
                <Link href="/volunteer">Volunteer for 2026</Link>
              </li>
              <li>
                <Link href="/prayer">Prayer Requests</Link>
              </li>
              <li>
                <Link href="/testimony">Share Testimony</Link>
              </li>
              <li>
                <Link href="/testimonies">Read Testimonies</Link>
              </li>
            </ul>
          </div>

          {/* Features & Official Contact */}
          <div className="footer-col">
            <h4>Explore & Official Contact</h4>
            <ul className="footer-links">
              <li>
                <Link href="/archive">Editions Archive</Link>
              </li>
              <li>
                <Link href="/blog">News & Articles</Link>
              </li>
              <li>
                <Link href="/live">2026 Live Broadcast</Link>
              </li>
              <li>
                <Link href="/gallery">Photo Gallery (2026 & Past)</Link>
              </li>
              <li>
                <Link href="/ads">Ministers Lineup & Countdown</Link>
              </li>
              <li>
                <Link href="/videos">Inspiring Moments</Link>
              </li>
              <li>
                <Link href="/contact">Contact & Transportation</Link>
              </li>
              <li style={{ marginTop: 12, borderTop: "1px solid var(--border-glass)", paddingTop: 10 }}>
                <a
                  href="mailto:info@onemillionmanworship.com"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}
                >
                  <Mail size={13} color="var(--primary-red)" /> info@onemillionmanworship.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:team@onemillionmanworship.com"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}
                >
                  <Mail size={13} color="var(--primary-gold)" /> team@onemillionmanworship.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@onemillionmanworship.com"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}
                >
                  <Mail size={13} color="#3b82f6" /> admin@onemillionmanworship.com
                </a>
              </li>
              <li style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <MapPin size={13} color="#ef4444" /> Yakubu Gowon Stadium, Elekahia, Port Harcourt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            &copy; 2026 One Million Man Worship. All
            rights reserved.
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Lifting up the name of Jesus with one voice <Heart size={14} color="#ef4444" fill="#ef4444" />
          </p>
        </div>
      </div>
    </footer>
  );
}
