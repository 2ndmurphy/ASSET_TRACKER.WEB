"use client";

import React from "react";
import { Activity, History } from "lucide-react";

export type ActivityItem = {
  assetName: string;
  activityType: string;
  location: string;
  timestamp: string | number;
};

type Props = {
  activities: ActivityItem[];
  maxItems?: number;
  className?: string;
};

function RecentActivityComponent({ activities, maxItems, className = "" }: Props) {
  const list = maxItems ? activities.slice(0, maxItems) : activities;

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden min-w-0 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Activity size={20} className="text-purple-400" />
        Recent Activity
      </h3>

      <div className="space-y-6 max-h-[48vh] overflow-y-auto pr-2 custom-scroll">
        {list.length === 0 ? (
          <p className="text-slate-400">No activity recorded.</p>
        ) : (
          list.map((activity, i) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default React.memo(RecentActivityComponent);