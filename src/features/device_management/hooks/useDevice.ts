import { useState, useEffect, useCallback } from "react";
import { getDeviceManagementService } from "../services/deviceService";
import { DeviceManagementResponse } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useDeviceManagement(
  pageNumber: number,
  pageSize: number,
  search?: string,
) {
  const [data, setData] = useState<DeviceManagementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchDeviceManagement = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const deviceManagementData = await getDeviceManagementService(
        pageNumber,
        pageSize,
        search,
      );
      setData(deviceManagementData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, search]);

  useEffect(() => {
    fetchDeviceManagement();
  }, [fetchDeviceManagement]);

  return {
    data,
    loading,
    error,
    refresh: fetchDeviceManagement,
  };
}
