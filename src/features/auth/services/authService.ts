import {
  loginApi,
  logoutApi,
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  registerApi,
  User,
  getMeApi,
} from "@/src/lib/api/auth/auth";

import { clearTokenCookie } from "@/src/lib/api/client";

export async function loginService(
  payload: LoginRequest
): Promise<AuthResponse> {
  const response = await loginApi(payload);

  if (!response.success) {
    throw new Error(response.message || "Login failed");
  }

  return response;
}

export async function registerService(
  payload: RegisterRequest
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
  try {
    await logoutApi();
  } finally {
    clearTokenCookie();
  }
}
