import {
  loginApi,
  logoutApi,
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  registerApi,
} from "@/src/lib/api/auth/auth";

import { setTokenCookie, clearTokenCookie } from "@/src/lib/api/client";

export async function loginService(
  payload: LoginRequest
): Promise<AuthResponse> {
  const response = (await loginApi(payload)) as unknown as AuthResponse;

  if (response.accessToken) {
    setTokenCookie(response.accessToken);
  }

  return response;
}

export async function registerService(
  payload: RegisterRequest
): Promise<AuthResponse> {
  const response = (await registerApi(payload)) as unknown as AuthResponse;

  if (response.accessToken) {
    setTokenCookie(response.accessToken);
  }

  return response;
}

export async function logoutService(): Promise<void> {
  try {
    await logoutApi();
  } finally {
    clearTokenCookie();
  }
}
