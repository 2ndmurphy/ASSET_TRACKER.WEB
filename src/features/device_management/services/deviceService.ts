import {
  getDeviceManagement,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  killSwitch,
  killScan,
  killUser,
} from "@/src/lib/api/device";
import {
  DeviceItem,
  DeviceManagementResponse,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  KillOperationRequest,
} from "@/src/types/deviceTypes";

export async function getDeviceManagementService(
  pageNumber: number,
  pageSize: number,
  search?: string,
): Promise<DeviceManagementResponse> {
  const response = await getDeviceManagement(pageNumber, pageSize, search);

  if (response && response.success === false) {
    throw new Error(response.message || "Failed to fetch device management");
  }

  return response;
}

export async function getDeviceByIdService(
  deviceId: number,
): Promise<DeviceItem> {
  const response = await getDeviceById(deviceId);

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch device by id");
  }

  return response.data;
}

export async function createDeviceService(
  device: CreateDeviceRequest,
): Promise<DeviceItem> {
  const response = await createDevice(device);

  if (!response.success) {
    throw new Error(response.message || "Failed to create device");
  }

  return response.data;
}

export async function updateDeviceService(
  device: UpdateDeviceRequest,
): Promise<DeviceItem> {
  const response = await updateDevice(device);

  if (!response.success) {
    throw new Error(response.message || "Failed to update device");
  }

  return response.data;
}

export async function deleteDeviceService(deviceId: number): Promise<void> {
  const response = await deleteDevice(deviceId);

  if (!response.success) {
    throw new Error(response.message || "Failed to delete device");
  }
}

export async function killSwitchService(
  deviceId: KillOperationRequest,
): Promise<DeviceItem> {
  const response = await killSwitch(deviceId);

  if (!response.success) {
    throw new Error(response.message || "Failed to kill switch");
  }

  return response.data;
}

export async function killScanService(
  scanSessionId: KillOperationRequest,
): Promise<DeviceItem> {
  const response = await killScan(scanSessionId);

  if (!response.success) {
    throw new Error(response.message || "Failed to kill scan");
  }

  return response.data;
}

export async function killUserService(
  userSessionId: KillOperationRequest,
): Promise<DeviceItem> {
  const response = await killUser(userSessionId);

  if (!response.success) {
    throw new Error(response.message || "Failed to kill user");
  }

  return response.data;
}
