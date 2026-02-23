"use client";

import React from "react";
import {
  LayoutDashboard,
  Package,
  MapPin,
  History,
  Settings,
  Bell,
  User,
  LogOut,
  Search,
  Plus,
  Activity,
  Box,
  AlertCircle,
  Smartphone,
  ShieldQuestionMark,
  Van
} from "lucide-react";
import { useDashboard } from "@/src/features/dashboard/hooks/useDashboard";
import StatCard from "@/src/features/dashboard/components/StatCard";

export default function DashboardPage() {
  const { data, loading, error } = useDashboard();

  return (
    <div className="min-h-screen w-screen bg-[#0f172a] text-slate-200 flex overflow-hidden overflow-x-hidden">
      {/* Dynamic Background Elements */}
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
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
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
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-400">Warehouse Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white border border-white/20">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {/* Note: added overflow-x-hidden to prevent horizontal scroll from child elements */}
        <div className="flex-1 p-8 overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
              <p className="text-slate-400">Welcome back, here's what's happening today.</p>
            </div>
            <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
              <Plus size={20} />
              New Asset
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-blue-400 italic">
              Loading dashboard data...
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              Error: {error.message}
            </div>
          ) : data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Total Active Assets"
                  value={data.summary.totalActiveAssets}
                  icon={<Package size={24} />}
                />
                <StatCard
                  title="Total In Transit"
                  value={data.summary.totalInTransit}
                  icon={<Van size={24} />}
                />
                <StatCard
                  title="Total Missing"
                  value={data.summary.totalMissing}
                  icon={<AlertCircle size={24} />}
                  className={data.summary.totalMissing > 0 ? "border-rose-500/50 bg-rose-500/5 text-rose-400" : ""}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-100 overflow-hidden min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-400" />
                    Asset Distribution
                  </h3>
                  <div className="space-y-6">
                    {data.heatmap.map((item, idx) => {
                      const pct = data.summary.totalActiveAssets
                        ? Math.min(100, (item.assetCount / data.summary.totalActiveAssets) * 100)
                        : 0;
                      return (
                        <div key={idx} className="space-y-2 min-w-0">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300 font-medium truncate">{item.locationName}</span>
                            <span className="text-blue-400 font-bold">{item.assetCount} assets</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-1000"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-purple-400" />
                    Recent Activity
                  </h3>

                  {/* Make the activity list scrollable (only this inner area).
                      max-h uses viewport units so it scales; adjust value as needed. */}
                  <div className="space-y-6 max-h-[48vh] overflow-y-auto pr-2 custom-scroll">
                    {data.activities.map((activity, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors shrink-0">
                          <History size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{activity.assetName}</p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">
                            {activity.activityType} • {activity.location}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                            {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${active
      ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
      : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}