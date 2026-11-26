"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
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
  HeartHandshake,
} from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { YoutubeIcon, TikTokIcon, FacebookIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

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
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <Sparkles size={14} color="var(--primary-gold)" />
                  <span>Avatar 2026</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className={`nav-link ${isActive("/volunteer") ? "active" : ""}`}
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/testimony"
                  className={`nav-link ${isActive("/testimony") ? "active" : ""}`}
                >
                  Testimonies
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
                      <Users size={15} /> 2026 Ministers Lineup
                    </span>
                  </Link>
                  <Link
                    href="/live"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Tv size={15} /> 2026 Live Broadcast
                    </span>
                  </Link>
                  <Link
                    href="/prayer"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <HeartHandshake size={15} /> Prayer Requests
                    </span>
                  </Link>
                  <Link
                    href="/testimonies"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MessageSquareHeart size={15} /> Testimonies Archive
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
                  <Radio size={14} /> LIVE 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                >
                  Contact & Logistics
                </Link>
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
                title="Instagram (@onemillionmanworship_ph)"
              >
                <BsInstagram size={16} />
              </a>
              <a
                href="https://facebook.com/onemillionmanworship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Facebook (@onemillionmanworship)"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://youtube.com/@onemillionmanworship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube (@onemillionmanworship)"
              >
                <YoutubeIcon size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@onemillionmanworship"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="TikTok (@onemillionmanworship)"
              >
                <TikTokIcon size={14} />
              </a>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

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

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="drawer-overlay open"
              onClick={closeMobile}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="mobile-drawer open"
            >
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
                    Home (2026 Edition)
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="mobile-nav-link" onClick={closeMobile}>
                    About 1MMW
                  </Link>
                </li>
                <li>
                  <Link href="/avatar" className="mobile-nav-link" onClick={closeMobile}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Sparkles size={16} color="var(--primary-gold)" />
                      Create 2026 Avatar
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className="mobile-nav-link" onClick={closeMobile}>
                    Volunteer Registration
                  </Link>
                </li>
                <li>
                  <Link href="/live" className="mobile-nav-link" onClick={closeMobile}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Radio size={14} color="#ef4444" />
                      2026 Live Broadcast
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/ads" className="mobile-nav-link" onClick={closeMobile}>
                    2026 Ministers & Artistes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimony"
                    className="mobile-nav-link"
                    onClick={closeMobile}
                  >
                    Share Testimony
                  </Link>
                </li>
                <li>
                  <Link
                    href="/prayer"
                    className="mobile-nav-link"
                    onClick={closeMobile}
                  >
                    Submit Prayer Request
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
                  <Link
                    href="/gallery"
                    className="mobile-nav-link"
                    onClick={closeMobile}
                  >
                    Photo Gallery (2026 & Past)
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="mobile-nav-link" onClick={closeMobile}>
                    Inspiring Moments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`}
                    onClick={closeMobile}
                  >
                    Contact & Transit Logistics
                  </Link>
                </li>
              </ul>

              <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <ThemeToggle showLabel />
                <Link
                  href="/avatar"
                  className="btn-primary"
                  style={{ width: "100%", textAlign: "center", justifyContent: "center" }}
                  onClick={closeMobile}
                >
                  <Sparkles size={16} /> Get Your Avatar
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
