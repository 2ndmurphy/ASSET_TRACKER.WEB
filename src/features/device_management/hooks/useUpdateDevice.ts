import { useState, useCallback } from "react";
import { updateDeviceService } from "../services/deviceService";
import { NormalizedError } from "@/src/lib/api/client";
import { DeviceItem, UpdateDeviceRequest } from "@/src/types/deviceTypes";

export function useUpdateDevice() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const updateDevice = useCallback(async (params: UpdateDeviceRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updateDeviceData = await updateDeviceService(params);
      setData(updateDeviceData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    updateDevice,
  };
}
