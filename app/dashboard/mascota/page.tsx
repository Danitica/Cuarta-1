import Image from "next/image";

export default function MascotaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e1d3ea' }}>
      {/* Panel a pantalla completa con imagen tipo marca de agua */}
      <div className="relative min-h-[calc(100vh-0px)] w-full">
        <Image
          src="/veterinaria-mi-can.jpeg"
          alt="Marca de agua clínica MiCAN"
          fill
          priority
          className="object-contain opacity-30 md:opacity-35 pointer-events-none select-none"
        />

        {/* Heading superior izquierda */}
        <div className="relative z-10 p-4 md:p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Mascota</h2>
        </div>
      </div>
    </div>
  );
}
