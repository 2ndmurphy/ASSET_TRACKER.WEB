import { useState } from "react";
import { loginService, registerService } from "../services/authService";
import { NormalizedError } from "@/src/lib/api/client";
import { LoginRequest, RegisterRequest } from "@/src/lib/api/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  async function login(payload: LoginRequest) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginService(payload);
      return data;
    } catch (err) {
      setError(err as NormalizedError);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload: RegisterRequest) {
    setLoading(true);
    setError(null);

    try {
      const data = await registerService(payload);
      return data;
    } catch (err) {
      setError(err as NormalizedError);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { login, register, loading, error };
}
