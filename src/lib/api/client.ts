import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

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
      // Request dibuat tapi tidak ada response dari server
      return {
        message: "Network error — no response received from server",
        isNetworkError: true,
        originalError: err,
      };
    }
  }

  // Unknown error
  return {
    message: err?.message ?? "Unknown error",
    originalError: err,
  };
}

// Factory for API client
export function createApiClient(opts?: {
  baseURL?: string;
  withCredentials?: boolean;
}): TypedAxiosInstance {
  const baseURL = opts?.baseURL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const withCredentials = opts?.withCredentials ?? true;

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

  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    failedQueue = [];
  };

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
    async (error) => {
      const originalRequest = error.config;
      const norm = normalizeAxiosError(error);

      // Handle 401 Unauthorized errors
      const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");
      if (norm.status === 401 && !originalRequest._retry && !isRefreshRequest) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Dynamic import to avoid circular dependency
          const { refreshToken } = await import("./auth");
          const response = await refreshToken();

          if (response.success) {
            processQueue(null);
            // Retry the original request
            return instance(originalRequest);
          } else {
            throw new Error("Refresh token invalid");
          }
        } catch (refreshError) {
          processQueue(refreshError);
          // Redirect to login if in browser and NOT already on a public route
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            const isPublicRoute =
              currentPath.startsWith("/auth/login") ||
              currentPath.startsWith("/auth/register");

            if (!isPublicRoute) {
              window.location.href = "/auth/login";
            }
          }
          return Promise.reject(normalizeAxiosError(refreshError));
        } finally {
          isRefreshing = false;
        }
      }

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
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
