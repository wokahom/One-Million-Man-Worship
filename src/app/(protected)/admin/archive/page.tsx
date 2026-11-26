"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  ExternalLink,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface EditionRecord {
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
  isPublished: boolean;
}

export default function AdminArchivePage() {
  const [editions, setEditions] = useState<EditionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEdition, setEditingEdition] = useState<Partial<EditionRecord> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadEditions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/editions");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEditions(json.data);
      }
    } catch {
      toast.error("Failed to load archive editions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEditions();
  }, [loadEditions]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const saveEdition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdition?.year || !editingEdition?.theme) {
      toast.error("Year and Theme are required");
      return;
    }

    try {
      const isNew = !editingEdition._id;
      const url = isNew ? "/api/editions" : `/api/editions/${editingEdition._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEdition),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success(isNew ? "Archive edition created!" : "Edition updated!");
      setIsModalOpen(false);
      setEditingEdition(null);
      loadEditions();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save edition");
    }
  };

  const deleteEdition = async (id: string) => {
    if (!confirm("Are you sure you want to delete this edition from the archive?")) return;
    try {
      const res = await fetch(`/api/editions/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setEditions((prev) => prev.filter((ed) => ed._id !== id));
      toast.success("Edition deleted");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete edition");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Historical Archives</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Previous Editions Archive
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              setEditingEdition({
                year: "2027",
                editionNumber: "5th Edition",
                theme: "",
                dates: "December 2027",
                venue: "Yakubu Gowon Stadium, Elekahia, Port Harcourt",
                attendance: "1,000,000+ Worshippers",
                description: "",
                ministers: [],
                highlights: [],
                mediaPhotos: [],
                mediaVideos: [],
                isPublished: true,
              });
              setIsModalOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
          >
            <Plus className="w-4 h-4 mr-1.5" /> New Edition
          </Button>
          <Button
            onClick={loadEditions}
            variant="outline"
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Permanent digital record of event themes, roster of ministers, venues, and media.
        </p>
        <Link
          href="/archive"
          target="_blank"
          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
        >
          View Public Archive <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {editions.map((ed) => (
          <div
            key={ed._id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {ed.editionNumber}
                  </span>
                  <span className="text-xl font-black text-white">{ed.year}</span>
                </div>
                <h3 className="text-lg font-bold text-amber-400 mt-1">Theme: {ed.theme}</h3>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingEdition(ed);
                    setIsModalOpen(true);
                  }}
                  className="text-slate-300 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteEdition(ed._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2">{ed.description}</p>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500 block">Dates:</span>
                <span className="font-medium">{ed.dates}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Attendance:</span>
                <span className="font-medium text-amber-300">{ed.attendance || "N/A"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Ministers:</span>
                <span className="font-medium">
                  {ed.ministers?.length ? ed.ministers.join(", ") : "None listed"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CRUD */}
      {isModalOpen && editingEdition && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 space-y-6 max-h-[90vh] overflow-y-auto cursor-default shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {editingEdition._id ? "Edit Archived Edition" : "New Archive Record"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveEdition} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Year</label>
                  <input
                    type="text"
                    required
                    value={editingEdition.year || ""}
                    onChange={(e) => setEditingEdition({ ...editingEdition, year: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Edition Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEdition.editionNumber || ""}
                    onChange={(e) =>
                      setEditingEdition({ ...editingEdition, editionNumber: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Theme</label>
                <input
                  type="text"
                  required
                  value={editingEdition.theme || ""}
                  onChange={(e) => setEditingEdition({ ...editingEdition, theme: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Dates</label>
                  <input
                    type="text"
                    required
                    value={editingEdition.dates || ""}
                    onChange={(e) => setEditingEdition({ ...editingEdition, dates: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Attendance
                  </label>
                  <input
                    type="text"
                    value={editingEdition.attendance || ""}
                    onChange={(e) =>
                      setEditingEdition({ ...editingEdition, attendance: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={editingEdition.venue || ""}
                  onChange={(e) => setEditingEdition({ ...editingEdition, venue: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingEdition.description || ""}
                  onChange={(e) =>
                    setEditingEdition({ ...editingEdition, description: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Ministers (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingEdition.ministers?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingEdition({
                      ...editingEdition,
                      ministers: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
