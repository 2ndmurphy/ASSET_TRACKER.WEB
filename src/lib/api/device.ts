import { apiClient } from "./client";
import {
  DeviceManagementResponse,
  SingleDeviceResponse,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  KillOperationRequest,
} from "@/src/types/deviceTypes";

export const getDeviceManagement = (
  pageNumber: number,
  pageSize: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("page", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  return apiClient.get<DeviceManagementResponse>(
    `/web/devices?${params.toString()}`,
  );
};

export const getDeviceById = (id: number) =>
  apiClient.get<SingleDeviceResponse>(`/web/devices/${id}`);

export const createDevice = (device: CreateDeviceRequest) =>
  apiClient.post<SingleDeviceResponse>(`/web/devices/new`, device);

export const updateDevice = (device: UpdateDeviceRequest) =>
  apiClient.patch<SingleDeviceResponse>(`/web/devices/update`, device);

export const deleteDevice = (deviceId: number) =>
  apiClient.delete<SingleDeviceResponse>(`/web/devices/${deviceId}/delete`);

export const killSwitch = (targetId: KillOperationRequest) =>
  apiClient.post<SingleDeviceResponse>(`/web/devices/kill-device`, targetId);

export const killScan = (targetId: KillOperationRequest) =>
  apiClient.post<SingleDeviceResponse>(`/web/devices/kill-scan-task`, targetId);

export const killUser = (targetId: KillOperationRequest) =>
  apiClient.post<SingleDeviceResponse>(`/web/devices/force-logout`, targetId);
