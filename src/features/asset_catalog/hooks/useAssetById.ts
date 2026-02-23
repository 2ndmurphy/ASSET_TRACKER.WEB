import { useState, useEffect, useCallback } from "react";
import { getAssetByIdService } from "../services/assetService";
import { AssetItem } from "@/src/lib/api/asset_management/types";
import { NormalizedError } from "@/src/lib/api/client";

export function useAssetById(assetId: number) {
  const [data, setData] = useState<AssetItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchAssetById = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const assetByIdData = await getAssetByIdService(assetId);
      setData(assetByIdData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [assetId]);

  useEffect(() => {
    fetchAssetById();
  }, [fetchAssetById]);

  return {
    data,
    loading,
    error,
    refresh: fetchAssetById
  };
}