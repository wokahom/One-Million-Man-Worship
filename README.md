# One Million Man Worship (1MMW) — Official Web Application

Official web platform for **One Million Man Worship** — a global worship movement uniting believers across cities and nations in praise to King Jesus.

Converted from a legacy static multi-page website into a high-performance, modern **Next.js 15 (App Router)** application with TypeScript and Vanilla CSS.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components & Client Hydration)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with modern tokens, glassmorphism, responsive drawer, animations
- **Backend / Database**: Firebase (Firestore, Analytics, Storage)
- **Interactive Avatar**: HTML5 Canvas with drag-and-drop, pinch/wheel zoom, clipping masks, and confetti celebration
- **Icons**: Lucide Icons & Custom SVG Brand Icons
- **Media**: YouTube oEmbed integration & Cloudinary media delivery

---

## 📂 Project Structure

```text
├── public/
│   ├── assets/              # Images, logos, minister slides, and event banners
│   ├── favicon.png          # App icon
│   └── logo.png             # Official 1MMW brand logo
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with GA script, Header, Footer, Cookie consent
│   │   ├── globals.css      # Design tokens, variables, typography, and responsive styles
│   │   ├── page.tsx         # Home page (Marquee, Media autoplay, Quick actions, About, Bus routes)
│   │   ├── about/page.tsx   # About movement page, pillars, and transport routes
│   │   ├── avatar/page.tsx  # Interactive Canvas Avatar Studio (Upload, Pinch-zoom, Drag, Download, WhatsApp)
│   │   ├── ads/page.tsx     # Ministers & Artistes carousel, live countdown, and promo video
│   │   ├── live/page.tsx    # Full live recording player with interactive sessions playlist
│   │   ├── videos/page.tsx  # Inspiring video clips and ministrations archive
│   │   ├── gallery/page.tsx # Masonry photo gallery with Lightbox modal and load-more
│   │   ├── testimony/page.tsx # Testimony submission form with Firebase Firestore
│   │   ├── testimonies/page.tsx # Realtime approved testimonies feed & live counter
│   │   └── admin/page.tsx   # Admin dashboard for reviewing and approving pending testimonies
│   ├── components/
│   │   ├── Header.tsx       # Responsive navigation with dropdown and mobile drawer
│   │   ├── Footer.tsx       # Brand footer with social links and contact
│   │   ├── Marquee.tsx      # Infinite ticker banner with interactive links
│   │   ├── CookieConsent.tsx# GDPR cookie consent with Google Analytics integration
│   │   ├── Countdown.tsx    # Responsive live countdown timer
│   │   ├── MediaAutoplay.tsx# Flyer-to-video autoplay with player controls
│   │   ├── MinisterSlider.tsx # Continuous carousel of anointed ministers
│   │   └── Icons.tsx        # Custom SVG icons for Instagram, YouTube, and TikTok
│   └── lib/
│       └── firebase.ts      # SSR-safe modular Firebase client initialization
├── legacy-static/           # Backup of original static HTML, CSS, and JS files
├── next.config.mjs          # Next.js configuration (Cloudinary and YouTube remote patterns)
├── tsconfig.json            # TypeScript configuration
└── package.json             # NPM dependencies and scripts
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🌟 Key Features

1. **Interactive Avatar Generator (`/avatar`)**:
   - Template overlay (1280x1280) with circular clipping mask
   - Smooth desktop dragging & mouse wheel zoom
   - Mobile touch dragging & two-finger pinch-to-zoom
   - One-click high-resolution PNG download with celebratory confetti
   - WhatsApp one-click share link
   - Firebase download and visit logging

2. **Live Broadcasts & Sessions (`/live` & `/videos`)**:
   - Responsive embedded YouTube players
   - Automatic video title fetching via oEmbed
   - Smooth fade transitions and playlist active state highlighting

3. **Real-time Testimonies (`/testimony` & `/testimonies`)**:
   - Testimony submission form with instant feedback
   - Live testimonies feed with total miracle counter
   - Admin approval desk (`/admin`) to approve or manage submissions

4. **Event Countdown & Ministers (`/ads`)**:
   - Live event countdown timer to December 19, 2025
   - Auto-scrolling minister carousel featuring 18 gospel artistes
   - Intro flyer and promotional video loop

5. **Photo Gallery (`/gallery`)**:
   - High-resolution Cloudinary photos
   - Interactive Lightbox with next/previous controls and keyboard navigation
