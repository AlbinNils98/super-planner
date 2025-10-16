import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import * as SecureStore from "expo-secure-store";
import { useRouter } from 'expo-router';
import { useQuery } from '@apollo/client/react';
import { GET_ME_QUERY } from '@/graphql/query/user';
import { MeQuery } from '@/generated/graphql';
import isTokenExpired from '@/util/isTokenExpired';
import { jwtDecode } from 'jwt-decode';
import client from '@/apollo/client';

type JWTPayload = {
  exp: number;
};

type AuthContextType = {
  user: MeQuery | undefined;
  token: string | null;
  setToken: (t: string | null) => void;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  token: null,
  setToken: () => { },
  login: async () => { },
  logout: async () => { },
  isReady: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MeQuery | undefined>(undefined)
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
      router.replace("/(protected)");
    }
  };

  const logout = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      router.replace("/(auth)");
      await client.clearStore();
    } catch (error) {
      console.log("Error deleting token from storage:", error);
    }
  }, [router]);

  /* 
  Get token from storage if exists.
  Automatically logout if token is expired.
  */
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token || isTokenExpired(token)) {
          logout();
        } else {
          setToken(token);
        }
      } catch (error) {
        console.log("Error retrieving token from storage:", error);
      }
      setIsReady(true);
    };
    getTokenFromStorage();
  }, [logout]);

  // Automatically logout if token expires
  useEffect(() => {
    if (!token) return;
    const { exp } = jwtDecode<JWTPayload>(token);
    const timeout = exp * 1000 - Date.now();
    if (timeout > 0) {
      const timer = setTimeout(logout, timeout);
      return () => clearTimeout(timer);
    } else {
      logout();
    }
  }, [token, logout]);

  const { data, error } = useQuery(GET_ME_QUERY, {
    skip: !token || isTokenExpired(token),
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  /* Automatically logout if error on user query */
  useEffect(() => {
    if (error && !error.message.includes("AbortError")) {
      logout();
    }
  }, [error, logout]);

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};