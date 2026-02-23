"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="w-full max-w-md p-4 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Wisecon RFID
            </h1>
            <p className="text-slate-400">Asset Tracking Management System</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
