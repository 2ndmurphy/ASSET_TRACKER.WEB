import { apiClient } from "./client";
import { AuthRequest, AuthResponse, MeResponse } from "@/src/types/authTypes";

export const registerApi = async (
  payload: AuthRequest,
): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/web/auth/register", payload);

export const loginApi = async (payload: AuthRequest): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/web/auth/login", payload);

export const refreshToken = async (): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/web/auth/refresh");

export const logoutApi = async () => apiClient.post("/web/auth/logout");

export const getMeApi = async (): Promise<MeResponse> =>
  apiClient.get<MeResponse>("/web/auth/me");
