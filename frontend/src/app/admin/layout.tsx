'use client';
import '@/app/tailwind.css';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/app/components/admin/layout/Sidebar';
import AdminHeader from '@/app/components/admin/layout/Header';
import { Button } from '@/components/ui/button';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(prev => mobile ? false : true);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header sticky con botones */}
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-background border-b border-border px-4 sm:px-6 h-16 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0"
            aria-label={sidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
          >
            {isMobile ? (
              <Menu className="h-5 w-5" />
            ) : sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>

          {/* Header (con información de usuario, buscador, etc.) */}
          <div className="flex-1">
            <AdminHeader />
          </div>
        </header>

        {/* Contenido scrolleable */}
        <main className="flex-1 overflow-y-auto dark:bg-muted/50 bg-primary/20">
          {children}
        </main>
      </div>
    </div>
  );
}