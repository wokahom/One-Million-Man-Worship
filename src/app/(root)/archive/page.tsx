import { Metadata } from "next";
import ArchiveClient from "./ArchiveClient";

export const metadata: Metadata = {
  title: "Previous Editions Archive | One Million Man Worship",
  description:
    "Explore the history, themes, minister rosters, media highlights, and testimonies of previous One Million Man Worship editions from 2024 to 2026.",
  openGraph: {
    title: "Previous Editions Archive | One Million Man Worship",
    description:
      "A permanent digital record of God's mighty move across Port Harcourt and the nations.",
    images: [{ url: "/assets/2026/1MMW 2026 MAIN TV.png", width: 1920, height: 1080 }],
  },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
