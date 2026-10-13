import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <h3>ONE MILLION MAN WORSHIP</h3>
            <p>
              A global worship movement gathering believers across cities and
              nations to lift up the highest praise to King Jesus with one heart
              and one voice.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <a
                href="https://www.instagram.com/onemillionmanworship_ph"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://www.tiktok.com/@one_million_man_worship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="TikTok"
              >
                <TikTokIcon size={15} />
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
                <Link href="/avatar">Create 2025 Avatar</Link>
              </li>
              <li>
                <Link href="/testimony">Share Testimony</Link>
              </li>
              <li>
                <Link href="/testimonies">Read Testimonies</Link>
              </li>
            </ul>
          </div>

          {/* Features & Connect */}
          <div className="footer-col">
            <h4>Explore & Contact</h4>
            <ul className="footer-links">
              <li>
                <Link href="/live">Live Broadcast</Link>
              </li>
              <li>
                <Link href="/gallery">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/videos">Inspiring Moments</Link>
              </li>
              <li>
                <Link href="/ads">Ministers & Countdown</Link>
              </li>
              <li style={{ marginTop: 8 }}>
                <a
                  href="mailto:info@onemillionmanworship.com"
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Mail size={14} /> info@onemillionmanworship.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} One Million Man Worship. All
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
