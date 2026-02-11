import { useState, type ReactNode } from "react";
import { AuthContext } from "./context.tsx";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("jwt");
  });
  const navigate = useNavigate();
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
