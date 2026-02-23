"use client";

import React from "react";
import { MapPin } from "lucide-react";

export type HeatmapItem = {
  locationName: string;
  assetCount: number;
};

type Props = {
  heatmap: HeatmapItem[];
  totalActiveAssets?: number;
  className?: string;
  rowsToShow?: number;
};

function AssetDistributionComponent({
  heatmap,
  totalActiveAssets = 0,
  className = "",
  rowsToShow,
}: Props) {
  const rows = rowsToShow ? heatmap.slice(0, rowsToShow) : heatmap;

  return (
    <div
      className={`lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-100 overflow-hidden min-w-0 ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <MapPin size={20} className="text-blue-400" />
        Asset Distribution
      </h3>

      <div className="space-y-6">
        {rows.length === 0 ? (
          <p className="text-slate-400">No distribution data available.</p>
        ) : (
          rows.map((item, idx) => {
            const pct = totalActiveAssets
              ? Math.min(100, (item.assetCount / totalActiveAssets) * 100)
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
          })
        )}
      </div>
    </div>
  );
}

export default React.memo(AssetDistributionComponent);