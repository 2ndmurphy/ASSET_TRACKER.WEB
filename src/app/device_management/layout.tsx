"use client";
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function AssetManagementRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
