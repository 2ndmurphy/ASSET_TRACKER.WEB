import { useState, useCallback } from "react";
import { killScanService } from "../services/deviceService";
import { DeviceItem, KillOperationRequest } from "@/src/types/deviceTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useKillScan() {
  const [data, setData] = useState<DeviceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const killScan = useCallback(async (scanSessionId: KillOperationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const killScanData = await killScanService(scanSessionId);
      setData(killScanData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, killScan };
}
