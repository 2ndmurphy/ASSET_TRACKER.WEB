import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({ title, value, icon, trend, className = "" }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/10 text-blue-400">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            }`}>
            {trend.isPositive ? "+" : ""}{trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
