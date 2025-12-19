"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, userApi } from "@/lib/api";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: Get language from storage
const getStoredLanguage = (): string => {
  if (typeof window === "undefined") return "TR";
  return localStorage.getItem("lang") || "TR";
};

// Helper: Save language to storage
const saveLanguage = (lang: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lang", lang);
};

// Helper: Get token from storage
const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  
  // Priority 1: LocalStorage
  let token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  
  // Priority 2: Cookie
  if (!token) {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    if (match) token = match[2];
  }
  
  return token;
};

// Helper: Save token to storage (belt and suspenders approach)
const saveToken = (token: string) => {
  if (typeof window === "undefined") return;
  
  // Save to LocalStorage
  localStorage.setItem("token", token);
  
  // Save to Cookie (7 days expiry)
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Strict; Secure`;
};

// Helper: Clear ALL tokens (nuclear option)
const clearAllTokens = () => {
  if (typeof window === "undefined") return;
  
  // Clear LocalStorage
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  
  // Clear SessionStorage
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("accessToken");
  
  // Clear Cookies (multiple variations)
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // CRITICAL: Start as true
  // HYDRATION FIX: Initialize with fixed default, update from localStorage in useEffect
  const [language, setLanguageState] = useState<string>("TR");
  const router = useRouter();

  // Language setter that persists to localStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  // HYDRATION FIX: Load language from localStorage AFTER mount
  useEffect(() => {
    const storedLang = getStoredLanguage();
    if (storedLang !== language) {
      setLanguageState(storedLang);
    }
  }, []);

  // STEP 0: Set document language attribute for browser/accessibility
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language.toLowerCase();
      console.log(`🌍 [AuthContext] Language set to: ${language}`);
    }
  }, [language]);

  // STEP 1: Initialize auth on mount (happens ONCE per session)
  useEffect(() => {
    const initAuth = async () => {
      console.log("🔐 [AuthContext] Initializing authentication...");
      
      const token = getStoredToken();
      
      if (!token) {
        console.log("⚠️ [AuthContext] No token found in storage");
        setLoading(false);
        return;
      }

      console.log("✅ [AuthContext] Token found, fetching user profile...");
      
      try {
        // Fetch user profile with existing token
        const response = await userApi.getProfile();
        setUser(response.data);
        console.log("✅ [AuthContext] User authenticated:", response.data.email);
      } catch (error: any) {
        console.error("❌ [AuthContext] Token validation failed:", error.message);
        // Token is invalid/expired - clean up
        clearAllTokens();
        setUser(null);
      } finally {
        // ALWAYS set loading to false after initialization
        setLoading(false);
        console.log("🏁 [AuthContext] Initialization complete");
      }
    };

    initAuth();
  }, []); // Empty dependency array = runs once

  // STEP 2: Login function
  const login = async (credentials: any) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      const { accessToken, user: userData } = response.data;

      if (!accessToken || !userData) {
        throw new Error("Invalid login response");
      }

      // Save token to BOTH storage locations
      saveToken(accessToken);
      
      // Update user state
      setUser(userData);
      
      toast.success(`Welcome back, ${userData.firstName}!`);
      
      // Navigate based on role
      const targetRoute = userData.role === "ADMIN" ? "/panel/dashboard" : "/dashboard";
      router.push(targetRoute);
      
    } catch (error: any) {
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Register function
  const register = async (data: any) => {
    try {
      setLoading(true);
      const response = await authApi.register(data);
      const { accessToken, user: userData } = response.data;

      if (!accessToken || !userData) {
        throw new Error("Invalid registration response");
      }

      // Save token
      saveToken(accessToken);
      
      // Update user state
      setUser(userData);
      
      toast.success("Account created successfully!");
      router.push("/dashboard");
      
    } catch (error: any) {
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // STEP 4: Logout function (NUCLEAR CLEAR)
  const logout = useCallback(() => {
    console.log("🚪 [AuthContext] Logging out...");
    
    // Clear all tokens from everywhere
    clearAllTokens();
    
    // Clear user state
    setUser(null);
    
    // Navigate to login
    router.push("/login");
    
    toast.info("Logged out successfully");
  }, [router]);

  // STEP 5: Refresh user profile
  const refreshUser = async () => {
    try {
      const response = await userApi.getProfile();
      setUser(response.data);
      console.log("♻️ [AuthContext] User profile refreshed");
    } catch (error) {
      console.error("❌ [AuthContext] Failed to refresh user", error);
      // If refresh fails, user might be logged out
      clearAllTokens();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, language, setLanguage, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
