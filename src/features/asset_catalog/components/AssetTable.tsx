"use client";

import React from "react";
import { AssetItem } from "@/src/lib/api/asset_management/types";
import { Eye, Edit2, MoreVertical, MapPin, Tag, Clock } from "lucide-react";

interface AssetTableProps {
  assets: AssetItem[];
  onCreate?: () => void;
  onEdit?: (asset: AssetItem) => void;
  onView?: (assetId: number) => void;
}

export default function AssetTable({ assets, onCreate, onEdit, onView }: AssetTableProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/2">
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">EPC / Tag</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Seen</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Tag size={24} className="opacity-20" />
                    </div>
                    <p>No assets found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr 
                  key={asset.id} 
                  className="hover:bg-white/2 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{asset.assetName}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5">{asset.assetCode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
                      {asset.linkedEpc || "Unassigned"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyles(asset.lifecycleStatus)}`}>
                      {asset.lifecycleStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin size={14} className="text-blue-400" />
                      <span>{asset.currentLocation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs text-nowrap">
                      <Clock size={14} />
                      <span>{new Date(asset.lastSeenAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onView?.(asset.id)}
                        className="p-2 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => onEdit?.(asset)}
                        className="p-2 hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 rounded-lg transition-colors"
                        title="Edit Asset"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "in-transit":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "missing":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}
