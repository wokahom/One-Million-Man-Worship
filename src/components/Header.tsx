"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Radio,
  Sparkles,
  Tv,
  Image as GalleryIcon,
  MessageSquareHeart,
  Users,
  Video,
} from "lucide-react";
import { BsInstagram } from "react-icons/bs";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          {/* Logo */}
          <Link href="/" className="brand-link" onClick={closeMobile}>
            <Image
              src="/assets/logo/1mmw_logo2.png"
              alt="One Million Man Worship"
              width={180}
              height={50}
              priority
              className="brand-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link
                  href="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                >
                  About 1MMW
                </Link>
              </li>
              <li>
                <Link
                  href="/avatar"
                  className={`nav-link ${isActive("/avatar") ? "active" : ""}`}
                >
                  Avatar Creator
                </Link>
              </li>
              <li>
                <Link
                  href="/testimony"
                  className={`nav-link ${isActive("/testimony") ? "active" : ""}`}
                >
                  Experience Jesus
                </Link>
              </li>

              {/* Features Dropdown */}
              <li
                className="dropdown-container"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="dropdown-trigger"
                  aria-expanded={dropdownOpen}
                >
                  <span>Features</span>
                  <ChevronDown size={15} />
                </button>
                <div className="dropdown-menu">
                  <Link
                    href="/ads"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Users size={15} /> Ministers & Artists
                    </span>
                  </Link>
                  <Link
                    href="/live"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Tv size={15} /> Previous Editions
                    </span>
                  </Link>
                  <Link
                    href="/testimonies"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MessageSquareHeart size={15} /> Testimonies
                    </span>
                  </Link>
                  <Link
                    href="/gallery"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <GalleryIcon size={15} /> Photo Gallery
                    </span>
                  </Link>
                  <Link
                    href="/videos"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Video size={15} /> Inspiring Moments
                    </span>
                  </Link>
                </div>
              </li>

              <li>
                <Link href="/live" className="nav-link live-badge">
                  <Radio size={14} /> LIVE
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@onemillionmanworship.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Icons & Actions */}
          <div className="header-actions">
            <div className="social-links">
              <a
                href="https://www.instagram.com/onemillionmanworship_ph"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <BsInstagram size={17} />
              </a>
              <a
                href="https://www.tiktok.com/@one_million_man_worship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="TikTok"
              >
                {/* TikTok custom SVG */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.18 8.18 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z" />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={toggleMobile}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`drawer-overlay ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <Image
            src="/assets/logo/1mmw_logo2.png"
            alt="One Million Man Worship"
            width={140}
            height={38}
          />
          <button
            type="button"
            className="close-drawer-btn"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          <li>
            <Link href="/" className="mobile-nav-link" onClick={closeMobile}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="mobile-nav-link" onClick={closeMobile}>
              About 1MMW
            </Link>
          </li>
          <li>
            <Link href="/avatar" className="mobile-nav-link" onClick={closeMobile}>
              Create Avatar
            </Link>
          </li>
          <li>
            <Link
              href="/testimony"
              className="mobile-nav-link"
              onClick={closeMobile}
            >
              Experience Jesus
            </Link>
          </li>
          <li>
            <Link
              href="/testimonies"
              className="mobile-nav-link"
              onClick={closeMobile}
            >
              Testimonies Feed
            </Link>
          </li>
          <li>
            <Link href="/ads" className="mobile-nav-link" onClick={closeMobile}>
              Ministers & Countdown
            </Link>
          </li>
          <li>
            <Link href="/live" className="mobile-nav-link" onClick={closeMobile}>
              Live Broadcast
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className="mobile-nav-link"
              onClick={closeMobile}
            >
              Photo Gallery
            </Link>
          </li>
          <li>
            <Link href="/videos" className="mobile-nav-link" onClick={closeMobile}>
              Inspiring Moments
            </Link>
          </li>
          <li>
            <a
              href="mailto:info@onemillionmanworship.com"
              className="mobile-nav-link"
              onClick={closeMobile}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <Link
            href="/avatar"
            className="btn-primary"
            style={{ width: "100%", textAlign: "center" }}
            onClick={closeMobile}
          >
            <Sparkles size={16} /> Get Your Avatar
          </Link>
        </div>
      </aside>
    </>
  );
}
