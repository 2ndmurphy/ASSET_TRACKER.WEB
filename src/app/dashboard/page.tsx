"use client";

import React from "react";
import StatCard from "@/src/features/dashboard/components/StatCard";
import { Package, Van, AlertCircle } from "lucide-react";
import { useDashboard } from "@/src/features/dashboard/hooks/useDashboard";
import {
  StatCardSkeleton,
  AssetDistributionSkeleton,
  RecentActivitySkeleton,
} from "@/src/components/ui/Skeletons";
import AssetDistribution from "@/src/features/dashboard/components/AssetDistribution";
import RecentActivity from "@/src/features/dashboard/components/RecentActivity";

export default function DashboardPageContent() {
  const { data, loading, error } = useDashboard();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-slate-400">
            Welcome back, here's what's happening today.
          </p>
        </div>
        {/* <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <Plus size={20} />
          New Asset
        </button> */}
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <AssetDistributionSkeleton />
            <RecentActivitySkeleton />
          </div>
        </>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          Error: {error.message}
        </div>
      ) : (
        data && (
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
                icon={<Van className="text-yellow-400" size={24} />}
              />
              <StatCard
                title="Total Missing"
                value={data.summary.totalMissing}
                icon={<AlertCircle size={24} />}
                className={
                  data.summary.totalMissing > 0
                    ? "border-rose-500/50 bg-rose-500/5 text-rose-400"
                    : ""
                }
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <AssetDistribution
                heatmap={data.heatmap}
                totalActiveAssets={data.summary.totalActiveAssets}
              />
              <RecentActivity activities={data.activities} />
            </div>
          </>
        )
      )}
    </>
  );
}
