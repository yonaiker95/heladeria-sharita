
'use client';

import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export default function AdminSidebar({ 
  isMobile = false, 
  sidebarOpen = true, 
  onToggle, 
  onClose 
}: AdminSidebarProps) {
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
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí iría la lógica de logout
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        style={{
          width: isMobile ? (sidebarOpen ? '280px' : '0px') : (sidebarOpen ? '250px' : '0px'),
          minHeight: '100vh',
          backgroundColor: '#111827',
          color: 'white',
          position: isMobile ? 'fixed' : 'fixed',
          left: 0,
          top: 0,
          padding: isMobile ? '24px 20px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          zIndex: 50,
          transition: 'width 0.3s ease, transform 0.3s ease',
          overflowX: 'hidden',
          overflowY: 'auto',
          boxSizing: 'border-box',
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          boxShadow: isMobile && sidebarOpen ? '2px 0 10px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Logo */}
        <div style={{ 
          marginBottom: '32px', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '12px',
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0,
          }}>
            🍦
          </div>
          
          {sidebarOpen && (
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '18px', 
                fontWeight: '600',
                margin: 0,
                color: 'white',
              }}>
                Heladería Sharita
              </h1>
              <p style={{ 
                fontSize: '12px', 
                color: '#9ca3af',
                margin: '4px 0 0 0',
              }}>
                Panel Admin
              </p>
            </div>
          )}
        </div>

        {/* Menu Items */}
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

        {/* Logout at bottom */}
        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          borderTop: '1px solid #374151', 
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '12px',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              fontSize: '22px',
              borderRadius: '8px',
              gap: '12px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ 
              fontSize: '22px',
              lineHeight: 1,
              width: '24px',
              textAlign: 'center',
            }}>
              🚪
            </span>
            {sidebarOpen && (
              <span style={{ 
                fontSize: '14px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
              }}>
                Cerrar Sesión
              </span>
            )}
          </button>

          {/* Información de versión */}
          {sidebarOpen && (
            <div style={{ 
              marginTop: '16px', 
              textAlign: 'center',
              fontSize: '12px',
              color: '#6b7280',
              padding: '0 4px',
            }}>
              <p style={{ margin: '4px 0' }}>v1.0.0</p>
              <p style={{ margin: '4px 0' }}>© {new Date().getFullYear()}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}