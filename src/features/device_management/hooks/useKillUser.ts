import { useState, useCallback } from "react";
import { killUserService } from "../services/deviceService";
import { DeviceItem, KillOperationRequest } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useKillSwitch() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const killScan = useCallback(async (scanSessionId: KillOperationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const killScanData = await killUserService(scanSessionId);
      setData(killScanData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(true);
    }
  }, []);

  return { data, loading, error, killScan };
}
