'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logoutUser } from '../../login/AuthFetch';

interface AdminSidebarProps {
  isMobile?: boolean;
}

export default function AdminHeader({ isMobile }: AdminSidebarProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Función para verificar el ancho
    const checkSize = () => setIsDesktop(window.innerWidth >= 640);

    checkSize(); // Verificar al cargar
    window.addEventListener('resize', checkSize); // Escuchar cambios
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      router.push('/login');
    });
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 40, // Por debajo del sidebar móvil pero sobre el contenido
      }}
    >
      {/* Lado Izquierdo - Buscador */}
      <div style={{ flex: '1'}}>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
            }}
          >
            <svg
              style={{ width: '18px', height: '18px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar productos, pedidos..."
            style={{
              padding: '8px 12px 8px 40px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              width: isMobile ? '95%' : '50%',
              fontSize: '14px',
              backgroundColor: '#f9fafb',
            }}
          />
        </div>
      </div>

      {/* Lado Derecho - Notificaciones y Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notificaciones */}
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
          }}
        >
          <svg
            style={{ width: '20px', height: '20px', color: '#374151' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white',
            }}
          />
        </button>

        {/* Perfil con Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <div
              style={{
                textAlign: 'right',
                display: isDesktop ? 'block' : 'none', // ✅ Cambio dinámico
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                Admin
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                Ver perfil
              </p>
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              A
            </div>
          </button>

          {/* Menú Desplegable (Dropdown) */}
          {isProfileOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                width: '200px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              <div
                style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}
              >
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                  Conectado como
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  admin@heladeria.com
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/configuracion')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#f9fafb')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                ⚙️ Configuración
              </button>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#ef4444',
                  borderTop: '1px solid #f3f4f6',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#fef2f2')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
