"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { register, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      router.push("/dashboard");
    } catch (err) {
      // Error handled by useAuth
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error.message}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300 ml-1">Username</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          required
        />
      </div>

      {/* <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300 ml-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300 ml-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
        >
          <option value="Operator">Operator</option>
          <option value="Admin">Admin</option>
        </select>
      </div> */}

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300 ml-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm text-slate-400 mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}
