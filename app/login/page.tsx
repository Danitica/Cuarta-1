"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Redirigir automáticamente si ya está autenticado
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const validate = () => {
    const e = email.trim();
    const p = password;
    if (!e || !p) {
      return "Por favor completa ambos campos.";
    }
    // Validación básica de email
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(e)) return "Ingresa un email válido.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email.trim(), password);
      if (result.ok) {
        router.push("/dashboard");
      } else {
        setError(result.message || "Email o contraseña incorrectos.");
      }
    } catch (err) {
      console.error(err);
      setError("Error inesperado. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Ingresa tus credenciales para acceder</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 text-gray-600 border rounded placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 ${error ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-indigo-500'}`}
                placeholder="admin@example.com"
                aria-invalid={!!error}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full px-3 py-2 pr-12 text-gray-600 border rounded placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 ${error ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-indigo-500'}`}
                  placeholder="Ingresa tu contraseña"
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.238-2.238a12.298 12.298 0 0 0 3.003-4.282.75.75 0 0 0 0-.52C19.932 7.061 16.134 4.5 12 4.5c-1.64 0-3.2.368-4.623 1.03L3.53 2.47ZM6.97 5.91a10.78 10.78 0 0 1 5.03-1.16c3.6 0 7.005 2.044 9.136 5.75a10.768 10.768 0 0 1-2.77 3.41l-2.073-2.073a5 5 0 0 0-6.41-6.41L6.97 5.91Zm6.797 6.797-3.474-3.474a5 5 0 0 0 3.474 3.474ZM2.28 7.08a.75.75 0 0 1 .96-.45l2.209.794A12.302 12.302 0 0 0 1.5 12c2.568 5.439 8.133 7.5 10.5 7.5 1.063 0 2.304-.27 3.585-.78l2.175.783a.75.75 0 0 1-.51 1.414l-2.209-.794A12.302 12.302 0 0 1 12 21c-3.57 0-7.955-2.02-10.5-7.5a.75.75 0 0 1 0-.42 12.303 12.303 0 0 1 1.714-3.5l-.934-.334a.75.75 0 0 1-.45-.96Z" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 5c-4.134 0-7.932 2.561-10.46 7.4a.75.75 0 0 0 0 .6C4.068 17.939 7.866 20.5 12 20.5s7.932-2.561 10.46-7.4a.75.75 0 0 0 0-.6C19.932 7.561 16.134 5 12 5Zm0 13c-3.07 0-6.66-1.88-9.05-6 2.39-4.12 5.98-6 9.05-6s6.66 1.88 9.05 6c-2.39 4.12-5.98 6-9.05 6Zm0-10a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
  {/* Mensaje informativo opcional; puedes eliminarlo si no aplica */}
  <p className="text-sm text-gray-600">Ingresa tus credenciales para continuar.</p>
      </div>
    </div>
  );
}
