"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  MapPin,
  Check,
  Trash2,
  RefreshCw,
  Mail,
} from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

interface TestimonyRecord {
  id: string;
  name: string;
  location: string;
  testimony: string;
  email?: string;
  imageURL?: string;
  videoURL?: string;
  approved: boolean;
  createdAt?: string | number;
}

export default function AdminTestimoniesPage() {
  const [tab, setTab] = useState<"pending" | "approved">("pending");
  const [loading, setLoading] = useState(true);
  const [pendingTestimonies, setPendingTestimonies] = useState<TestimonyRecord[]>([]);
  const [approvedTestimonies, setApprovedTestimonies] = useState<TestimonyRecord[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const resPending = await fetch("/api/testimonies?approved=false");
      const dataPending = await resPending.json();
      let pendingList: TestimonyRecord[] = [];
      if (dataPending.success && Array.isArray(dataPending.data)) {
        pendingList = dataPending.data.map((d: Record<string, unknown>) => ({
          id: (d._id as string) || (d.id as string),
          name: d.name as string,
          location: d.location as string,
          testimony: d.testimony as string,
          email: d.email as string | undefined,
          imageURL: d.imageURL as string | undefined,
          videoURL: d.videoURL as string | undefined,
          approved: false,
          createdAt: d.createdAt as string | number | undefined,
        }));
      }

      if (db) {
        try {
          const q = query(collection(db, "testimonies"), where("approved", "==", false));
          const snapshot = await getDocs(q);
          const fsItems: TestimonyRecord[] = [];
          snapshot.forEach((d) => {
            fsItems.push({
              id: d.id,
              approved: false,
              ...(d.data() as Omit<TestimonyRecord, "id" | "approved">),
            });
          });
          const existingIds = new Set(pendingList.map((p) => p.id));
          fsItems.forEach((f) => {
            if (!existingIds.has(f.id)) pendingList.push(f);
          });
        } catch {}
      }
      setPendingTestimonies(pendingList);

      const resApproved = await fetch("/api/testimonies?approved=true");
      const dataApproved = await resApproved.json();
      if (dataApproved.success && Array.isArray(dataApproved.data)) {
        const approvedList: TestimonyRecord[] = dataApproved.data.map((d: Record<string, unknown>) => ({
          id: (d._id as string) || (d.id as string),
          name: d.name as string,
          location: d.location as string,
          testimony: d.testimony as string,
          email: d.email as string | undefined,
          imageURL: d.imageURL as string | undefined,
          videoURL: d.videoURL as string | undefined,
          approved: true,
          createdAt: d.createdAt as string | number | undefined,
        }));
        setApprovedTestimonies(approvedList);
      }
    } catch {
      toast.error("Failed to load testimonies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approveTestimony = async (id: string) => {
    try {
      await fetch(`/api/testimonies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });
      if (db) {
        try {
          await updateDoc(doc(db, "testimonies", id), { approved: true });
        } catch {}
      }
      const itemToMove = pendingTestimonies.find((t) => t.id === id);
      if (itemToMove) {
        setPendingTestimonies((prev) => prev.filter((t) => t.id !== id));
        setApprovedTestimonies((prev) => [{ ...itemToMove, approved: true }, ...prev]);
      }
      toast.success("Testimony approved and published!");
    } catch {
      toast.error("Failed to approve testimony");
    }
  };

  const unapproveTestimony = async (id: string) => {
    try {
      await fetch(`/api/testimonies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: false }),
      });
      if (db) {
        try {
          await updateDoc(doc(db, "testimonies", id), { approved: false });
        } catch {}
      }
      const itemToMove = approvedTestimonies.find((t) => t.id === id);
      if (itemToMove) {
        setApprovedTestimonies((prev) => prev.filter((t) => t.id !== id));
        setPendingTestimonies((prev) => [{ ...itemToMove, approved: false }, ...prev]);
      }
      toast.info("Moved back to pending moderation");
    } catch {
      toast.error("Failed to unapprove testimony");
    }
  };

  const deleteTestimony = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimony?")) return;
    try {
      await fetch(`/api/testimonies/${id}`, { method: "DELETE" });
      if (db) {
        try {
          await deleteDoc(doc(db, "testimonies", id));
        } catch {}
      }
      setPendingTestimonies((prev) => prev.filter((t) => t.id !== id));
      setApprovedTestimonies((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimony deleted");
    } catch {
      toast.error("Failed to delete testimony");
    }
  };

  const currentList = tab === "pending" ? pendingTestimonies : approvedTestimonies;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Moderation Center</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Testimonies Moderation
          </h1>
        </div>
        <Button
          onClick={loadData}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <Button
          variant={tab === "pending" ? "default" : "ghost"}
          onClick={() => setTab("pending")}
          className={
            tab === "pending"
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              : "text-slate-400"
          }
        >
          Pending Review ({pendingTestimonies.length})
        </Button>
        <Button
          variant={tab === "approved" ? "default" : "ghost"}
          onClick={() => setTab("approved")}
          className={
            tab === "approved"
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              : "text-slate-400"
          }
        >
          Approved & Published ({approvedTestimonies.length})
        </Button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
            No testimonies in this category.
          </div>
        ) : (
          currentList.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {t.imageURL && (
                  <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
                    <Image src={t.imageURL} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base">{t.name}</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </span>
                    {t.email && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {t.email}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 mt-1">&ldquo;{t.testimony}&rdquo;</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {tab === "pending" ? (
                  <Button
                    size="sm"
                    onClick={() => approveTestimony(t.id)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => unapproveTestimony(t.id)}
                    className="border-slate-700 text-slate-300"
                  >
                    Revoke
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTestimony(t.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
