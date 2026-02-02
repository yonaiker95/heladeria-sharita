


export default function AdminHeader() {
  return (
    <div
      style={{
        height: 'clamp(56px, 8vw, 64px)',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 clamp(12px, 3vw, 24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Left side - Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          order: '1',
          flex: '1',
          minWidth: '200px',
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <div
            style={{
              position: 'absolute',
              left: 'clamp(8px, 2vw, 12px)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              zIndex: '1',
              pointerEvents: 'none',
            }}
          >
            <svg
              style={{
                width: 'clamp(16px, 3vw, 20px)',
                height: 'clamp(16px, 3vw, 20px)',
              }}
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
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              padding: 'clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px) clamp(6px, 1.5vw, 8px) clamp(36px, 8vw, 40px)',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              width: '100%',
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              backgroundColor: '#f9fafb',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Right side - User & Notifications */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          order: '2',
          flexShrink: '0',
        }}
      >
        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            width: 'clamp(36px, 6vw, 40px)',
            height: 'clamp(36px, 6vw, 40px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            border: 'none',
            cursor: 'pointer',
            flexShrink: '0',
          }}
          aria-label="Notificaciones"
        >
          <svg
            style={{
              width: 'clamp(16px, 3vw, 20px)',
              height: 'clamp(16px, 3vw, 20px)',
              color: '#374151',
            }}
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
          <div
            style={{
              position: 'absolute',
              top: 'clamp(2px, 0.5vw, 3px)',
              right: 'clamp(2px, 0.5vw, 3px)',
              width: 'clamp(6px, 1.5vw, 8px)',
              height: 'clamp(6px, 1.5vw, 8px)',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white',
            }}
            aria-label="3 notificaciones sin leer"
          />
        </button>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 2vw, 12px)',
            flexShrink: '0',
          }}
        >
          {/* User info - Hidden on very small screens */}
          <div
            style={{
              textAlign: 'right',
              display: 'none',
            }}
            id="user-info-desktop"
          >
            <p
              style={{
                fontWeight: '500',
                color: '#111827',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                margin: '0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
              }}
            >
              Administrador
            </p>
            <p
              style={{
                fontSize: 'clamp(10px, 2vw, 12px)',
                color: '#6b7280',
                margin: '2px 0 0 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
              }}
            >
              admin@heladeria.com
            </p>
          </div>

          {/* Mobile user info - Only shows name */}
          <div
            style={{
              textAlign: 'right',
              display: 'none',
            }}
            id="user-info-mobile"
          >
            <p
              style={{
                fontWeight: '500',
                color: '#111827',
                fontSize: '14px',
                margin: '0',
              }}
            >
              Admin
            </p>
          </div>

          {/* User Avatar */}
          <div
            style={{
              width: 'clamp(32px, 6vw, 40px)',
              height: 'clamp(32px, 6vw, 40px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(14px, 3vw, 16px)',
              flexShrink: '0',
              cursor: 'pointer',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            aria-label="Perfil del administrador"
            role="button"
            tabIndex={0}
          >
            A
          </div>

          {/* Mobile Menu Button - Hidden on desktop */}
          <button
            style={{
              display: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: '0',
            }}
            aria-label="Menú de usuario"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Toggle - Hidden on desktop */}
      <button
        style={{
          display: 'none',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#f3f4f6',
          border: 'none',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          order: '3',
          flexShrink: '0',
        }}
        aria-label="Buscar"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Responsive Styles via Media Queries in JS */}
      <style>{`
        @media (max-width: 768px) {
          /* Stack header elements vertically on very small screens */
          #user-info-desktop {
            display: none !important;
          }
          
          #user-info-mobile {
            display: block !important;
          }
          
          /* Adjust search bar width */
          div > div > div[style*="position: relative"] {
            max-width: 200px !important;
          }
        }
        
        @media (max-width: 640px) {
          /* Hide desktop search, show mobile toggle */
          div > div > div[style*="position: relative"] {
            display: none !important;
          }
          
          button[aria-label="Buscar"] {
            display: flex !important;
          }
          
          /* Adjust user info spacing */
          div > div > div[style*="display: flex"][style*="align-items: center"] {
            gap: 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          /* Compact header for very small screens */
          header {
            height: 48px !important;
            padding: 0 12px !important;
            gap: 8px !important;
          }
          
          /* Smaller user avatar */
          div[style*="background: linear-gradient"] {
            width: 32px !important;
            height: 32px !important;
            font-size: 14px !important;
          }
          
          /* Smaller notification button */
          button[aria-label="Notificaciones"] {
            width: 32px !important;
            height: 32px !important;
          }
          
          /* Show mobile menu button */
          button[aria-label="Menú de usuario"] {
            display: flex !important;
          }
        }
        
        @media (min-width: 1024px) {
          /* Desktop optimizations */
          div > div > div[style*="position: relative"] {
            max-width: 300px !important;
          }
        }
        
        /* Hover effects */
        button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        div[style*="background: linear-gradient"]:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
}