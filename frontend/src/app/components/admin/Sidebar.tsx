// 'use client';
// import { useState, useEffect } from 'react';

// export default function AdminSidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeItem, setActiveItem] = useState('/admin');

//   // Detectar si es móvil
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsOpen(true);
//       } else {
//         setIsOpen(false);
//       }
//     };

//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   const menuItems = [
//     { name: 'Dashboard', icon: '🏠', href: '/admin' },
//     { name: 'Productos', icon: '📦', href: '/admin/productos' },
//     { name: 'Pedidos', icon: '🛒', href: '/admin/pedidos' },
//     { name: 'Clientes', icon: '👥', href: '/admin/clientes' },
//     { name: 'Ventas', icon: '💰', href: '/admin/ventas' },
//     { name: 'Reportes', icon: '📊', href: '/admin/reportes' },
//     { name: 'Configuración', icon: '⚙️', href: '/admin/configuracion' },
//   ];

//   const handleItemClick = (href: string) => {
//     setActiveItem(href);
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   const handleLogout = () => {
//     // Lógica de logout aquí
//     console.log('Cerrando sesión...');
//   };

//   return (
//     <>
//       {/* Botón de menú móvil */}
//       {isMobile && (
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           style={{
//             position: 'fixed',
//             top: 'clamp(12px, 2vw, 16px)',
//             left: 'clamp(12px, 2vw, 16px)',
//             zIndex: 1000,
//             width: 'clamp(40px, 8vw, 48px)',
//             height: 'clamp(40px, 8vw, 48px)',
//             borderRadius: '8px',
//             backgroundColor: '#111827',
//             color: 'white',
//             border: 'none',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: 'clamp(18px, 4vw, 24px)',
//             cursor: 'pointer',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//           }}
//           aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//       )}

//       {/* Overlay para móvil */}
//       {isMobile && isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 998,
//           }}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         style={{
//           width: isMobile 
//             ? (isOpen ? 'clamp(200px, 70vw, 280px)' : '0')
//             : 'clamp(60px, 12vw, 80px)',
//           minHeight: '100vh',
//           backgroundColor: '#111827',
//           color: 'white',
//           position: isMobile ? 'fixed' : 'fixed',
//           left: 0,
//           top: 0,
//           padding: isMobile ? 'clamp(16px, 4vw, 24px) clamp(12px, 3vw, 20px)' : 'clamp(12px, 3vw, 16px) 0',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: isMobile ? 'flex-start' : 'center',
//           zIndex: 999,
//           transition: 'all 0.3s ease',
//           overflowX: 'hidden',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         {/* Logo */}
//         <div style={{ 
//           marginBottom: 'clamp(24px, 6vw, 32px)', 
//           width: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: isMobile ? 'space-between' : 'center',
//           gap: '12px',
//         }}>
//           <div style={{ 
//             width: 'clamp(36px, 8vw, 48px)', 
//             height: 'clamp(36px, 8vw, 48px)', 
//             borderRadius: '12px', 
//             background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: 'clamp(18px, 4vw, 24px)',
//             flexShrink: 0,
//           }}>
//             🍦
//           </div>
          
//           {isMobile && isOpen && (
//             <div style={{ flex: 1 }}>
//               <h1 style={{ 
//                 fontSize: 'clamp(16px, 4vw, 20px)', 
//                 fontWeight: '600',
//                 margin: 0,
//                 color: 'white',
//               }}>
//                 Heladería Sharita
//               </h1>
//               <p style={{ 
//                 fontSize: 'clamp(10px, 2.5vw, 12px)', 
//                 color: '#9ca3af',
//                 margin: '4px 0 0 0',
//               }}>
//                 Panel Admin
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Menu Items */}
//         <div style={{ 
//           display: 'flex', 
//           flexDirection: 'column', 
//           gap: 'clamp(4px, 1vw, 8px)', 
//           width: '100%',
//           flex: 1,
//         }}>
//           {menuItems.map((item, idx) => {
//             const isActive = activeItem === item.href;
//             return (
//               <a
//                 key={idx}
//                 href={item.href}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleItemClick(item.href);
//                   // Navegación real iría aquí
//                   console.log('Navegando a:', item.href);
//                 }}
//                 style={{
//                   display: 'flex',
//                   flexDirection: isMobile && isOpen ? 'row' : 'column',
//                   alignItems: 'center',
//                   justifyContent: isMobile && isOpen ? 'flex-start' : 'center',
//                   padding: isMobile && isOpen 
//                     ? 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)' 
//                     : 'clamp(10px, 2.5vw, 14px) 0',
//                   color: isActive ? 'white' : '#9ca3af',
//                   textDecoration: 'none',
//                   fontSize: 'clamp(20px, 5vw, 28px)',
//                   transition: 'all 0.2s',
//                   backgroundColor: isActive ? '#374151' : 'transparent',
//                   borderRadius: '8px',
//                   gap: isMobile && isOpen ? '12px' : '4px',
//                   width: '100%',
//                   boxSizing: 'border-box',
//                 }}
//                 onMouseOver={(e) => {
//                   if (!isActive) {
//                     e.currentTarget.style.color = 'white';
//                     e.currentTarget.style.backgroundColor = '#374151';
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (!isActive) {
//                     e.currentTarget.style.color = '#9ca3af';
//                     e.currentTarget.style.backgroundColor = 'transparent';
//                   }
//                 }}
//               >
//                 <span style={{ 
//                   fontSize: isMobile && isOpen 
//                     ? 'clamp(18px, 4vw, 22px)' 
//                     : 'clamp(20px, 5vw, 28px)',
//                   lineHeight: 1,
//                 }}>
//                   {item.icon}
//                 </span>
//                 {(!isMobile || isOpen) && (
//                   <span style={{ 
//                     fontSize: isMobile && isOpen 
//                       ? 'clamp(12px, 3vw, 14px)' 
//                       : 'clamp(8px, 2vw, 10px)',
//                     marginTop: isMobile && isOpen ? 0 : '4px',
//                     fontWeight: isActive ? '600' : '400',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     maxWidth: '100%',
//                   }}>
//                     {item.name}
//                   </span>
//                 )}
//               </a>
//             );
//           })}
//         </div>

//         {/* Logout at bottom */}
//         <div style={{ 
//           marginTop: 'auto', 
//           paddingTop: 'clamp(12px, 3vw, 16px)', 
//           borderTop: '1px solid #374151', 
//           width: '100%',
//           boxSizing: 'border-box',
//         }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: 'flex',
//               flexDirection: isMobile && isOpen ? 'row' : 'column',
//               alignItems: 'center',
//               justifyContent: isMobile && isOpen ? 'flex-start' : 'center',
//               padding: isMobile && isOpen 
//                 ? 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)' 
//                 : 'clamp(10px, 2.5vw, 14px) 0',
//               color: '#ef4444',
//               background: 'none',
//               border: 'none',
//               width: '100%',
//               cursor: 'pointer',
//               fontSize: 'clamp(20px, 5vw, 28px)',
//               borderRadius: '8px',
//               gap: isMobile && isOpen ? '12px' : '4px',
//               transition: 'all 0.2s',
//             }}
//             onMouseOver={(e) => {
//               e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.backgroundColor = 'transparent';
//             }}
//           >
//             <span style={{ 
//               fontSize: isMobile && isOpen 
//                 ? 'clamp(18px, 4vw, 22px)' 
//                 : 'clamp(20px, 5vw, 28px)',
//               lineHeight: 1,
//             }}>
//               🚪
//             </span>
//             {(!isMobile || isOpen) && (
//               <span style={{ 
//                 fontSize: isMobile && isOpen 
//                   ? 'clamp(12px, 3vw, 14px)' 
//                   : 'clamp(8px, 2vw, 10px)',
//                 marginTop: isMobile && isOpen ? 0 : '4px',
//                 fontWeight: '500',
//                 whiteSpace: 'nowrap',
//               }}>
//                 Cerrar Sesión
//               </span>
//             )}
//           </button>

//           {/* Información de versión */}
//           {(!isMobile || isOpen) && (
//             <div style={{ 
//               marginTop: 'clamp(12px, 3vw, 16px)', 
//               textAlign: 'center',
//               fontSize: 'clamp(10px, 2.5vw, 12px)',
//               color: '#6b7280',
//               padding: '0 4px',
//             }}>
//               <p style={{ margin: '4px 0' }}>v1.0.0</p>
//               <p style={{ margin: '4px 0' }}>© {new Date().getFullYear()}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Espacio para el contenido cuando sidebar está fija */}
//       {!isMobile && (
//         <div style={{ 
//           width: 'clamp(60px, 12vw, 80px)',
//           minHeight: '100vh',
//           flexShrink: 0,
//         }} />
//       )}
//     </>
//   );
// }

// frontend/src/app/components/admin/AdminSidebar.tsx - VERSIÓN MODIFICADA
// frontend/src/app/components/admin/Sidebar.tsx
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