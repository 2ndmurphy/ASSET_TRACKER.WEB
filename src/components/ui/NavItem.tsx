// components/NavItem.tsx
"use client";
import React from "react";
import Link from "next/link";

export default function NavItem({ 
  icon, 
  label, 
  href, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  href: string; 
  active?: boolean 
}) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
        active ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
