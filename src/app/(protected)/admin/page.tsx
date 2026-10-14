"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Check,
  RefreshCw,
  MapPin,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
  Clock,
  RotateCcw,
  ExternalLink,
  Layers,
  Inbox,
  Filter,
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
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
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

interface ContactRecord {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
}

type TabType = "overview" | "pending" | "approved" | "contacts";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [loading, setLoading] = useState(true);

  // Data states
  const [pendingTestimonies, setPendingTestimonies] = useState<TestimonyRecord[]>([]);
  const [approvedTestimonies, setApprovedTestimonies] = useState<TestimonyRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [contactFilter, setContactFilter] = useState<"all" | "new" | "read">("all");

  // Load testimonies from API and Firestore
  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Fetch pending testimonies from API
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

      // Merge with Firestore if configured
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

      // 2. Fetch approved testimonies from API
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

      // 3. Fetch contact inquiries from API
      const resContacts = await fetch("/api/contact?status=all");
      const dataContacts = await resContacts.json();
      if (dataContacts.success && Array.isArray(dataContacts.data)) {
        setContacts(dataContacts.data);
      }
    } catch (err) {
      console.error("Admin data loading error:", err);
      toast.error("Error refreshing data", {
        description: "Could not fetch all records. Check network or database connection.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Actions: Approve Testimony
  const approveTestimony = async (id: string) => {
    try {
      // API call
      await fetch(`/api/testimonies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });

      // Also update Firestore if exists
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

      toast.success("Testimony approved!", {
        description: "The testimony is now published on the testimonies feed.",
      });
    } catch {
      toast.error("Failed to approve testimony.");
    }
  };

  // Actions: Unapprove Testimony (Send back to pending)
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

      toast.info("Testimony moved to pending moderation.");
    } catch {
      toast.error("Failed to unapprove testimony.");
    }
  };

  // Actions: Delete Testimony
  const deleteTestimony = async (id: string) => {
    try {
      await fetch(`/api/testimonies/${id}`, { method: "DELETE" });

      if (db) {
        try {
          await deleteDoc(doc(db, "testimonies", id));
        } catch {}
      }

      setPendingTestimonies((prev) => prev.filter((t) => t.id !== id));
      setApprovedTestimonies((prev) => prev.filter((t) => t.id !== id));

      toast.success("Testimony deleted.");
    } catch {
      toast.error("Failed to delete testimony.");
    }
  };

  // Actions: Update Contact Status
  const updateContactStatus = async (id: string, newStatus: "new" | "read" | "archived") => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        toast.success(`Message marked as ${newStatus}.`);
      }
    } catch {
      toast.error("Failed to update message status.");
    }
  };

  // Actions: Delete Contact
  const deleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        toast.success("Message removed.");
      }
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (contactFilter === "new") return c.status === "new";
    if (contactFilter === "read") return c.status === "read" || c.status === "replied";
    return true;
  });

  const unreadCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "85vh" }}>
      {/* Ambient background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.1) 0%, transparent 70%)",
          top: -100,
          left: -100,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          bottom: 40,
          right: -100,
        }}
      />

      <div className="container" style={{ paddingTop: 45, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Header Bar */}
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
            marginBottom: 32,
            paddingBottom: 22,
            borderBottom: "1px solid var(--border-glass)",
          }}
        >
          <div>
            <div style={{ display: "inline-block", marginBottom: 6 }}>
              <Badge variant="warning">
                <ShieldAlert size={13} /> Administration & Moderation
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              1MMW Operations Desk
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "6px 0 0" }}>
              Review public testimony submissions, respond to contact inquiries, and monitor ministry engagement.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button
              type="button"
              variant="outline"
              onClick={loadData}
              disabled={loading}
              size="sm"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              <span>{loading ? "Refreshing..." : "Refresh Queue"}</span>
            </Button>
            <Link href="/testimonies">
              <Button variant="ghost" size="sm">
                <span>View Live Site</span>
                <ExternalLink size={14} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tab Navigation Navigation Strip */}
        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
            marginBottom: 28,
            borderBottom: "1px solid var(--border-glass)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
              background: activeTab === "overview" ? "var(--primary-red)" : "var(--bg-card)",
              color: activeTab === "overview" ? "#ffffff" : "var(--text-secondary)",
              border: activeTab === "overview" ? "1px solid var(--primary-red)" : "1px solid var(--border-glass)",
            }}
          >
            <Layers size={16} /> Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
              background: activeTab === "pending" ? "var(--primary-red)" : "var(--bg-card)",
              color: activeTab === "pending" ? "#ffffff" : "var(--text-secondary)",
              border: activeTab === "pending" ? "1px solid var(--primary-red)" : "1px solid var(--border-glass)",
            }}
          >
            <Clock size={16} />
            <span>Pending Testimonies</span>
            {pendingTestimonies.length > 0 && (
              <span
                style={{
                  background: activeTab === "pending" ? "#ffffff" : "rgba(229, 57, 53, 0.2)",
                  color: activeTab === "pending" ? "var(--primary-red)" : "var(--primary-red)",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                }}
              >
                {pendingTestimonies.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("approved")}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
              background: activeTab === "approved" ? "var(--primary-red)" : "var(--bg-card)",
              color: activeTab === "approved" ? "#ffffff" : "var(--text-secondary)",
              border: activeTab === "approved" ? "1px solid var(--primary-red)" : "1px solid var(--border-glass)",
            }}
          >
            <CheckCircle2 size={16} />
            <span>Approved Testimonies</span>
            <span
              style={{
                background: activeTab === "approved" ? "#ffffff" : "var(--bg-card-secondary)",
                color: activeTab === "approved" ? "var(--primary-red)" : "var(--text-secondary)",
                padding: "2px 8px",
                borderRadius: 12,
                fontSize: "0.75rem",
                fontWeight: 800,
              }}
            >
              {approvedTestimonies.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
              background: activeTab === "contacts" ? "var(--primary-red)" : "var(--bg-card)",
              color: activeTab === "contacts" ? "#ffffff" : "var(--text-secondary)",
              border: activeTab === "contacts" ? "1px solid var(--primary-red)" : "1px solid var(--border-glass)",
            }}
          >
            <Inbox size={16} />
            <span>Contact Inquiries</span>
            {unreadCount > 0 && (
              <span
                style={{
                  background: activeTab === "contacts" ? "#ffffff" : "#f59e0b",
                  color: activeTab === "contacts" ? "var(--primary-red)" : "#ffffff",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                }}
              >
                {unreadCount} new
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Metric Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 20,
                  padding: "22px 20px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Pending Review
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#f59e0b", marginTop: 4 }}>
                  {pendingTestimonies.length}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  Awaiting administrator verification
                </p>
              </div>

              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 20,
                  padding: "22px 20px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Live Testimonies
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#10b981", marginTop: 4 }}>
                  {approvedTestimonies.length}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  Published and publicly visible
                </p>
              </div>

              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 20,
                  padding: "22px 20px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Total Inquiries
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text-primary)", marginTop: 4 }}>
                  {contacts.length}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  Messages from contact page
                </p>
              </div>

              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: 20,
                  padding: "22px 20px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                  Unread Messages
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--primary-red)", marginTop: 4 }}>
                  {unreadCount}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  Requires attention or reply
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 22,
                padding: "30px 26px",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                Quick Navigation & Database Operations
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: 20 }}>
                Jump to specific administrative sections to moderate or reply to attendees.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="default" onClick={() => setActiveTab("pending")}>
                  Moderate Pending ({pendingTestimonies.length})
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("contacts")}>
                  Read Contact Messages ({contacts.length})
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("approved")}>
                  Inspect Approved Testimonies ({approvedTestimonies.length})
                </Button>
                <Link href="/contact">
                  <Button variant="ghost">Test Contact Us Form</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: PENDING TESTIMONIES */}
        {activeTab === "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {pendingTestimonies.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "70px 20px",
                  background: "var(--bg-card)",
                  border: "1px dashed var(--border-glass)",
                  borderRadius: 22,
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <CheckCircle2 size={46} color="#10b981" style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                  Moderation Queue Clean!
                </h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto 20px", fontSize: "0.92rem" }}>
                  All incoming testimonies have been reviewed and published.
                </p>
                <Button variant="secondary" onClick={() => setActiveTab("approved")}>
                  View Published Testimonies
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: 20,
                }}
              >
                <AnimatePresence>
                  {pendingTestimonies.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 20,
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
                            marginBottom: 8,
                          }}
                        >
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                            {item.name}
                          </h3>
                          <Badge variant="warning">Pending</Badge>
                        </div>

                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 12,
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
                            padding: 14,
                            borderRadius: 12,
                            fontStyle: "italic",
                          }}
                        >
                          &ldquo;{item.testimony}&rdquo;
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
                              alt="Attached proof"
                              fill
                              sizes="340px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => approveTestimony(item.id)}
                          style={{ flex: 1 }}
                        >
                          <Check size={16} /> Approve & Publish
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => deleteTestimony(item.id)}
                          size="icon"
                          aria-label="Delete testimony"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: APPROVED TESTIMONIES */}
        {activeTab === "approved" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 20,
              }}
            >
              <AnimatePresence>
                {approvedTestimonies.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: 20,
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
                          marginBottom: 8,
                        }}
                      >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                          {item.name}
                        </h3>
                        <Badge variant="success">Published</Badge>
                      </div>

                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 12,
                        }}
                      >
                        <MapPin size={13} color="var(--primary-red)" />
                        {item.location}
                      </p>

                      <p
                        style={{
                          fontSize: "0.92rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.6,
                          background: "var(--bg-card-secondary)",
                          padding: 14,
                          borderRadius: 12,
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
                            alt="Attached proof"
                            fill
                            sizes="340px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => unapproveTestimony(item.id)}
                        style={{ flex: 1 }}
                      >
                        <RotateCcw size={15} /> Unpublish
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => deleteTestimony(item.id)}
                        size="icon"
                        aria-label="Delete testimony"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB 4: CONTACT INQUIRIES */}
        {activeTab === "contacts" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Filter Pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
              <Filter size={16} color="var(--text-secondary)" />
              <button
                type="button"
                onClick={() => setContactFilter("all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: 12,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: contactFilter === "all" ? "var(--primary-red)" : "var(--bg-card-secondary)",
                  color: contactFilter === "all" ? "#fff" : "var(--text-secondary)",
                  border: "none",
                }}
              >
                All ({contacts.length})
              </button>
              <button
                type="button"
                onClick={() => setContactFilter("new")}
                style={{
                  padding: "6px 14px",
                  borderRadius: 12,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: contactFilter === "new" ? "var(--primary-red)" : "var(--bg-card-secondary)",
                  color: contactFilter === "new" ? "#fff" : "var(--text-secondary)",
                  border: "none",
                }}
              >
                New / Unread ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setContactFilter("read")}
                style={{
                  padding: "6px 14px",
                  borderRadius: 12,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: contactFilter === "read" ? "var(--primary-red)" : "var(--bg-card-secondary)",
                  color: contactFilter === "read" ? "#fff" : "var(--text-secondary)",
                  border: "none",
                }}
              >
                Read & Archived
              </button>
            </div>

            {filteredContacts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "70px 20px",
                  background: "var(--bg-card)",
                  border: "1px dashed var(--border-glass)",
                  borderRadius: 22,
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <Inbox size={46} color="var(--text-secondary)" style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                  No Messages Found
                </h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto", fontSize: "0.92rem" }}>
                  There are no inquiries matching your selected filter. All messages submitted on the Contact Us page appear here.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <AnimatePresence>
                  {filteredContacts.map((c) => {
                    const isNew = c.status === "new";
                    return (
                      <motion.div
                        key={c._id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                          background: isNew ? "var(--bg-card)" : "var(--bg-card-secondary)",
                          border: isNew ? "1px solid var(--primary-red)" : "1px solid var(--border-glass)",
                          borderRadius: 20,
                          padding: "24px 22px",
                          boxShadow: "var(--card-shadow)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 12,
                            marginBottom: 12,
                          }}
                        >
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                                {c.name}
                              </h3>
                              <Badge variant={isNew ? "warning" : "secondary"}>
                                {isNew ? "New Message" : c.status}
                              </Badge>
                              <Badge variant="outline">{c.subject}</Badge>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                marginTop: 8,
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <a
                                href={`mailto:${c.email}`}
                                style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--primary-red)" }}
                              >
                                <Mail size={14} /> {c.email}
                              </a>
                              {c.phone && (
                                <a
                                  href={`tel:${c.phone}`}
                                  style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}
                                >
                                  <Phone size={14} /> {c.phone}
                                </a>
                              )}
                              <span>• {new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: 8 }}>
                            <a
                              href={`mailto:${c.email}?subject=Re: 1MMW - ${encodeURIComponent(c.subject)}`}
                              className="btn-primary"
                              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                            >
                              <Mail size={14} /> Reply
                            </a>
                            {isNew ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateContactStatus(c._id, "read")}
                              >
                                Mark Read
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateContactStatus(c._id, "new")}
                              >
                                Mark New
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => deleteContact(c._id)}
                              aria-label="Delete message"
                            >
                              <Trash2 size={15} />
                            </Button>
                          </div>
                        </div>

                        <p
                          style={{
                            fontSize: "0.95rem",
                            color: "var(--text-primary)",
                            lineHeight: 1.6,
                            background: "var(--bg-card)",
                            padding: 16,
                            borderRadius: 14,
                            margin: 0,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {c.message}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
