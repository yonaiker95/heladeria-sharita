'use client';
import '@/app/tailwind.css';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import AdminSidebar from '@/app/components/admin/layout/Sidebar';
import AdminHeader from '@/app/components/admin/layout/Header';
import { Button } from '@/components/ui/button';
import { Menu, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();

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
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

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

          {/* Botón de cambio de tema */}
          {/* <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </Button> */}
        </header>

        {/* Contenido scrolleable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/50">
          {children}
        </main>
      </div>
    </div>
  );
}