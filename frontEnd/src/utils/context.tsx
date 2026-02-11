import { createContext, useContext } from "react";

type AuthState = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider 🥝🥝");
  }
  return context;
}
