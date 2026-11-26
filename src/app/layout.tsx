import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://onemillionmanworship.com"),
  title: {
    default: "One Million Man Worship 2026 | 4th Edition - Port Harcourt",
    template: "%s | One Million Man Worship 2026",
  },
  description:
    "Official One Million Man Worship 2026 (4th Edition). 3 Days • One God • One Sound • One Stage. December 18-20, 2026 at Yakubu Gowon Stadium, Elekahia, Port Harcourt. Create your 2026 avatar, watch live broadcasts, and submit testimonies.",
  keywords: [
    "One Million Man Worship 2026",
    "1MMW 2026",
    "Avatar Generator 2026",
    "Gospel Worship Port Harcourt",
    "Yakubu Gowon Stadium Worship",
    "Port Harcourt Worship Movement",
    "Praise and Worship Nigeria",
    "Dr Paul Enenche",
    "Dunsin Oyekan",
    "Tye Tribbett",
    "Min GUC",
  ],
  authors: [{ name: "One Million Man Worship" }],
  openGraph: {
    type: "website",
    url: "https://onemillionmanworship.com",
    title: "One Million Man Worship 2026 | 4th Edition",
    description:
      "Join over 1,000,000 believers on December 18-20, 2026 at Yakubu Gowon Stadium, Port Harcourt. Create your official 2026 avatar now!",
    images: [
      {
        url: "/assets/2026/1MMW 2026 MAIN TV.png",
        width: 1280,
        height: 720,
        alt: "One Million Man Worship 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Million Man Worship 2026 | 4th Edition",
    description:
      "3 Days • One God • One Sound • One Stage. December 18-20, 2026 at Yakubu Gowon Stadium, Elekahia, Port Harcourt. Free Access.",
    images: ["/assets/2026/1MMW 2026 MAIN TV.png"],
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
                  var theme = saved || 'light';
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
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
