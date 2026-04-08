import { apiClient } from "./client";
import {
  CreateLocationRequest,
  UpdateLocationRequest,
  LocationManagementResponse,
  SingleLocationResponse,
} from "../../types/locationTypes";

export const getLocationManagement = async (
  pageNumber: number,
  pageSize: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("page", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  return apiClient.get<LocationManagementResponse>(
    `/web/locations?${params.toString()}`,
  );
};

export const getLocationById = async (id: number) =>
  apiClient.get<SingleLocationResponse>(`/web/locations/${id}`);

export const createLocation = async (location: CreateLocationRequest) =>
  apiClient.post<SingleLocationResponse>(`/web/locations/new`, location);

export const updateLocation = async (location: UpdateLocationRequest) =>
  apiClient.patch<SingleLocationResponse>(`/web/locations/edit`, location);
