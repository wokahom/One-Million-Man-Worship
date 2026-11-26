"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface PrayerRecord {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  request: string;
  category: string;
  isAnonymous: boolean;
  status: "new" | "prayed" | "archived";
  createdAt: string;
}

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPrayers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/prayer");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPrayers(json.data);
      }
    } catch {
      toast.error("Failed to load prayer requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrayers();
  }, [loadPrayers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Intercessory Ministry</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Prayer Requests & Petitions
          </h1>
        </div>
        <Button
          onClick={loadPrayers}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {prayers.map((prayer) => (
          <div
            key={prayer._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">
                  {prayer.isAnonymous ? "Anonymous Intercession" : prayer.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                  {prayer.category}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(prayer.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              &ldquo;{prayer.request}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
