import { apiClient } from "./client";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
} from "@/src/types/authTypes";

export function registerApi(payload: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post("/auth/register", payload);
}

export function loginApi(payload: LoginRequest): Promise<AuthResponse> {
  return apiClient.post("/auth/login", payload);
}

export function refreshToken(): Promise<AuthResponse> {
  return apiClient.post("/auth/refresh");
}

export function logoutApi() {
  return apiClient.post("/auth/logout");
}

export function getMeApi(): Promise<MeResponse> {
  return apiClient.get("/auth/me");
}
