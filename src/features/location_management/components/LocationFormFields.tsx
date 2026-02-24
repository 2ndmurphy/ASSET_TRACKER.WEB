"use client";

import React from "react";
import { Info } from "lucide-react";
import { LocationItem } from "@/src/types/locationTypes";

interface LocationFormFieldsProps {
  formData: Partial<LocationItem>;
  setFormData: (data: Partial<LocationItem>) => void;
  isEdit: boolean;
  disabledFields?: string[];
}

export default function LocationFormFields({
  formData,
  setFormData,
  isEdit,
  disabledFields = [],
}: LocationFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Location Name
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Forklift XP-200"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={formData.locationName || ""}
          onChange={(e) =>
            setFormData({ ...formData, locationName: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Location Code
        </label>
        <input
          required
          disabled={isEdit || disabledFields.includes("locationCode")}
          type="text"
          placeholder="e.g. AST-001"
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          value={formData.locationCode || ""}
          onChange={(e) =>
            setFormData({ ...formData, locationCode: e.target.value })
          }
        />
        {!isEdit && (
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info size={12} />
            Unique identifier for this location.
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
          value={formData.locationDescription || ""}
          onChange={(e) =>
            setFormData({ ...formData, locationDescription: e.target.value })
          }
        />
      </div>
      {/* 
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Last Update Location
        </label>
        <input
          required
          disabled={isEdit || disabledFields.includes("lastUpdatedAt")}
          type="datetime-local"
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          value={formData.lastUpdatedAt || ""}
          onChange={(e) =>
            setFormData({ ...formData, lastUpdatedAt: e.target.value })
          }
        />
        {!isEdit && (
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info size={12} />
            Last 
          </p>
        )}
      </div> */}
    </div>
  );
}
