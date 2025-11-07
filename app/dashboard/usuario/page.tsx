"use client";

import { useAuth } from "../../providers/AuthProvider";

export default function UsuarioPage() {
  const { user } = useAuth();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Usuario</h2>
      {user ? (
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          {user.name && <p><span className="font-semibold">Nombre:</span> {user.name}</p>}
        </div>
      ) : (
        <p className="text-gray-600">No hay usuario autenticado.</p>
      )}
    </div>
  );
}
