import { apiClient } from "./client";
import { LoginRequest, RegisterRequest, AuthResponse, MeResponse } from "../../types/authTypes";

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
