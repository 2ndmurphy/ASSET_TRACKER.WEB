"use client";
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function LocationManagementRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
