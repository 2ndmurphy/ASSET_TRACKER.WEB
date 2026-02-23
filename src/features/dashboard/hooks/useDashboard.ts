import { useState, useEffect, useCallback } from "react";
import { getDashboardOverviewService } from "../services/dashboardService";
import { DashboardOverviewData } from "@/src/lib/api/dashboard/types";
import { NormalizedError } from "@/src/lib/api/client";

export function useDashboard() {
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboardData = await getDashboardOverviewService();
      setData(dashboardData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboardData
  };
}
