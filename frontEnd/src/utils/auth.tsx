import { useState, type ReactNode } from "react";
import { AuthContext } from "./context.tsx";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('jwt')
    })

    const login = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem('jwt', newToken)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('jwt')
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}