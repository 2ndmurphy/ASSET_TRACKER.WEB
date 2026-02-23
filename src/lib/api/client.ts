import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export type NormalizedError = {
  status?: number;
  code?: string | number | null;
  message: string;
  data?: any;
  isNetworkError?: boolean;
  originalError?: any;
}

const TOKEN_COOKIE_NAME = "access_token";

export function getTokenCookie(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export function setTokenCookie(token: string, options?: Cookies.CookieAttributes) {
  const defaultOpts: Cookies.CookieAttributes = {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax",
  };
  Cookies.set(TOKEN_COOKIE_NAME, token, { ...defaultOpts, ...options });
}

export function clearTokenCookie() {
  Cookies.remove(TOKEN_COOKIE_NAME, { path: "/" });
}

// Error normalizer
function normalizeAxiosError(err: AxiosError | any): NormalizedError {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Server responded with a status code outside 2xx
      return {
        status: err.response.status,
        code: (err.response.data && (err.response.data.code ?? err.response.data.error)) ?? err.code ?? null,
        message:
          (err.response.data && (err.response.data.message ?? err.response.data.error_description)) ??
          err.message ??
          "Request failed",
        data: err.response.data,
        isNetworkError: false,
        originalError: err,
      };
    }

    if (err.request) {
      // Request made but no response (network error / CORS / server down)
      return {
        message: "Network error — no response received from server",
        isNetworkError: true,
        originalError: err,
      };
    }
  }

  // Non-Axios error or unknown
  return {
    message: err?.message ?? "Unknown error",
    originalError: err,
  };
}

// Factory for API client
export function createApiClient(opts?: {
  baseURL?: string;
  withCredentials?: boolean;
  attachTokenFromCookie?: boolean;
}): AxiosInstance {
  const baseURL = opts?.baseURL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const withCredentials = opts?.withCredentials ?? true;
  const attachTokenFromCookie = opts?.attachTokenFromCookie ?? true;

  const instance = axios.create({
    baseURL,
    withCredentials, // browser will send cookies for same-site/cross-site (depends on cookie attrs)
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        if (attachTokenFromCookie) {
          const token = getTokenCookie();
          if (token) {
            // InternalAxiosRequestConfig guarantees headers object exists
            if (!config.headers.has("Authorization")) {
              config.headers.set("Authorization", `Bearer ${token}`);
            }
          }
        }
        // Ensure withCredentials honored per-request as well
        if (typeof config.withCredentials === "undefined") {
          config.withCredentials = withCredentials;
        }
      } catch (e) {
      }
      return config;
    },
    (error) => Promise.reject(normalizeAxiosError(error))
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const norm = normalizeAxiosError(error);
      return Promise.reject(norm);
    }
  );

  return instance;
}

// Default client (convention)
export const apiClient = createApiClient({
  baseURL: "https://localhost:7199/api",
  withCredentials: true,
  attachTokenFromCookie: true,
});