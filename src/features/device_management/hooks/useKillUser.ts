import { useState, useCallback } from "react";
import { killUserService } from "../services/deviceService";
import { DeviceItem, KillOperationRequest } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useKillUser() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const killUser = useCallback(async (userId: KillOperationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const killUserData = await killUserService(userId);
      setData(killUserData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, killUser };
}
