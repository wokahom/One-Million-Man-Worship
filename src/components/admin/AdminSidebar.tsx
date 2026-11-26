"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Archive,
  BookOpen,
  MessageSquare,
  Mail,
  Sparkles,
  Users,
  HandHeart,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/admin/testimonies", label: "Testimonies", icon: Sparkles },
  { href: "/admin/blog", label: "Blog & News", icon: BookOpen },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/archive", label: "Editions Archive", icon: Archive },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { href: "/admin/prayers", label: "Prayer Requests", icon: HandHeart },
  { href: "/admin/contacts", label: "Contact Inquiries", icon: Inbox },
];

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-slate-300 p-1.5 hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-extrabold text-white text-base">1MMW Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
          >
            <span>Site</span> <ExternalLink className="w-3 h-3" />
          </Link>
          <Button
            size="sm"
            onClick={() => logout()}
            className="bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 font-semibold text-xs px-3 py-1.5"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Persistent Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 p-5 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="space-y-6">
          {/* Logo / Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-slate-950 font-black text-xl">1M</span>
              </div>
              <div>
                <h2 className="font-bold text-white text-base leading-tight">Admin Console</h2>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  2026 Edition
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Session Info Card with Logout */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">
                  {user?.name || "Administrator"}
                </span>
                <span className="text-[11px] text-slate-400 truncate block">
                  {user?.email || "admin@onemillionmanworship.com"}
                </span>
              </div>
            </div>

            {/* <Button
              onClick={() => logout()}
              variant="outline"
              size="sm"
              className="w-full border-red-500/30 bg-red-950/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 font-semibold text-xs py-1.5 h-8 flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out / Logout</span>
            </Button> */}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-amber-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Database: MongoDB</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Connected
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center text-xs py-2 px-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <span>View Public Site</span> <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Button
            onClick={() => logout()}
            className="w-full bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs py-2 h-9 flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Session</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
