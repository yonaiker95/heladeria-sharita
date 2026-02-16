'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminSidebarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  onClose?: () => void;
  sidebarWidth?: string;
}

export default function AdminSidebarMobile({
  isMobile,
  sidebarOpen,
  onClose,
  sidebarWidth,
}: AdminSidebarProps) {
  // 1. Detectamos la ruta actual automáticamente para el estado "active"
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: '🏠', href: '/admin/dashboard' },
    { name: 'Productos', icon: '📦', href: '/admin/productos' },
    { name: 'Pedidos', icon: '🛒', href: '/admin/pedidos' },
    { name: 'Clientes', icon: '👥', href: '/admin/clientes' },
    { name: 'Ventas', icon: '💰', href: '/admin/ventas' },
    { name: 'Reportes', icon: '📊', href: '/admin/reportes' },
    { name: 'Configuración', icon: '⚙️', href: '/admin/configuracion' },
  ];

  // 2. Manejo de navegación y cierre de menú
  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
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
          boxShadow: isMobile && sidebarOpen ? '2px 0 12px rgba(0,0,0,0.5)' : 'none',
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header del Sidebar */}
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
            }}>🍦</div>
            {/* Solo mostramos el texto si está abierto o si es móvil (donde siempre está "abierto" al verse) */}
            {(sidebarOpen || isMobile) && (
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Heladería Sharita</h1>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Panel Admin</p>
              </div>
            )}
          </div>

          {/* Menú de Navegación */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {menuItems.map((item, idx) => {
              // Comparamos la ruta actual con el href del item
              const isActive = pathname === item.href;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={handleItemClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center',
                    padding: '12px',
                    color: isActive ? 'white' : '#9ca3af',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#374151' : 'transparent',
                    borderRadius: '8px',
                    gap: '12px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>
                    {item.icon}
                  </span>
                  {(sidebarOpen || isMobile) && (
                    <span style={{ fontSize: '14px', fontWeight: isActive ? '600' : '400' }}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Botón de Logout (Opcional pero recomendado) */}
          <button 
            onClick={() => {/* lógica de borrar cookies y redirect */}}
            style={{
              marginTop: 'auto', padding: '12px', backgroundColor: 'transparent',
              border: '1px solid #374151', color: '#f87171', borderRadius: '8px',
              cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center',
              justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center'
            }}
          >
            🚪 {(sidebarOpen || isMobile) && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Overlay: Solo visible en móvil cuando el sidebar está abierto */}
      {isMobile && sidebarOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}
    </>
  );
}