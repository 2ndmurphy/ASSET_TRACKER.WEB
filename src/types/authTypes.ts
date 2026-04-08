export interface User {
  userId: string;
  username: string;
  role: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface AuthData {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  user: User;
}

export interface MeData {
  user: User;
}

export type AuthResponse = ApiResponse<AuthData>;
export type MeResponse = ApiResponse<MeData>;
