import { useState, useEffect, useCallback } from "react";
import { getAssetCatalogService } from "../services/assetService";
import { AssetCatalogResponse } from "@/src/types/assetTypes";
import { NormalizedError } from "@/src/lib/api/client";
import { useDebounce } from "@/src/hooks/useDebounce";

export function useAssets(
  pageNumber: number,
  pageSize: number,
  search?: string,
) {
  const [data, setData] = useState<AssetCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const debouncedSearchTerm = useDebounce(search, 300);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const assetCatalogData = await getAssetCatalogService(
        pageNumber,
        pageSize,
        search,
      );
      setData(assetCatalogData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, debouncedSearchTerm]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return {
    data,
    loading,
    error,
    refresh: fetchAssets,
  };
}
