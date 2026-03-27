import { useState, useEffect, useCallback } from "react";
import { getStocktakeDetailsService } from "../services/auditService";
import { StocktakeDetailResponse } from "@/src/types/auditTypes";
import { NormalizeError } from "next/dist/shared/lib/utils";
import { useDebounce } from "@/src/hooks/useDebounce";

export function useStocktakeDetails(
  stocktakeId: number,
  pageNumber: number,
  pageSize: number,
  search?: string,
) {
  const [data, setData] = useState<StocktakeDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizeError | null>(null);

  const debouncedSearchTerm = useDebounce(search, 300);

  const fetchStocktakeDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stocktakeDetailData = await getStocktakeDetailsService(
        stocktakeId,
        pageNumber,
        pageSize,
        search,
      );
      setData(stocktakeDetailData);
    } catch (err) {
      setError(err as NormalizeError);
    } finally {
      setLoading(false);
    }
  }, [stocktakeId, pageNumber, pageSize, debouncedSearchTerm]);

  useEffect(() => {
    fetchStocktakeDetails();
  }, [fetchStocktakeDetails]);

  return {
    data,
    loading,
    error,
    refresh: fetchStocktakeDetails,
  };
}
