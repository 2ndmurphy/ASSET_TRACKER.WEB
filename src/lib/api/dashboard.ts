import { apiClient } from "./client";
import { DashboardOverviewResponse } from "@/src/types/dashboardTypes";

export const getOverviewData = async (): Promise<DashboardOverviewResponse> =>
  apiClient.get<DashboardOverviewResponse>("/dashboard/overview");
