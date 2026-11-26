"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Video,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Edition {
  _id: string;
  year: string;
  theme: string;
  editionNumber: string;
  dates: string;
  venue: string;
  attendance?: string;
  description: string;
  ministers: string[];
  highlights: string[];
  mediaPhotos: string[];
  mediaVideos: { title: string; url: string; platform?: string }[];
  programs?: string[];
  bannerUrl?: string;
}

export default function ArchiveClient() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEditions() {
      try {
        const res = await fetch("/api/editions");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setEditions(json.data);
          setSelectedYear(json.data[0].year);
        }
      } catch (err) {
        console.error("Failed to load editions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEditions();
  }, []);

  const currentEdition = editions.find((e) => e.year === selectedYear) || editions[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-amber-400 selection:text-slate-950">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 to-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Digital History & Milestones
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase"
          >
            Previous <span className="text-amber-400">Editions</span> Archive
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            A permanent digital record celebrating God’s faithfulness through the years — from
            humble beginnings to a million voices raised in one accord.
          </motion.p>
        </div>

        {/* Edition Selector Tabs */}
        <div className="flex justify-center gap-3 mb-14 overflow-x-auto pb-2">
          {editions.map((ed) => {
            const isSelected = ed.year === selectedYear;
            return (
              <button
                key={ed.year}
                onClick={() => setSelectedYear(ed.year)}
                className={`relative px-6 py-3 rounded-2xl font-bold text-sm md:text-base transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span>{ed.year}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-slate-950/20 text-slate-950 font-black" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {ed.editionNumber}
                </span>
              </button>
            );
          })}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="p-12 text-center text-slate-500 animate-pulse">
            Loading archive records...
          </div>
        )}

        {/* Main Edition Showcase */}
        {!loading && currentEdition && (
          <motion.div
            key={currentEdition.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                      {currentEdition.editionNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {currentEdition.dates}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                      Official Theme
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                      &ldquo;{currentEdition.theme}&rdquo;
                    </h2>
                  </div>

                  <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                    {currentEdition.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Gathering Venue</span>
                        <span className="text-sm font-semibold text-white">{currentEdition.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Estimated Attendance</span>
                        <span className="text-sm font-semibold text-white">
                          {currentEdition.attendance || "Tens of thousands"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner / Poster Preview */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                    <Image
                      src={
                        currentEdition.bannerUrl ||
                        (currentEdition.year === "2026"
                          ? "/assets/2026/1MMW 2026 MAIN SQ.png"
                          : "/assets/banner.jpg")
                      }
                      alt={`${currentEdition.year} Theme Banner`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">
                        {currentEdition.year} Official Poster
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold">1MMW Record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Ministers & Artistes */}
            {currentEdition.ministers && currentEdition.ministers.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Guest Ministers & Music Artistes</h3>
                    <p className="text-xs text-slate-400">
                      Vessels anointed to minister on the altar for the {currentEdition.year} edition.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentEdition.ministers.map((minister, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 hover:border-amber-500/40 transition"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="font-semibold text-slate-200 text-sm">{minister}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights & Milestones */}
            {currentEdition.highlights && currentEdition.highlights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentEdition.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-slate-700 transition"
                  >
                    <div className="text-3xl font-black text-amber-400/20 group-hover:text-amber-400/40 transition">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">Milestone Highlight</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Video Recordings */}
            {currentEdition.mediaVideos && currentEdition.mediaVideos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Broadcast Highlights & Sessions</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentEdition.mediaVideos.map((vid, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
                    >
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 relative">
                        <iframe
                          src={vid.url}
                          title={vid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white">{vid.title}</span>
                        <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                          {vid.platform || "YouTube"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery Shortcut */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-white">Explore Full Photo Gallery</h4>
                <p className="text-xs text-slate-400">
                  Browse high-definition captures of the crowd, altars, and ministers by year.
                </p>
              </div>
              <Link href="/gallery">
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
                  View Photo Gallery <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
