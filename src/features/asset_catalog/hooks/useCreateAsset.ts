import { useState, useCallback } from "react";
import { createAssetService } from "../services/assetService";
import { AssetItem, CreateAssetRequest } from "@/src/lib/api/asset_management/types";
import { NormalizedError } from "@/src/lib/api/client";

export function useCreateAsset() {
  const [data, setData] = useState<AssetItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const createAsset = useCallback(async (params: CreateAssetRequest) => {
    setLoading(true);
    setError(null);
    try {
      const createAssetData = await createAssetService(params);
      setData(createAssetData);
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
    createAsset
  };
}