'use client';
import { usePathname, useRouter } from 'next/navigation'; // Importaciones de Next.js
import Link from 'next/link';

interface AdminSidebarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  onClose?: () => void;
  sidebarWidth?: string;
  setSidebarOpen: (open: boolean) => void; // Quitamos el opcional para evitar errores
}

export default function AdminSidebar({
  isMobile,
  sidebarOpen,
  onClose,
  sidebarWidth,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname(); // Detecta la URL actual automáticamente
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

  const handleItemClick = (href: string) => {
    if (isMobile) {
      setSidebarOpen(false); // Cerramos el sidebar en móvil tras click
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
          boxShadow: isMobile && sidebarOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none',
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
          {/* Logo / Header */}
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
            }}>🍦</div>
            {sidebarOpen && (
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Heladería Sharita</h1>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Panel Admin</p>
              </div>
            )}
          </div>

          {/* Menú de Navegación */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item, idx) => {
              // Verificamos si la ruta actual coincide con el href
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => handleItemClick(item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    padding: '12px',
                    color: isActive ? 'white' : '#9ca3af',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#374151' : 'transparent',
                    borderRadius: '8px',
                    gap: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '22px', width: '24px', textAlign: 'center' }}>
                    {item.icon}
                  </span>
                  {sidebarOpen && (
                    <span style={{ fontSize: '14px', fontWeight: isActive ? '600' : '400' }}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay para móvil mejorado */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            backdropFilter: 'blur(2px)', // Toque moderno
          }}
        />
      )}
    </>
  );
}