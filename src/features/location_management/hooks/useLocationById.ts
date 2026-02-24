import { useState, useEffect, useCallback } from "react";
import { getLocationByIdService } from "../services/locationService";
import { LocationItem } from "@/src/types/locationTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useLocationById(locationId: number) {
  const [data, setData] = useState<LocationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  const fetchLocationById = useCallback(async() => {
    setLoading(true);
    setError(null);
    try {
      const locationByIdData = await getLocationByIdService(locationId);
      setData(locationByIdData);
    } catch (err) {
      setError(err as NormalizedError);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    fetchLocationById();
  }, [fetchLocationById]);

  return {
    data,
    loading,
    error,
    refresh: fetchLocationById
  };
}