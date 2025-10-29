"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Prevent flash of protected content
  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  if (loading || !user) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold">Bienvenido, {user.name ?? user.email}!</h1>
        <p className="mt-2 text-gray-700">Este es tu panel (dashboard) protegido.</p>
        <div className="mt-6">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
