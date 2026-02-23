"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/src/features/auth/context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login, loading, error } = useAuth();
  const { refreshUser } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      await refreshUser();
      router.push("/dashboard");
    } catch (err) {
      // Error di handle oleh useAuth
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error.message}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter your username"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="text-center text-sm text-slate-400 mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
