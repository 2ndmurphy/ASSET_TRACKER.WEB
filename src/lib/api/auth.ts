import { apiClient } from "./client";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
} from "@/src/types/authTypes";

export const registerApi = async (
  payload: RegisterRequest,
): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/auth/register", payload);

export const loginApi = async (payload: LoginRequest): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/auth/login", payload);

export const refreshToken = async (): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>("/auth/refresh");

export const logoutApi = async () => apiClient.post("/auth/logout");

export const getMeApi = async (): Promise<MeResponse> =>
  apiClient.get<MeResponse>("/auth/me");
