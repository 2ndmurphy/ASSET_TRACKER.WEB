import { useState, useEffect, useCallback } from "react";
import { getStocktakeHistoriesService } from "../services/auditService";
import { StocktakeHistoryResponse } from "@/src/types/auditTypes";
import { NormalizeError } from "next/dist/shared/lib/utils";
import { useDebounce } from "@/src/hooks/useDebounce";

export function useStocktakeHistories(
  pageNumber: number,
  pageSize: number,
  search?: string,
) {
  const [data, setData] = useState<StocktakeHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizeError | null>(null);

  const debouncedSearchTerm = useDebounce(search, 300);

  const fetchStocktakeHistories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stocktakeHistoryData = await getStocktakeHistoriesService(
        pageNumber,
        pageSize,
        search,
      );
      setData(stocktakeHistoryData);
    } catch (err) {
      setError(err as NormalizeError);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, debouncedSearchTerm]);

  useEffect(() => {
    fetchStocktakeHistories();
  }, [fetchStocktakeHistories]);

  return {
    data,
    loading,
    error,
    refresh: fetchStocktakeHistories,
  };
}
