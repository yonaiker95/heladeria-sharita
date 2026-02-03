'use client';
import '@/app/tailwind.css';
import AdminSidebar from '@/app/components/admin/Sidebar';
import AdminHeader from '@/app/components/admin/Header';


import { useState, useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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

  // Actualizar sidebar width cuando cambia el estado
  useEffect(() => {
    if (isMobile) {
      setSidebarWidth(sidebarOpen ? '280px' : '0px');
    } else {
      setSidebarWidth(sidebarOpen ? '250px' : '80px');
    }
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [activeItem, setActiveItem] = useState('/admin');

    const handleItemClick = (href: string) => {
    setActiveItem(href);
    // if (isMobile && onClose) {
    //   onClose();
    // }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      width: '100%',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Sidebar */}
      <AdminSidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        sidebarWidth={sidebarWidth}
        setSidebarOpen={setSidebarOpen}
      />



      {/* Contenido principal */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          transition: 'margin-left 0.3s ease',
          marginLeft: isMobile ? '0' : (sidebarOpen ? '0px' : '0px'),
        }}
      >
        {/* Header */}
        <div style={{
          height: 'clamp(56px, 8vw, 64px)',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 clamp(12px, 3vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          {/* Botón para toggle sidebar en móvil */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
              aria-label="Menú"
            >
              ☰
            </button>
          )}

          {/* Botón para toggle sidebar en desktop */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
              aria-label={sidebarOpen ? "Colapsar menú" : "Expandir menú"}
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          )}

          {/* Resto del header... */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AdminHeader  
              isMobile={isMobile}
              />
            {/* Contenido del header */}
          </div>
        </div>

        {/* Contenido principal */}
        <main style={{
          flex: 1,
          padding: 'clamp(16px, 4vw, 24px)',
          overflowY: 'auto',
          backgroundColor: '#f9fafb',
          minHeight: 'calc(100vh - clamp(56px, 8vw, 64px))',
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
