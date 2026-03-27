"use client";

import { useAssetLifecycles } from "../hooks/useAssetLifecycles";
import { History, MapPin, User, Activity, Clock } from "lucide-react";

export default function AssetLifecycleTimelines({
  assetId,
}: {
  assetId: number;
}) {
  const { data, loading, error } = useAssetLifecycles(assetId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Loading lifecycle timeline...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mt-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
        <p className="text-rose-400 text-sm">
          Failed to load lifecycle timeline.
        </p>
      </div>
    );
  }

  const items = data?.data?.items || [];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-4 text-center bg-white/5 border border-white/10 rounded-2xl">
        <History className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-white font-medium mb-1">No Timeline Events</h3>
        <p className="text-slate-400 text-sm">
          No lifecycle events have been recorded for this asset yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-4 space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10 before:z-0">
      {items.map((item, index) => (
        <div key={index} className="relative flex items-start gap-4 z-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 shrink-0 shadow-lg mt-1">
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm hover:bg-white/10 transition-colors backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2 gap-2">
              <span className="text-sm font-bold text-white bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30 whitespace-nowrap">
                {item.eventType}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5 text-right">
                <Clock size={12} className="shrink-0" />
                {new Date(item.eventDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-slate-300 mb-3">{item.description}</p>
            )}
            <div className="flex flex-col gap-1.5 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <User size={12} className="text-indigo-400 shrink-0" />
                <span className="truncate" title={item.performedBy}>
                  {item.performedBy}
                </span>
              </div>
              {item.locationName && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={12} className="text-rose-400 shrink-0" />
                  <span className="truncate" title={item.locationName}>
                    {item.locationName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
