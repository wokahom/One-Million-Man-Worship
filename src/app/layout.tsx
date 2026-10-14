import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://onemillionmanworship.com"),
  title: {
    default: "One Million Man Worship | Official Website",
    template: "%s | One Million Man Worship",
  },
  description:
    "Official One Million Man Worship movement. Create your official 2025 avatar, watch live recordings, submit testimonies, and experience the presence of God.",
  keywords: [
    "One Million Man Worship",
    "1MMW",
    "Avatar Generator 2025",
    "Gospel Worship",
    "Worship Movement",
    "Port Harcourt Worship",
    "Praise and Worship",
  ],
  authors: [{ name: "One Million Man Worship" }],
  openGraph: {
    type: "website",
    url: "https://onemillionmanworship.com",
    title: "One Million Man Worship",
    description:
      "Create your official One Million Man Worship avatar instantly and join believers worldwide in worship.",
    images: [
      {
        url: "/assets/images/share-preview.jpg",
        width: 1200,
        height: 630,
        alt: "One Million Man Worship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Million Man Worship",
    description:
      "Create your official One Million Man Worship avatar instantly and join believers worldwide in worship.",
    images: ["/assets/images/share-preview.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Theme Initializer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('1mmw_theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Google Analytics & Consent Mode */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KGCY1P8LVH"
        />
        <Script id="google-analytics-consent" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            gtag('js', new Date());
            gtag('config', 'G-KGCY1P8LVH');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
