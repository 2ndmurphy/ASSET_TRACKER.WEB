import { getOverviewData } from "@/src/lib/api/dashboard";
import { DashboardOverviewData } from "@/src/types/dashboardTypes";

export async function getDashboardOverviewService(): Promise<DashboardOverviewData> {
  const response = await getOverviewData();

  if (response && response.success === false) {
    throw new Error(response.message || "Failed to fetch dashboard overview");
  }

  // If response is the data itself (missing success wrapper) or has .data
  return response.data || response;
}
