import { useState, useCallback } from "react";
import { createDeviceService } from "../services/deviceService";
import { DeviceItem, CreateDeviceRequest } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useCreateDevice() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const createDevice = useCallback(async (device: CreateDeviceRequest) => {
    setLoading(true);
    setError(null);
    try {
      const deviceData = await createDeviceService(device);
      setData(deviceData);
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
    createDevice,
  };
}
