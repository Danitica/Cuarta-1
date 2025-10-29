// Qué es 'use client';?
// 'use client'; es una directiva de Next.js 13+ que indica que un componente debe ejecutarse en el lado del cliente (navegador) en lugar del lado del servidor.

// 🔄 Contexto: Server vs Client Components
// Next.js 13 introdujo el concepto de App Router con dos tipos de componentes:

// Server Components (por defecto)

// Se ejecutan en el servidor
// No tienen acceso a APIs del navegador
// No pueden usar hooks como useState, useEffect
// Mejor rendimiento y SEO
// Client Components (con 'use client';)

// Se ejecutan en el navegador
// Pueden usar hooks de React
// Tienen acceso a APIs del navegador
// Permiten interactividad


import { redirect } from "next/navigation";

export default function Page() {
  // Redirige a la página de login
  redirect("/login");
}
