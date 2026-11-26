"use client";

import { useState } from "react";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import {
  Users,
  CheckCircle2,
  Send,
  Sparkles,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const departments = [
  "Protocol & Guest Relations",
  "Ushering & Crowd Management",
  "Mass Choir & Vocalists",
  "Media, Photography & Live Broadcast",
  "Medical & First Aid Response",
  "Security & Traffic Coordination",
  "Transportation & Shuttle Logistics",
  "Intercessory & Prayer Team",
  "Technical, Stage & Sound",
  "Sanitation & Venue Maintenance",
];

const availabilityOptions = [
  "All 3 Days (Dec 18 - 20, 2026) + Pre-Event Briefings",
  "Friday, Dec 18 (Day 1)",
  "Saturday, Dec 19 (Day 2)",
  "Sunday, Dec 20 (Day 3)",
  "Weekend Only (Dec 19 & 20)",
];

export default function VolunteerPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [availability, setAvailability] = useState(availabilityOptions[0]);
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim()) {
      toast.error("Missing required fields", {
        description: "Please fill in your name, email, phone number, and location.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          gender,
          location,
          department,
          availability,
          experience,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit registration.");
      }

      toast.success("Volunteer Registration Received!", {
        description: "Thank you for answering the call to serve in the Lord's house.",
      });

      setSubmitted(true);
    } catch (err: unknown) {
      toast.error("Registration error", {
        description: err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Ambient Glow */}
      <div
        className="glow-orb"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(229, 57, 53, 0.12) 0%, transparent 70%)",
          top: -80,
          left: -120,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 460,
          height: 460,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, transparent 70%)",
          bottom: 100,
          right: -100,
        }}
      />

      <Marquee />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(59, 130, 246, 0.15)",
              color: "#3b82f6",
              padding: "5px 16px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <Users size={16} /> 2026 Workforce Portal
          </span>
          <h1 className="section-title">VOLUNTEER FOR ONE MILLION MAN WORSHIP 2026</h1>
          <p className="section-subtitle">
            Serve as an instrument in God&apos;s hands for the 4th edition. Join dedicated believers
            coordinating logistics, hospitality, technical, and prayer for over one million worshippers.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            alignItems: "start",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Left Column: Why Volunteer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-glass)",
                borderRadius: 22,
                padding: "30px 26px",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
                Why Volunteer at 1MMW 2026?
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: 20 }}>
                A gathering of one million souls requires anointed coordination and hands dedicated to service. As a volunteer, you will be part of history in lifting up King Jesus.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Kingdom Reward & Impact:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                      Experience the joy of kingdom service and the spiritual overflow of worship.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={18} color="var(--primary-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Orientation & Training:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                      Accreditation, departmental briefings, and security orientation prior to convocation.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>Official Accreditation:</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                      Official volunteer badge, designated access passes, and department team gear.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-card-secondary)",
                border: "1px solid var(--border-glass)",
                borderRadius: 20,
                padding: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Calendar size={18} color="var(--primary-red)" />
                <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Event Key Details
                </h4>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 10px", lineHeight: 1.5 }}>
                <strong>Dates:</strong> December 18 – 20, 2026 (3 Days)
                <br />
                <strong>Venue:</strong> Yakubu Gowon Stadium, Elekahia, Port Harcourt
                <br />
                <strong>Time:</strong> Daily from 4:00 PM (Volunteers on ground from 12:00 PM)
              </p>
            </div>
          </motion.div>

          {/* Right Column: Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              borderRadius: 24,
              padding: "36px 30px",
              boxShadow: "var(--section-card-shadow)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "30px 10px" }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                  Registration Submitted!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 450, margin: "0 auto 24px" }}>
                  Thank you, <strong>{fullName}</strong>. Your application to serve in <strong>{department}</strong> has been registered. You will receive an official confirmation via email and WhatsApp regarding orientation meetings.
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/avatar" className="btn-primary">
                    <Sparkles size={16} /> Create Your 2026 Avatar
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setPhone("");
                      setExperience("");
                    }}
                    className="btn-secondary"
                  >
                    Register Another Person
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 18 }}>
                  Volunteer Application Form
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <Input
                      placeholder="e.g. Samuel Okafor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Phone / WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        placeholder="080 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Gender *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: "var(--bg-card-secondary)",
                          border: "1px solid var(--border-glass)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                        Current City / LGA *
                      </label>
                      <Input
                        placeholder="e.g. Port Harcourt (Obio/Akpor)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                      Preferred Department *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "var(--bg-card-secondary)",
                        border: "1px solid var(--border-glass)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {departments.map((dep) => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                      Availability During Event *
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "var(--bg-card-secondary)",
                        border: "1px solid var(--border-glass)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {availabilityOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                      Relevant Skills or Church Experience (Optional)
                    </label>
                    <Textarea
                      placeholder="Share any background in protocol, ushering, sound engineering, medical aid, or previous 1MMW editions..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: "100%", padding: "14px", justifyContent: "center" }}
                  >
                    <Send size={18} />
                    <span>{loading ? "Submitting Registration..." : "Submit Volunteer Registration"}</span>
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
