import { useState, useCallback } from "react";
import { updateLocationService } from "../services/locationService";
import { LocationItem, UpdateLocationRequest } from "@/src/types/locationTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useUpdateLocation() {
  const [data, setData] = useState<LocationItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const updateLocation = useCallback(async (params: UpdateLocationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updateLocationData = await updateLocationService(params);
      setData(updateLocationData);
    } catch (err) {
      setError(err as NormalizedError);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    updateLocation
  };
}