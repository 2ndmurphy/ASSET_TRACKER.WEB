import { apiClient } from "../client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: string;
  user: {
    userId: string;
    username: string;
    role: string;
  };
}

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorType: number;
}

export function registerApi(payload: RegisterRequest): Promise<BaseResponse<AuthResponse>> {
  return apiClient.post("/web/register", payload);
}

export function loginApi(payload: LoginRequest): Promise<BaseResponse<AuthResponse>> {
  return apiClient.post("/web/login", payload);
}

export function logoutApi() {
  return apiClient.post("/web/logout");
}

// export function getProfileApi() {
//   return apiClient.get<AuthResponse["user"]>("/auth/me");
// }

// export function refreshApi() {
//   return apiClient.post<AuthResponse>("/auth/refresh");
// }

// export function revokeApi() {
//   return apiClient.post("/auth/revoke");
// }