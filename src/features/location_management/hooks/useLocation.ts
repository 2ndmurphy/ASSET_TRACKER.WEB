import { useState, useEffect, useCallback } from "react";
import { getLocationManagementService } from "../services/locationService";
import { LocationManagementResponse } from "@/src/types/locationTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useLocation(pageNumber: number, pageSize: number, search?: string) {
  const [data, setData] = useState<LocationManagementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);
  
  const fetchLocationList = useCallback(async() => {
    setLoading(true);
    setError(null);
    try {
      const locationData = await getLocationManagementService(pageNumber, pageSize, search);
      setData(locationData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, search]);

  useEffect(() => {
    fetchLocationList();
  }, [fetchLocationList]);

  return {
    data,
    loading,
    error,
    refresh: fetchLocationList
  };
}