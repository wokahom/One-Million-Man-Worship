"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface VolunteerRecord {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  experience?: string;
  availability: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVolunteers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/volunteers");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setVolunteers(json.data);
      }
    } catch {
      toast.error("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVolunteers();
  }, [loadVolunteers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Workforce Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Volunteer Applications
          </h1>
        </div>
        <Button
          onClick={loadVolunteers}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <p className="text-sm text-slate-400">
        Applications submitted across the 10 workforce departments for One Million Man Worship 2026.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-xs uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {volunteers.map((vol) => (
              <tr key={vol._id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-medium text-white">{vol.fullName}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    {vol.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  <div>{vol.email}</div>
                  <div>{vol.phone}</div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-300 max-w-xs truncate">
                  {vol.experience || "None specified"}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {new Date(vol.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
