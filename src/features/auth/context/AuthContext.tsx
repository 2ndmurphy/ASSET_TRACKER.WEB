"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User } from "@/src/lib/api/auth";
import { getMeService, logoutService } from "../services/authService";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "wisecon_user_context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const userData = await getMeService();
      setUser(userData);
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      setUser(null);
      sessionStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Initial hydration from sessionStorage
    const saved = sessionStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
      setLoading(false);
    }
    setIsHydrated(true);

    // 2. Fresh fetch in background
    fetchUser(!saved);
  }, [fetchUser]);

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      sessionStorage.removeItem(USER_STORAGE_KEY);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const login = async (data: any) => {
    // Actual login is handled by the useAuth hook, 
    // but we refresh the user data here to sync global state.
    await fetchUser(true);
  };

  const refreshUser = useCallback(async () => {
    await fetchUser(false);
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isHydrated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
