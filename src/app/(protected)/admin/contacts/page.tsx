"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

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

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact?status=all");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setContacts(json.data);
      }
    } catch {
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Inquiries & Correspondence</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Contact Inquiries
          </h1>
        </div>
        <Button
          onClick={loadContacts}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-base">{c.name}</span>
                <span className="text-xs text-slate-400 ml-2">({c.email})</span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-xs font-semibold text-amber-400">Subject: {c.subject}</div>
            <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              {c.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
