import { useState, useCallback } from "react";
import { deleteDeviceService } from "../services/deviceService";
import { NormalizedError } from "@/src/lib/api/client";

export function useDeleteDevice() {
  const [data, setData] = useState<void | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const deleteDevice = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const deleteDeviceData = await deleteDeviceService(id);
      setData(deleteDeviceData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, deleteDevice };
}
