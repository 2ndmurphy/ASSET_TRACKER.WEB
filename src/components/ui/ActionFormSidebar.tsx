// components/ui/ActionFormSidebar.tsx
"use client";
import React from "react";
import GenericSidebar from "./GenericSidebar";
import { Save, Loader2 } from "lucide-react";

interface ActionFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  isSaving?: boolean;
  submitLabel?: string;
  children: React.ReactNode;
  widthClass?: string;
}

export default function ActionFormSidebar({
  isOpen,
  onClose,
  title,
  subtitle,
  onSave,
  isSaving = false,
  submitLabel = "Save",
  children,
  widthClass = "max-w-md",
}: ActionFormSidebarProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(e);
  };

  const footer = (
    <div className="flex items-center gap-3">
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
        className="flex-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        {submitLabel}
      </button>
    </div>
  );

  return (
    <GenericSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      footer={footer}
      widthClass={widthClass}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {children}
      </form>
    </GenericSidebar>
  );
}
