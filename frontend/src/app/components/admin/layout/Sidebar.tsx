// 'use client';
// import { usePathname, useRouter } from 'next/navigation'; // Importaciones de Next.js
// import Link from 'next/link';

// interface AdminSidebarProps {
//   isMobile?: boolean;
//   sidebarOpen?: boolean;
//   onClose?: () => void;
//   sidebarWidth?: string;
//   setSidebarOpen: (open: boolean) => void; // Quitamos el opcional para evitar errores
// }

// export default function AdminSidebar({
//   isMobile,
//   sidebarOpen,
//   onClose,
//   sidebarWidth,
//   setSidebarOpen,
// }: AdminSidebarProps) {
//   const pathname = usePathname(); // Detecta la URL actual automáticamente
//   const router = useRouter();

//   const menuItems = [
//     { name: 'Dashboard', icon: '🏠', href: '/admin/dashboard' },
//     { name: 'Productos', icon: '📦', href: '/admin/products' },
//     { name: 'Pedidos', icon: '🛒', href: '/admin/orders' },
//     { name: 'Clientes', icon: '👥', href: '/admin/users' },
//     { name: 'Ventas', icon: '💰', href: '/admin/sales' },
//     { name: 'Reportes', icon: '📊', href: '/admin/reports' },
//     { name: 'Configuración', icon: '⚙️', href: '/admin/settings' },
//   ];

//   const handleItemClick = (href: string) => {
//     if (isMobile) {
//       setSidebarOpen(false); // Cerramos el sidebar en móvil tras click
//     }
//   };

//   return (
//     <>
//   <div
//     className={`
//       ${isMobile ? 'fixed' : 'relative'}
//       left-0 top-0 bottom-0 z-50
//       bg-gray-900 text-white
//       overflow-hidden transition-all duration-300 ease
//       ${isMobile && sidebarOpen ? 'shadow-[2px_0_8px_rgba(0,0,0,0.3)]' : 'shadow-none'}
//       ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
//     `}
//     style={{ width: sidebarWidth }} // Ancho dinámico (puede ser un valor como '250px' o '16rem')
//   >
//     <div className="p-5 h-full overflow-y-auto">
//       {/* Logo / Header */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl shrink-0">
//           🍦
//         </div>
//         {sidebarOpen && (
//           <div>
//             <h1 className="text-lg font-semibold m-0">Heladería Sharita</h1>
//             <p className="text-xs text-gray-400 mt-0.5 m-0">Panel Admin</p>
//           </div>
//         )}
//       </div>

//       {/* Menú de Navegación */}
//       <nav className="flex flex-col gap-1">
//         {menuItems.map((item, idx) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={idx}
//               href={item.href}
//               onClick={() => handleItemClick(item.href)}
//               className={`
//                 flex items-center gap-3 p-3 rounded-lg no-underline
//                 transition-colors duration-200
//                 ${sidebarOpen ? 'justify-start' : 'justify-center'}
//                 ${isActive ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400'}
//               `}
//             >
//               <span className="text-2xl w-6 text-center shrink-0">
//                 {item.icon}
//               </span>
//               {sidebarOpen && (
//                 <span className={`text-sm ${isActive ? 'font-semibold' : 'font-normal'}`}>
//                   {item.name}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   </div>

//   {/* Overlay para móvil */}
//   {isMobile && sidebarOpen && (
//     <div
//       onClick={() => setSidebarOpen(false)}
//       className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]"
//     />
//   )}
// </>
//     // <>
//     //   <div
//     //     style={{
//     //       width: sidebarWidth,
//     //       backgroundColor: '#111827',
//     //       color: 'white',
//     //       position: isMobile ? 'fixed' : 'relative',
//     //       left: 0,
//     //       top: 0,
//     //       bottom: 0,
//     //       zIndex: 50,
//     //       transition: 'width 0.3s ease, transform 0.3s ease',
//     //       overflow: 'hidden',
//     //       boxShadow: isMobile && sidebarOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none',
//     //       transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
//     //     }}
//     //   >
//     //     <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
//     //       {/* Logo / Header */}
//     //       <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
//     //         <div style={{
//     //             width: '40px', height: '40px', borderRadius: '12px',
//     //             background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
//     //             display: 'flex', alignItems: 'center', justifyContent: 'center',
//     //             fontSize: '22px', flexShrink: 0,
//     //         }}>🍦</div>
//     //         {sidebarOpen && (
//     //           <div>
//     //             <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Heladería Sharita</h1>
//     //             <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Panel Admin</p>
//     //           </div>
//     //         )}
//     //       </div>

