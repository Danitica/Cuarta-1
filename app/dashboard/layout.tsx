"use client";

import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
	{ href: "/dashboard/usuario", label: "USUARIO" },
	{ href: "/dashboard/propietario", label: "PROPIETARIO" },
	{ href: "/dashboard/mascota", label: "MASCOTA" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	// Cerrar el dropdown al hacer clic fuera
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

			return (
				<div className="min-h-screen flex flex-col">
					<header className="w-full bg-[#8875a2] shadow-sm">
						<div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
							<div className="flex items-center space-x-10">
								<span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">MiCAN</span>
								<nav className="hidden md:flex space-x-8">
							{navItems.map(item => {
								const active = pathname.startsWith(item.href);
								return (
									<Link
										key={item.href}
										href={item.href}
											className={
													"text-base md:text-lg font-semibold transition-colors pb-1 " +
											(active
														? "text-white border-b-2 border-white"
														: "text-white/80 hover:text-white")
										}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>
					</div>
					<div className="flex items-center space-x-4 pr-16">
						{/* Avatar y nombre del usuario */}
						<div className="h-10 w-10 rounded-full bg-white/25 flex items-center justify-center text-white text-sm font-bold">
							{user?.email?.[0]?.toUpperCase() || "?"}
						</div>
						<span className="hidden sm:inline text-sm md:text-base text-white/90 font-medium max-w-[160px] truncate">
							{user ? user.name || user.email : "Sin usuario"}
						</span>
					</div>

					{/* Hamburguesa fija al borde derecho, visible en todas las resoluciones */}
					<div ref={menuRef} className="absolute right-4 top-1/2 -translate-y-1/2">
						<button
							aria-label="Abrir menú"
							onClick={() => setMenuOpen(v => !v)}
							className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>

						{menuOpen && (
							<div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 z-50">
								<div className="py-2">
									{navItems.map(item => (
										<Link
											key={item.href}
											href={item.href}
											onClick={() => setMenuOpen(false)}
											className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
										>
											{item.label}
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</header>
			<main className="flex-1">{children}</main>
		</div>
	);
}

