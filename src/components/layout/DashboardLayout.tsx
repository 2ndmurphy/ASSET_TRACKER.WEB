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
  Plus,
} from "lucide-react";
import NavItem from "../ui/NavItem";
import Header from "../ui/Header";
import { useAuthContext } from "@/src/features/auth/context/AuthContext";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuthContext();
  const pathname = usePathname();

  return (
    <div className="h-screen w-full bg-[#0f172a] text-slate-200 flex overflow-hidden lg:static">
      {/* Dynamic Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar - Fixed width, high z-index */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col relative z-20 shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Asset Tracker
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scroll">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
          />
          <NavItem
            icon={<Package size={20} />}
            label="Asset Catalog"
            href="/asset_management"
            active={pathname === "/asset_management"}
          />
          <NavItem
            icon={<MapPin size={20} />}
            label="Location Management"
            href="/location_management"
            active={pathname === "/location_management"}
          />
          <NavItem
            icon={<Smartphone size={20} />}
            label="Device Management"
            href="/device_management"
            active={pathname === "/device_management"}
          />
          <NavItem
            icon={<ShieldQuestionMark size={20} />}
            label="Audit & Reporting"
            href="/audit_&_reporting"
            active={pathname === "/audit_&_reporting"}
          />
          <NavItem
            icon={<History size={20} />}
            label="Scan History"
            href="/scan_history"
            active={pathname === "/scan_history"}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            href="/settings"
            active={pathname === "/settings"}
          />
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main area (header + content) - Takes remaining space and handles inner scrolling */}
      <main className="flex-1 flex flex-col relative z-10 min-w-0 h-screen">
        <Header />

        {/* Content container - This scroll area is independent */}
        <div className="flex-1 p-8 overflow-y-auto overflow-x-hidden custom-scroll pt-6">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
