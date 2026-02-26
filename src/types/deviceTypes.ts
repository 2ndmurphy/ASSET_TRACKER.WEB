export interface DeviceItem {
  deviceId: number;
  deviceName: string;
  hardwareId: string;
  isDeviceHardwareActive: boolean;
  userSessionId: number;
  currentOperator: string;
  loginTime: string;
  isUserLoggedIn: boolean;
  scanSessionId: boolean;
  currentTask: string;
  taskStartTime: string;
}

export interface CreateDeviceRequest {
  hardwareId: string;
  deviceName: string;
}

export interface UpdateDeviceRequest {
  deviceId: number;
  deviceName: string;
  isActive: boolean;
}

export interface KillOperationRequest {
  targetId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorType: number;
}

export interface DeviceManagementData {
  items: DeviceItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export type DeviceManagementResponse = ApiResponse<DeviceManagementData>;
export type SingleDeviceResponse = ApiResponse<DeviceItem>;
