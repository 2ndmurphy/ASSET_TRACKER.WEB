import { useState, useEffect, useCallback } from "react";
import { getDeviceByIdService } from "../services/deviceService";
import { DeviceItem } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useDeviceById(deviceId: number) {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchDeviceById = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const deviceByIdData = await getDeviceByIdService(deviceId);
      setData(deviceByIdData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchDeviceById();
  }, [fetchDeviceById]);

  return {
    data,
    loading,
    error,
    refresh: fetchDeviceById,
  };
}
