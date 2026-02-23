import { apiClient } from "../client";
import { DashboardOverviewResponse } from "./types";

export function getOverviewData(): Promise<DashboardOverviewResponse> {
  return apiClient.get("/dashboard/overview");
}