"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Check,
  RefreshCw,
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
import { motion, AnimatePresence } from "motion/react";

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
    <div style={{ position: "relative", overflow: "hidden", minHeight: "80vh" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.1) 0%, transparent 70%)",
          top: -100,
          left: -100,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          bottom: 40,
          right: -100,
        }}
      />

      <div className="container" style={{ paddingTop: 50, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
            paddingBottom: 20,
            borderBottom: "1px solid var(--border-glass)",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(229, 57, 53, 0.15)",
                color: "var(--primary-red)",
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
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Pending Testimonies Moderation
            </h1>
          </div>

          <motion.button
            type="button"
            onClick={loadPending}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <RefreshCw size={16} />
            <span>Refresh Queue</span>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
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
            </motion.div>
          )}
        </AnimatePresence>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
          Loading pending submissions from Firestore...
        </div>
      ) : pendingList.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "var(--bg-card)",
            border: "1px dashed var(--border-glass)",
            borderRadius: 20,
            boxShadow: "var(--card-shadow)",
          }}
        >
          <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: 16 }} />
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            No Pending Testimonies
          </h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto 20px" }}>
            All incoming testimonies have been reviewed and published.
          </p>
          <Link href="/testimonies" className="btn-secondary">
            View Approved Testimonies Feed
          </Link>
        </motion.div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          <AnimatePresence>
            {pendingList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.3) }}
                whileHover={{ y: -4 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "var(--card-shadow)",
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
                        color: "var(--text-primary)",
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
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    <MapPin size={13} color="var(--primary-red)" />
                    {item.location}
                    {item.email && ` • ${item.email}`}
                  </p>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-primary)",
                      lineHeight: 1.6,
                      background: "var(--bg-card-secondary)",
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
                  <motion.button
                    type="button"
                    onClick={() => approveTestimony(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => rejectTestimony(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      </div>
    </div>
  );
}
