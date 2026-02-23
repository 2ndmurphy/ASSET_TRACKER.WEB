export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface User {
  userId: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  message: string;
  user: User;
}
