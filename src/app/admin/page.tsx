"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Check,
  RefreshCw,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
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

interface PendingTestimony {
  id: string;
  name: string;
  location: string;
  testimony: string;
  email?: string;
  imageURL?: string;
  videoURL?: string;
  createdAt?: number;
}

export default function AdminPage() {
  const [pendingList, setPendingList] = useState<PendingTestimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const loadPending = async () => {
    if (!db) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const q = query(
        collection(db, "testimonies"),
        where("approved", "==", false)
      );
      const snapshot = await getDocs(q);
      const items: PendingTestimony[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...(d.data() as Omit<PendingTestimony, "id">) });
      });
      setPendingList(items);
    } catch {
      // Security rules or offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approveTestimony = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "testimonies", id), { approved: true });
      setActionMessage("Testimony approved and published!");
      setTimeout(() => setActionMessage(""), 3500);
      loadPending();
    } catch {
      setActionMessage("Could not approve testimony. Check Firestore permissions.");
    }
  };

  const rejectTestimony = async (id: string) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, "testimonies", id));
      setActionMessage("Testimony removed.");
      setTimeout(() => setActionMessage(""), 3500);
      loadPending();
    } catch {
      setActionMessage("Could not remove testimony.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 50, paddingBottom: 80 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 36,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(229, 57, 53, 0.2)",
              color: "#f87171",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            <ShieldAlert size={14} /> Moderation Desk
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Pending Testimonies Moderation
          </h1>
        </div>

        <button
          type="button"
          onClick={loadPending}
          className="btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <RefreshCw size={16} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {actionMessage && (
        <div
          style={{
            marginBottom: 24,
            padding: 14,
            borderRadius: 12,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
          Loading pending submissions from Firestore...
        </div>
      ) : pendingList.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "rgba(18, 18, 24, 0.6)",
            border: "1px dashed rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
          }}
        >
          <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: 16 }} />
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            No Pending Testimonies
          </h3>
          <p style={{ color: "#94a3b8", maxWidth: 440, margin: "0 auto 20px" }}>
            All incoming testimonies have been reviewed and published.
          </p>
          <Link href="/testimonies" className="btn-secondary">
            View Approved Testimonies Feed
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {pendingList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(18, 18, 24, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 18,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      background: "rgba(245, 158, 11, 0.15)",
                      color: "#fbbf24",
                      padding: "3px 8px",
                      borderRadius: 10,
                      fontWeight: 700,
                    }}
                  >
                    PENDING
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  <MapPin size={13} color="#f87171" />
                  {item.location}
                  {item.email && ` • ${item.email}`}
                </p>

                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: 12,
                    borderRadius: 10,
                  }}
                >
                  {item.testimony}
                </p>

                {item.imageURL && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 180,
                      marginTop: 12,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.imageURL}
                      alt="Attached media"
                      fill
                      sizes="340px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => approveTestimony(item.id)}
                  style={{
                    flex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                  }}
                >
                  <Check size={16} /> Approve
                </button>
                <button
                  type="button"
                  onClick={() => rejectTestimony(item.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#ef4444",
                    borderRadius: 8,
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
