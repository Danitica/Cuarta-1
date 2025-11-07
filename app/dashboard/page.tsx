"use client";

import { useEffect } from "react";
import Image from "next/image";
// Si decides mover la imagen a /public renómbrala sin espacios (ej: veterinaria-mi-can.jpeg) y usa src="/veterinaria-mi-can.jpeg".
// Alternativamente puedes importar el archivo directamente si permanece fuera de /public.
// Ejemplo (descomenta y coloca el archivo en c:/Projects/Cuarta1/Imagenes/):
// import clinicBg from "../../Imagenes/VETERINARIA MI CAN.jpeg";
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
  <div className="min-h-screen" style={{ backgroundColor: '#e1d3ea' }}>
      {/* Panel a pantalla completa con imagen tipo marca de agua */}
      <div className="relative h-screen w-full">
        {/* Marca de agua: imagen grande, centrada y con baja opacidad */}
        {/* Usar ruta pública (recomendado). Coloca el archivo renombrado en /public/veterinaria-mi-can.jpeg */}
        <Image
          src="/veterinaria-mi-can.jpeg"
          alt="Marca de agua clínica MiCAN"
          fill
          priority
          className="object-contain opacity-30 md:opacity-35 pointer-events-none select-none"
        />

        {/* Card centrada dentro del panel */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur rounded-xl shadow-lg p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
              Bienvenido, {user.name ?? user.email}!
            </h1>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-md font-semibold shadow"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
