import { useState, useEffect, useCallback } from "react";
import { getStocktakeComparisonService } from "../services/auditService";
import {
  StocktakeComparisonRequest,
  StocktakeComparisonResponse,
} from "@/src/types/auditTypes";
import { NormalizeError } from "next/dist/shared/lib/utils";

export function useStocktakeComparisons(request: StocktakeComparisonRequest) {
  const [data, setData] = useState<StocktakeComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizeError | null>(null);

  const fetchStocktakeComparisons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stocktakeComparisonData =
        await getStocktakeComparisonService(request);
      setData(stocktakeComparisonData);
    } catch (err) {
      setError(err as NormalizeError);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    fetchStocktakeComparisons();
  }, [fetchStocktakeComparisons]);

  return {
    data,
    loading,
    error,
    refresh: fetchStocktakeComparisons,
  };
}
