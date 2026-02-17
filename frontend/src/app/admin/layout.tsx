'use client';
import '@/app/tailwind.css';
import AdminSidebar from '@/app/components/admin/layout/Sidebar';
import AdminHeader from '@/app/components/admin/layout/Header';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState('250px');

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // En móvil, sidebar cerrada por defecto
      setSidebarWidth(mobile ? '0px' : '250px');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Actualizar ancho del sidebar según estado (abierto/cerrado)
  useEffect(() => {
    if (isMobile) {
      setSidebarWidth(sidebarOpen ? '280px' : '0px');
    } else {
      setSidebarWidth(sidebarOpen ? '250px' : '80px');
    }
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar: en escritorio es relative, en móvil es fixed (controlado dentro del componente) */}
      <AdminSidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        sidebarWidth={sidebarWidth}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Área principal (derecha) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header sticky */}
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-white border-b border-gray-200 px-[clamp(12px,3vw,24px)] h-[clamp(56px,8vw,64px)] shadow-sm">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors shrink-0"
            aria-label={sidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
          >
            {isMobile ? '☰' : (sidebarOpen ? '←' : '→')}
          </button>
          <div className="flex-1 flex justify-between items-center min-w-0">
            <AdminHeader isMobile={isMobile} />
          </div>
        </header>

        {/* Contenido scrolleable */}
        <main className="flex-1 overflow-y-auto p-[clamp(16px,4vw,24px)] bg-gray-50">
          {children}
        </main>
      </div>

      {/* Overlay para móvil cuando el sidebar está abierto */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}