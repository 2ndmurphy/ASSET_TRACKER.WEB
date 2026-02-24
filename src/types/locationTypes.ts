export interface LocationItem {
  id: number,
  locationCode: string,
  locationName: string,
  locationDescription: string,
  lastUpdatedAt: string
}

export interface CreateLocationRequest {
  locationCode: string,
  locationName: string,
  locationDescription: string,
}

export interface UpdateLocationRequest{
  id: number,
  locationName: string,
  locationCode: string,
  locationDescription: string,
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorType: number;
}

export interface LocationManagementData {
  items: LocationItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export type LocationManagementResponse = ApiResponse<LocationManagementData>;
export type SingleLocationResponse = ApiResponse<LocationItem>;
