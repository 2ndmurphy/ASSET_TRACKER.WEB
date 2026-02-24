"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";
import { useAuthContext } from "@/src/features/auth/context/AuthContext";

export default function Header() {
  const { user, isHydrated } = useAuthContext();

  return (
    <header className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 relative z-30">
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            {!isHydrated || !user ? (
              <div className="space-y-1">
                <div className="w-24 h-4 bg-white/10 rounded-md animate-pulse" />
                <div className="w-16 h-3 bg-white/5 rounded-md animate-pulse ml-auto" />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-white">
                  {user.username}
                </p>
                <p className="text-xs text-slate-400">{user.role}</p>
              </>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white border border-white/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
