import { useState, useEffect, useCallback } from "react";
import { getAssetCatalogService } from "../services/assetService";
import { AssetCatalogResponse } from "@/src/lib/api/asset_management/types";
import { NormalizedError } from "@/src/lib/api/client";

export function useAssetCatalog(pageNumber: number, pageSize: number, search?: string) {
  const [data, setData] = useState<AssetCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchAssetCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const assetCatalogData = await getAssetCatalogService(pageNumber, pageSize, search);
      setData(assetCatalogData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, search]);

  useEffect(() => {
    fetchAssetCatalog();
  }, [fetchAssetCatalog]);

  return {
    data,
    loading,
    error,
    refresh: fetchAssetCatalog
  };
}
