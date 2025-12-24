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
  
    const menuItems = [
      { name: 'Dashboard', icon: '🏠', href: '/admin' },
      { name: 'Productos', icon: '📦', href: '/admin/productos' },
      { name: 'Pedidos', icon: '🛒', href: '/admin/pedidos' },
      { name: 'Clientes', icon: '👥', href: '/admin/clientes' },
      { name: 'Ventas', icon: '💰', href: '/admin/ventas' },
      { name: 'Reportes', icon: '📊', href: '/admin/reportes' },
      { name: 'Configuración', icon: '⚙️', href: '/admin/configuracion' },
    ];

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
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: '#111827',
          color: 'white',
          position: isMobile ? 'fixed' : 'relative',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 50,
          transition: 'width 0.3s ease, transform 0.3s ease',
          overflow: 'hidden',
          boxShadow: isMobile && sidebarOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none',
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        {/* Contenido del Sidebar aquí */}
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}>
              🍦
            </div>
            {sidebarOpen && (
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Heladería Sharita</h1>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Panel Admin</p>
              </div>
            )}
          </div>
          {/* Menú items... */}
          <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px', 
          width: '100%',
          flex: 1,
        }}>
          {menuItems.map((item, idx) => {
            const isActive = activeItem === item.href;
            return (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.href);
                  console.log('Navegando a:', item.href);
                  // Aquí iría la navegación real con router.push()
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '12px',
                  color: isActive ? 'white' : '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '22px',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? '#374151' : 'transparent',
                  borderRadius: '8px',
                  gap: '12px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ 
                  fontSize: '22px',
                  lineHeight: 1,
                  width: '24px',
                  textAlign: 'center',
                }}>
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span style={{ 
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '400',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}>
                    {item.name}
                  </span>
                )}
              </a>
            );
          })}
        </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
        />
      )}

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
            <h1>header</h1>
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
