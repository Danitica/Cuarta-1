"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = { email: string; name?: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
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
    // Demo: credenciales de ejemplo
    const demoEmail = "admin@example.com";
    const demoPassword = "password";

    // Simula una llamada a servidor
    await new Promise((r) => setTimeout(r, 300));

    if (email === demoEmail && password === demoPassword) {
      const u = { email: demoEmail, name: "Admin" };
      setUser(u);
      localStorage.setItem("simple_auth_user", JSON.stringify(u));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("simple_auth_user");
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
