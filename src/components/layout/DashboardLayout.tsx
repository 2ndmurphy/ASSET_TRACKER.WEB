// components/DashboardLayout.tsx
"use client";

import React from "react";
import {
  Search,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  MapPin,
  Smartphone,
  ShieldQuestionMark,
  History,
  Settings,
  Plus
} from "lucide-react";
import NavItem from "../ui/NavItem";
import { useAuthContext } from "@/src/features/auth/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isHydrated } = useAuthContext();

  return (
    <div className="min-h-screen w-screen bg-[#0f172a] text-slate-200 flex overflow-hidden overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col relative z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Asset Tracker
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Package size={20} />} label="Asset Catalog" />
          <NavItem icon={<MapPin size={20} />} label="Location Management" />
          <NavItem icon={<Smartphone size={20} />} label="Device Management" />
          <NavItem icon={<ShieldQuestionMark size={20} />} label="Audit & Reporting" />
          <NavItem icon={<History size={20} />} label="Scan History" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main area (header + content) */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right">
                {!isHydrated || !user ? (
                  <div className="space-y-1">
                    <div className="w-24 h-4 bg-white/10 rounded-md animate-pulse" />
                    <div className="w-16 h-3 bg-white/5 rounded-md animate-pulse ml-auto" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-white">{user.username}</p>
                    <p className="text-xs text-slate-400">{user.role}</p>
                  </>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white border border-white/20">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content container (pages inject children here) */}
        <div className="flex-1 p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}