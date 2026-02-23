"use client";

import React, { useEffect, useState } from "react";
import { X, Save, Loader2, Info } from "lucide-react";
import { AssetItem, CreateAssetRequest, UpdateAssetRequest } from "@/src/lib/api/asset_management/types";

interface AssetFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: AssetItem | null;
  onSave: (data: any) => Promise<void>;
  isSaving: boolean;
}

export default function AssetFormSidebar({ isOpen, onClose, asset, onSave, isSaving }: AssetFormSidebarProps) {
  const [formData, setFormData] = useState<Partial<AssetItem>>({
    assetCode: "",
    assetName: "",
    description: "",
    lifecycleStatus: "Active",
  });

  useEffect(() => {
    if (asset) {
      setFormData(asset);
    } else {
      setFormData({
        assetCode: "",
        assetName: "",
        description: "",
        lifecycleStatus: "Active",
      });
    }
  }, [asset, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="relative w-full bg-[#0f172a] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-white/2">
            <div>
              <h3 className="text-xl font-bold text-white">{asset ? "Edit Asset" : "Add New Asset"}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {asset ? `Updating ${asset.assetCode}` : "Fill in the details to create a new asset."}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Asset Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Forklift XP-200"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={formData.assetName || ""}
                onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Asset Code</label>
              <input
                required
                disabled={!!asset}
                type="text"
                placeholder="e.g. AST-001"
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${asset ? "opacity-50 cursor-not-allowed" : ""}`}
                value={formData.assetCode || ""}
                onChange={(e) => setFormData({ ...formData, assetCode: e.target.value })}
              />
              {!asset && (
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info size={12} />
                  Unique identifier for this asset.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Description</label>
              <textarea
                rows={3}
                placeholder="Brief description of the asset..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Settings</h4>
              <div className="grid grid-cols-3 gap-2">
                {["Active", "In-Transit", "Missing"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, lifecycleStatus: status })}
                    className={`py-2 px-1 rounded-lg text-xs font-medium border transition-all ${
                      formData.lifecycleStatus === status
                        ? "bg-blue-600/20 border-blue-500 text-blue-400"
                        : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-white/2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {asset ? "Update Asset" : "Save Asset"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
