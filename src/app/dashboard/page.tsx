// app/dashboard/page.tsx   (Next.js app-router) OR pages/dashboard/index.tsx for pages-router
"use client";

import React from "react";
import StatCard from "@/src/features/dashboard/components/StatCard";
import { Package, Van, AlertCircle, MapPin, Activity, History, Plus } from "lucide-react";
import { useDashboard } from "@/src/features/dashboard/hooks/useDashboard";
import { StatCardSkeleton, AssetDistributionSkeleton, RecentActivitySkeleton } from "@/src/components/ui/Skeletons";

export default function DashboardPageContent() {
  const { data, loading, error } = useDashboard();

  return (
    <>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <AssetDistributionSkeleton/>
            <RecentActivitySkeleton/>
          </div>
        </>
        // <div className="flex items-center justify-center h-64 text-blue-400 italic">Loading dashboard data...</div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">Error: {error.message}</div>
      ) : data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Active Assets" value={data.summary.totalActiveAssets} icon={<Package size={24} />} />
            <StatCard title="Total In Transit" value={data.summary.totalInTransit} icon={<Van size={24} />} />
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
                  const pct = data.summary.totalActiveAssets ? Math.min(100, (item.assetCount / data.summary.totalActiveAssets) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-2 min-w-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300 font-medium truncate">{item.locationName}</span>
                        <span className="text-blue-400 font-bold">{item.assetCount} assets</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-1000" style={{ width: `${pct}%` }} />
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
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}