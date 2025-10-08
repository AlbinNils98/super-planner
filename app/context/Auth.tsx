import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from "expo-secure-store";
import { useRouter } from 'expo-router';
import client from '@/apollo/client';

type AuthContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => { },
  login: async () => { },
  logout: async () => { },
  isReady: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const login = async (token: string) => {
    if (token) {
      try {
        await SecureStore.setItemAsync("token", token);
      } catch (error) {
        console.log("Error saving token to storage:", error);
      }
      setToken(token);
      client.resetStore();
      router.replace("/(protected)");
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      router.replace("/(auth)");
    } catch (error) {
      console.log("Error deleting token from storage:", error);
    }
  };

  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const value = await SecureStore.getItemAsync("token");
        if (value !== null) {
          setToken(value);
        }
      } catch (error) {
        console.log("Error retrieving token from storage:", error);
      }
      setIsReady(true);
    };
    getTokenFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};