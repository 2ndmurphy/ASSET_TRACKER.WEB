import { useState, useCallback } from "react";
import { updateAssetService } from "../services/assetService";
import { AssetItem, UpdateAssetRequest } from "@/src/lib/api/asset_management/types";
import { NormalizedError } from "@/src/lib/api/client";

export function useUpdateAsset() {
  const [data, setData] = useState<AssetItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const updateAsset = useCallback(async (params: UpdateAssetRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updateAssetData = await updateAssetService(params);
      setData(updateAssetData);
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
    updateAsset
  };
}
