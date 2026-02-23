// components/skeletons/StatCardSkeleton.tsx
"use client";
import React from "react";

export function StatCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/10 w-12 h-12 animate-pulse" />
        <div className="w-12 h-6 rounded-full bg-white/10 animate-pulse" />
      </div>

      <div>
        <div className="w-3/4 h-4 bg-white/10 rounded-md mb-2 animate-pulse" />
        <div className="w-1/2 h-10 bg-white/10 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function AssetDistributionSkeleton({ rows = 5 }: { rows?: number }) {
  // rows: how many heatmap rows to show
  return (
    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-100 overflow-hidden min-w-0">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-white/10 animate-pulse" />
        Asset Distribution
      </h3>

      <div className="space-y-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2 min-w-0">
            <div className="flex justify-between text-sm">
              <div className="w-1/2 h-4 bg-white/10 rounded-md animate-pulse" />
              <div className="w-24 h-4 bg-white/10 rounded-md animate-pulse" />
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              {/* varying pseudo-width to feel more natural */}
              <div
                className="h-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-1000 animate-pulse"
                style={{ width: `${30 + (i * 10) % 60}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentActivitySkeleton({ items = 6 }: { items?: number }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden min-w-0">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-white/10 animate-pulse" />
        Recent Activity
      </h3>

      <div className="space-y-6 max-h-[48vh] overflow-y-auto pr-2 custom-scroll">
        {Array.from({ length: items }).map((_, idx) => (
          <div key={idx} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center animate-pulse shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-1/2 h-4 bg-white/10 rounded-md mb-1 animate-pulse" />
              <div className="w-3/4 h-3 bg-white/10 rounded-md mb-1 animate-pulse" />
              <div className="w-1/4 h-3 bg-white/5 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
