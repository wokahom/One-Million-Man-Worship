import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "News & Articles | One Million Man Worship",
  description:
    "Official news, announcements, recaps, and faith articles from One Million Man Worship, Port Harcourt.",
  openGraph: {
    title: "News & Articles | One Million Man Worship",
    description: "Official news and spiritual insights from One Million Man Worship.",
    images: [{ url: "/assets/2026/1MMW 2026 MAIN TV.png", width: 1920, height: 1080 }],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
