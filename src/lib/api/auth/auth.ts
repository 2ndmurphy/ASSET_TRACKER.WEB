import { apiClient } from "../client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface User {
  userId: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  message: string;
  user: User;
}

export function registerApi(payload: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post("/auth/web/register", payload);
}

export function loginApi(payload: LoginRequest): Promise<AuthResponse> {
  return apiClient.post("/auth/web/login", payload);
}

export function logoutApi() {
  return apiClient.post("/auth/web/logout");
}

export function getMeApi(): Promise<MeResponse> {
  return apiClient.get("/auth/web/me");
}

// export function getProfileApi() {
//   return apiClient.get<AuthResponse["user"]>("/auth/me");
// }
