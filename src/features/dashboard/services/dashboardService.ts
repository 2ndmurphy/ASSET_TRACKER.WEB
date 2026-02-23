import { getOverviewData } from "@/src/lib/api/dashboard/dashboard";
import { DashboardOverviewData } from "@/src/lib/api/dashboard/types";

export async function getDashboardOverviewService(): Promise<DashboardOverviewData> {
  const response = await getOverviewData();

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch dashboard overview");
  }

  return response.data;
}