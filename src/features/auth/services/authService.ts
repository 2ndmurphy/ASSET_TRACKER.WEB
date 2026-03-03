import { loginApi, logoutApi, registerApi, getMeApi } from "@/src/lib/api/auth";

import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  User,
} from "@/src/types/authTypes";

export async function loginService(
  payload: LoginRequest,
): Promise<AuthResponse> {
  const response = await loginApi(payload);

  if (!response.success) {
    throw new Error(response.message || "Login failed");
  }

  return response;
}

export async function registerService(
  payload: RegisterRequest,
): Promise<AuthResponse> {
  const response = await registerApi(payload);

  if (!response.success) {
    throw new Error(response.message || "Registration failed");
  }

  return response;
}

export async function getMeService(): Promise<User> {
  const response = await getMeApi();

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch user data");
  }

  return response.user;
}

export async function logoutService(): Promise<void> {
  await logoutApi();
}
