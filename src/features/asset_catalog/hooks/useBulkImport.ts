import { useState, useCallback } from "react";
import { bulkImportAssetsService } from "../services/assetService";
import { BulkImportAssetsResponse } from "@/src/types/assetTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useBulkImport(file: File) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BulkImportAssetsResponse | null>(null);
  const [error, setError] = useState<NormalizedError | null>(null);

  const bulkImportAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bulkImportAssetsService(file);
      setData(response);
    } catch (error) {
      setError(error as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [file]);

  return {
    data,
    loading,
    error,
    bulkImportAssets,
  };
}
