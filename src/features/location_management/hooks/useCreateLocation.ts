import { useState, useCallback } from "react";
import { createLocationService } from "../services/locationService";
import { LocationItem, CreateLocationRequest } from "@/src/types/locationTypes";
import { NormalizedError } from "@/src/lib/api/client";

export function useCreateLocation() {
  const [data, setData] = useState<LocationItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const createLocation = useCallback(async (params: CreateLocationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const createLocationData = await createLocationService(params);
      setData(createLocationData);
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
    createLocation
  };
}