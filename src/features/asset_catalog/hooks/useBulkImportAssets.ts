"use client";

import { useState } from "react";
import { bulkImportAssetsService } from "../services/assetService";
import { BulkImportResponse } from "@/src/types/assetTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useBulkImportAssets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);
  const [result, setResult] = useState<BulkImportResponse | null>(null);

  const importAssets = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await bulkImportAssetsService(file);
      setResult(response.data);
      return response.data;
    } catch (err) {
      setError(err as NormalizedError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    importAssets,
    loading,
    error,
    result,
    reset,
  };
}
