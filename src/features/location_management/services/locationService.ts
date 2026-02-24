import {
  getLocationManagement,
  getLocationById,
  createLocation,
  updateLocation
} from "../../../lib/api/location";
import {
  LocationManagementResponse,
  CreateLocationRequest,
  UpdateLocationRequest,
  LocationItem
} from "../../../types/locationTypes";

export const getLocationManagementService = async (
  pageNumber: number, 
  pageSize: number, 
  search?: string): Promise<LocationManagementResponse> => 
{
  const response = await getLocationManagement(pageNumber, pageSize, search);

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch location list");
  }

  return response;
}

export const getLocationByIdService = async (id: number): Promise<LocationItem> => {
  const response = await getLocationById(id);

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch detail location");
  }

  return response.data;
}

export const createLocationService = async (location: CreateLocationRequest): Promise<LocationItem> => {
  const response = await createLocation(location);

  if (!response.success) {
    throw new Error(response.message || "Failed to create location");
  }

  return response.data;
}

export const updateLocationService = async (location: UpdateLocationRequest): Promise<LocationItem> => {
  const response = await updateLocation(location);

  if (!response.success) {
    throw new Error(response.message || "Failed to update location");
  }

  return response.data;
}