import { apiClient } from "./client";
import { DashboardOverviewResponse } from "../../types/dashboardTypes";

export function getOverviewData(): Promise<DashboardOverviewResponse> {
  return apiClient.get("/dashboard/overview");
}