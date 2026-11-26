"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface SubscriberRecord {
  _id: string;
  email: string;
  name?: string;
  source: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setSubscribers(json.data);
      }
    } catch {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubscribers();
  }, [loadSubscribers]);

  const exportCSV = () => {
    const csv =
      "Email,Name,Source,Status,Date\n" +
      subscribers
        .map(
          (s) =>
            `"${s.email}","${s.name || ""}","${s.source}","${s.status}","${new Date(
              s.createdAt
            ).toLocaleDateString()}"`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `1mmw-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Broadcast List</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Newsletter Subscribers
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={exportCSV}
            variant="outline"
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 mr-1.5" /> Export CSV
          </Button>
          <Button
            onClick={loadSubscribers}
            variant="outline"
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-xs uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Subscriber Email</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Subscribed At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {subscribers.map((sub) => (
              <tr key={sub._id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-medium text-white">{sub.email}</td>
                <td className="px-6 py-4 text-xs text-slate-400">{sub.source}</td>
                <td className="px-6 py-4">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
