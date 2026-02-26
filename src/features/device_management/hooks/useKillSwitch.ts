import { useState, useCallback } from "react";
import { killSwitchService } from "../services/deviceService";
import { DeviceItem, KillOperationRequest } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useKillSwitch() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const killDevice = useCallback(async (deviceId: KillOperationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const killDeviceData = await killSwitchService(deviceId);
      setData(killDeviceData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, killDevice };
}
