// app/dashboard/layout.tsx
"use client"; // karena layout memakai hooks klien (AuthContext) in this example
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}