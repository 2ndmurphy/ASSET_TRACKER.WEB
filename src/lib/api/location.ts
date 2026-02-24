import { apiClient } from "./client";
import {
  CreateLocationRequest,
  UpdateLocationRequest,
  LocationManagementResponse,
  SingleLocationResponse
} from "../../types/locationTypes";

export const getLocationManagement = async (pageNumber: number, pageSize: number, search?: string) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("pageNumber", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await apiClient.get<LocationManagementResponse>(`/locations?${params.toString()}`);
  return response as unknown as LocationManagementResponse;
};

export const getLocationById = async (id: number) => {
  const response = await apiClient.get<SingleLocationResponse>(`/locations/${id}`);
  return response as unknown as SingleLocationResponse;
}

export const createLocation = async (location: CreateLocationRequest) => {
  const response = await apiClient.post<SingleLocationResponse>(`/locations/new`, location);
  return response as unknown as SingleLocationResponse;
}

export const updateLocation = async (location: UpdateLocationRequest) => {
  const response = await apiClient.put<SingleLocationResponse>(`/locations/edit`, location);
  return response as unknown as SingleLocationResponse;
}