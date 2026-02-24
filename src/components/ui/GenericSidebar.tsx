// components/GenericSidebar.tsx
"use client";
import React from "react";
import { X } from "lucide-react";

interface GenericSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  widthClass?: string; // e.g. "max-w-md"
  children?: React.ReactNode;
  footer?: React.ReactNode;
  backdropClosable?: boolean;
  className?: string;
}

export default function GenericSidebar({
  isOpen,
  onClose,
  title,
  subtitle,
  widthClass = "max-w-md",
  children,
  footer,
  backdropClosable = true,
  className = "",
}: GenericSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => backdropClosable && onClose()}
      />
      <div className={`fixed inset-y-0 right-0 ${widthClass} w-full flex`}>
        <div className={`relative w-full bg-[#0f172a] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ${className}`}>
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-white/2">
            <div>
              {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>

          {footer && <div className="p-6 border-t border-white/10 bg-white/2">{footer}</div>}
        </div>
      </div>
    </div>
  );
}