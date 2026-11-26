"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Mail,
  Archive,
  Users,
  HandHeart,
  Inbox,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    pendingTestimonies: 0,
    approvedTestimonies: 0,
    posts: 0,
    subscribers: 0,
    editions: 0,
    volunteers: 0,
    prayers: 0,
    contacts: 0,
    pendingComments: 0,
  });

  const loadMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const [
        resTestPending,
        resTestApproved,
        resPosts,
        resSubs,
        resEditions,
        resVols,
        resPrayers,
        resContacts,
        resComments,
      ] = await Promise.all([
        fetch("/api/testimonies?approved=false").then((r) => r.json()),
        fetch("/api/testimonies?approved=true").then((r) => r.json()),
        fetch("/api/posts?publishedOnly=false").then((r) => r.json()),
        fetch("/api/newsletter").then((r) => r.json()),
        fetch("/api/editions").then((r) => r.json()),
        fetch("/api/volunteers").then((r) => r.json()),
        fetch("/api/prayer").then((r) => r.json()),
        fetch("/api/contact?status=all").then((r) => r.json()),
        fetch("/api/comments?approvedOnly=false").then((r) => r.json()),
      ]);

      setMetrics({
        pendingTestimonies: Array.isArray(resTestPending.data) ? resTestPending.data.length : 0,
        approvedTestimonies: Array.isArray(resTestApproved.data) ? resTestApproved.data.length : 0,
        posts: Array.isArray(resPosts.data) ? resPosts.data.length : 0,
        subscribers: Array.isArray(resSubs.data) ? resSubs.data.length : 0,
        editions: Array.isArray(resEditions.data) ? resEditions.data.length : 0,
        volunteers: Array.isArray(resVols.data) ? resVols.data.length : 0,
        prayers: Array.isArray(resPrayers.data) ? resPrayers.data.length : 0,
        contacts: Array.isArray(resContacts.data) ? resContacts.data.length : 0,
        pendingComments: Array.isArray(resComments.data)
          ? resComments.data.filter((c: { approved: boolean }) => !c.approved).length
          : 0,
      });
    } catch (err) {
      console.error("Error loading metrics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Management Console</span>
            <span>•</span>
            <span>2026 4th Edition</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Dashboard Overview
          </h1>
        </div>
        <Button
          onClick={loadMetrics}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Stats
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/testimonies"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition block"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Pending Testimonies</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {metrics.pendingTestimonies}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {metrics.approvedTestimonies} published
          </p>
        </Link>

        <Link
          href="/admin/blog"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition block"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Articles & News</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{metrics.posts}</div>
          <p className="text-xs text-slate-400 mt-1">Live publications</p>
        </Link>

        <Link
          href="/admin/subscribers"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition block"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Subscribers</span>
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{metrics.subscribers}</div>
          <p className="text-xs text-slate-400 mt-1">Newsletter list</p>
        </Link>

        <Link
          href="/admin/archive"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition block"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Archived Editions</span>
            <Archive className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{metrics.editions}</div>
          <p className="text-xs text-slate-400 mt-1">2024, 2025, 2026...</p>
        </Link>
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-white">Pending Moderation</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              There are {metrics.pendingTestimonies} testimonies and{" "}
              {metrics.pendingComments} comments waiting for administrative approval.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/testimonies" className="flex-1">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
                Moderate Testimonies
              </Button>
            </Link>
            <Link href="/admin/comments">
              <Button size="sm" variant="outline" className="border-slate-700 text-slate-200">
                Comments
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Archive className="w-5 h-5" />
              <h3 className="font-bold text-white">Editions Archive</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Manage historical milestones, themes, guest ministers, video sessions, and photo
              galleries for all editions.
            </p>
          </div>
          <Link href="/admin/archive">
            <Button size="sm" variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800">
              Manage Archive <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-white">News & Publications</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Publish news, press releases, schedule changes, and devotionals to engage worshippers
              worldwide.
            </p>
          </div>
          <Link href="/admin/blog">
            <Button size="sm" variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800">
              Manage Articles <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Auxiliary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/volunteers"
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-sm font-bold text-white block">Volunteer Workforce</span>
              <span className="text-xs text-slate-400">10 event departments</span>
            </div>
          </div>
          <span className="text-xl font-black text-amber-400">{metrics.volunteers}</span>
        </Link>

        <Link
          href="/admin/prayers"
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <HandHeart className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-sm font-bold text-white block">Prayer Petitions</span>
              <span className="text-xs text-slate-400">Intercessory desk</span>
            </div>
          </div>
          <span className="text-xl font-black text-blue-400">{metrics.prayers}</span>
        </Link>

        <Link
          href="/admin/contacts"
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Inbox className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-sm font-bold text-white block">Contact Messages</span>
              <span className="text-xs text-slate-400">Inbound inquiries</span>
            </div>
          </div>
          <span className="text-xl font-black text-purple-400">{metrics.contacts}</span>
        </Link>
      </div>
    </div>
  );
}
