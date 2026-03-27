import { useState, useEffect, useCallback } from "react";
import { getAssetLifecyclesService } from "../services/auditService";
import { AssetLifecycleResponse } from "@/src/types/auditTypes";
import { NormalizeError } from "next/dist/shared/lib/utils";

export function useAssetLifecycles(assetId: number) {
  const [data, setData] = useState<AssetLifecycleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizeError | null>(null);

  const fetchAssetLifecycles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const assetLifecycleData = await getAssetLifecyclesService(assetId);
      setData(assetLifecycleData);
    } catch (err) {
      setError(err as NormalizeError);
    } finally {
      setLoading(false);
    }
  }, [assetId]);

  useEffect(() => {
    fetchAssetLifecycles();
  }, [fetchAssetLifecycles]);

  return {
    data,
    loading,
    error,
    refresh: fetchAssetLifecycles,
  };
}
