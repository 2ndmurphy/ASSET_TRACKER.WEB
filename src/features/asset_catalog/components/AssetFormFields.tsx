"use client";

import React from "react";
import { Info } from "lucide-react";
import { AssetItem } from "@/src/types/assetTypes";

interface AssetFormFieldsProps {
  formData: Partial<AssetItem>;
  setFormData: (data: Partial<AssetItem>) => void;
  isEdit: boolean;
  disabledFields?: string[];
}

export default function AssetFormFields({
  formData,
  setFormData,
  isEdit,
  disabledFields = [],
}: AssetFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Asset Name</label>
        <input
          required
          type="text"
          placeholder="e.g. Forklift XP-200"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={formData.assetName || ""}
          onChange={(e) =>
            setFormData({ ...formData, assetName: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Asset Code</label>
        <input
          required
          disabled={isEdit || disabledFields.includes("assetCode")}
          type="text"
          placeholder="e.g. AST-001"
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          value={formData.assetCode || ""}
          onChange={(e) =>
            setFormData({ ...formData, assetCode: e.target.value })
          }
        />
        {!isEdit && (
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info size={12} />
            Unique identifier for this asset.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Brief description..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Status Settings
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {["Active", "In-Transit", "Missing"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                setFormData({ ...formData, lifecycleStatus: status })
              }
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
    </div>
  );
}