//     //       {/* Menú de Navegación */}
//     //       <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//     //         {menuItems.map((item, idx) => {
//     //           // Verificamos si la ruta actual coincide con el href
//     //           const isActive = pathname === item.href;
              
//     //           return (
//     //             <Link
//     //               key={idx}
//     //               href={item.href}
//     //               onClick={() => handleItemClick(item.href)}
//     //               style={{
//     //                 display: 'flex',
//     //                 alignItems: 'center',
//     //                 justifyContent: sidebarOpen ? 'flex-start' : 'center',
//     //                 padding: '12px',
//     //                 color: isActive ? 'white' : '#9ca3af',
//     //                 textDecoration: 'none',
//     //                 backgroundColor: isActive ? '#374151' : 'transparent',
//     //                 borderRadius: '8px',
//     //                 gap: '12px',
//     //                 transition: 'all 0.2s',
//     //               }}
//     //             >
//     //               <span style={{ fontSize: '22px', width: '24px', textAlign: 'center' }}>
//     //                 {item.icon}
//     //               </span>
//     //               {sidebarOpen && (
//     //                 <span style={{ fontSize: '14px', fontWeight: isActive ? '600' : '400' }}>
//     //                   {item.name}
//     //                 </span>
//     //               )}
//     //             </Link>
//     //           );
//     //         })}
//     //       </nav>
//     //     </div>
//     //   </div>

//     //   {/* Overlay para móvil mejorado */}
//     //   {isMobile && sidebarOpen && (
//     //     <div
//     //       onClick={() => setSidebarOpen(false)}
//     //       style={{
//     //         position: 'fixed',
//     //         top: 0, left: 0, right: 0, bottom: 0,
//     //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     //         zIndex: 40,
//     //         backdropFilter: 'blur(2px)', // Toque moderno
//     //       }}
//     //     />
//     //   )}
//     // </>
//   );
// }



// Nuevo Sidebar.tsx con Tailwind CSS:
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, ShoppingCart, Users, DollarSign, BarChart3, Settings } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface AdminSidebarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarWidth?: string; // Podemos mantenerlo si es necesario, pero usaremos clases fijas
}

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/admin/dashboard' },
  { name: 'Productos', icon: Package, href: '/admin/products' },
  { name: 'Pedidos', icon: ShoppingCart, href: '/admin/orders' },
  { name: 'Clientes', icon: Users, href: '/admin/users' },
  { name: 'Ventas', icon: DollarSign, href: '/admin/sales' },
  { name: 'Reportes', icon: BarChart3, href: '/admin/reports' },
  { name: 'Configuración', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar({
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const handleItemClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  // Contenido común del sidebar
  const SidebarContent = (
    <div className="h-full overflow-y-auto p-5 bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl shrink-0">
          🍦
        </div>
        {(isMobile || sidebarOpen) && (
            <div>
            <h1 className="text-lg font-semibold">Heladería Sharita</h1>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>
          
        )}
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1">
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleItemClick}
              className={`
                flex items-center gap-3 p-3 rounded-lg no-underline transition-all
                ${!isMobile && !sidebarOpen ? 'justify-center' : 'justify-start'}
                ${isActive 
                  ? 'bg-gray-800 text-white border-l-4 border-pink-500' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(isMobile && sidebarOpen) && (
                <span className="text-sm">{item.name}</span>
              )}
              {(!isMobile && sidebarOpen) && (
                <span className="text-sm">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  // Vista móvil con Sheet
  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 bg-gray-900 text-white border-r-0 w-[280px]">
          {SidebarContent}
color
        </SheetContent>
      </Sheet>
    );
  }

  // Vista desktop (colapsable)
  return (
    <div
      className={`bg-gray-900 text-white overflow-hidden transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {SidebarContent}
    </div>
  );
}