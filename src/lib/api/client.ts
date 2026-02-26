import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

export type NormalizedError = {
  status?: number;
  code?: string | number | null;
  message: string;
  data?: any;
  isNetworkError?: boolean;
  originalError?: any;
};

export interface TypedAxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

const TOKEN_COOKIE_NAME = "access_token";

export function getTokenCookie(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export function setTokenCookie(
  token: string,
  options?: Cookies.CookieAttributes,
) {
  const defaultOpts: Cookies.CookieAttributes = {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
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
        code:
          (err.response.data &&
            (err.response.data.code ?? err.response.data.error)) ??
          err.code ??
          null,
        message:
          (err.response.data &&
            (err.response.data.message ??
              err.response.data.error_description)) ??
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
}): TypedAxiosInstance {
  const baseURL = opts?.baseURL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const withCredentials = opts?.withCredentials ?? true;
  const attachTokenFromCookie = opts?.attachTokenFromCookie ?? true;

  const instance = axios.create({
    baseURL,
    withCredentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        console.group(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        );
        console.debug("Full URL:", (config.baseURL || "") + config.url);
        console.debug("Headers:", config.headers);
        console.debug("Data:", config.data);
        console.groupEnd();

        if (attachTokenFromCookie) {
          const token = getTokenCookie();
          if (token) {
            if (!config.headers.has("Authorization")) {
              config.headers.set("Authorization", `Bearer ${token}`);
            }
          }
        }
        if (typeof config.withCredentials === "undefined") {
          config.withCredentials = withCredentials;
        }
      } catch (e) {
        console.error("Request Interceptor Error:", e);
      }
      return config;
    },
    (error) => {
      console.error("❌ Request Interceptor Error:", error);
      return Promise.reject(normalizeAxiosError(error));
    },
  );

  instance.interceptors.response.use(
    (response) => {
      console.group(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
      console.debug("Status:", response.status);
      console.debug("Body:", response.data);
      console.groupEnd();
      return response.data;
    },
    (error) => {
      const norm = normalizeAxiosError(error);
      console.group(
        `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      );
      console.error("Status:", norm.status);
      console.error("Message:", norm.message);
      console.error("Data:", norm.data);
      console.groupEnd();
      return Promise.reject(norm);
    },
  );

  return instance as unknown as TypedAxiosInstance;
}

export const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:7199/api",
  withCredentials: true,
  attachTokenFromCookie: true,
});
