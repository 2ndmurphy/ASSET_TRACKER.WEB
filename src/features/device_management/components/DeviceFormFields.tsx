import React from "react";
import { Info } from "lucide-react";
import { DeviceItem } from "@/src/types/deviceTypes";

interface DeviceFormFieldsProps {
  formData: Partial<DeviceItem>;
  setFormData: (data: Partial<DeviceItem>) => void;
  isEdit: boolean;
  disabledFields?: string[];
}

export default function DeviceFormFields({
  formData,
  setFormData,
  isEdit,
  disabledFields = [],
}: DeviceFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Hardware ID
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Forklift XP-200"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={formData.hardwareId || ""}
          onChange={(e) =>
            setFormData({ ...formData, hardwareId: e.target.value })
          }
        />
        {!isEdit && (
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info size={12} />
            Unique identifier for this device.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Device Name
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Forklift XP-200"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={formData.deviceName || ""}
          onChange={(e) =>
            setFormData({ ...formData, deviceName: e.target.value })
          }
        />
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Status Settings
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Active", value: true },
            { label: "Inactive", value: false },
          ].map((status) => (
            <button
              key={status.label}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  isDeviceHardwareActive: status.value,
                })
              }
              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                formData.isDeviceHardwareActive === status.value
                  ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  status.value ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {status.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
