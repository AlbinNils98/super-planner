import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  exp: number;
};

const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<JWTPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

export default isTokenExpired;