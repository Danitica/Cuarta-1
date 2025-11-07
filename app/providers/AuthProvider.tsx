"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Usuario simplificado almacenado en el front
type User = { id?: number; email: string; nombre?: string; name?: string; telefono?: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  // Devuelve detalle para mostrar mensajes de error en UI
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("simple_auth_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("Auth init error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
    try {
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        // Intentar extraer mensaje de error del backend
        try {
          const errJson = await res.json();
          const msg = errJson?.message || errJson?.error || `Error ${res.status}`;
          return { ok: false, message: msg };
        } catch {
          return { ok: false, message: `Error ${res.status}` };
        }
      }

      const json = await res.json();
      // Esperado según especificación proporcionada:
      // { success, message, data: { user: {...}, token, expiresIn } }
      const token: string | undefined = json?.data?.token;
      const rawUser = json?.data?.user;
      if (token) localStorage.setItem("auth_token", token);
      if (rawUser) {
        const mapped: User = {
          id: rawUser.id,
          email: rawUser.email,
          nombre: rawUser.nombre,
          name: rawUser.nombre, // Para compatibilidad con componentes previos
          telefono: rawUser.telefono,
        };
        setUser(mapped);
        localStorage.setItem("simple_auth_user", JSON.stringify(mapped));
      }
      return { ok: true };
    } catch (e) {
      console.error("Login error", e);
      return { ok: false, message: "No se pudo conectar con el servidor." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("simple_auth_user");
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
