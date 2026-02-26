'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  IceCream,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface AdminSidebarMobileProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  onClose?: () => void;
  sidebarWidth?: string; // opcional, si quieres mantenerlo
}

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/admin/dashboard' },
  { name: 'Productos', icon: Package, href: '/admin/productos' },
  { name: 'Pedidos', icon: ShoppingCart, href: '/admin/pedidos' },
  { name: 'Clientes', icon: Users, href: '/admin/clientes' },
  { name: 'Ventas', icon: DollarSign, href: '/admin/ventas' },
  { name: 'Reportes', icon: BarChart3, href: '/admin/reportes' },
  { name: 'Configuración', icon: Settings, href: '/admin/configuracion' },
];

export default function AdminSidebarMobile({
  isMobile,
  sidebarOpen,
  onClose,
}: AdminSidebarMobileProps) {
  const pathname = usePathname();

  // Contenido común del sidebar (se usa tanto en móvil como en desktop)
  const SidebarContent = (
    <div className="h-full overflow-y-auto p-5 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
          <IceCream className="h-5 w-5 text-white" />
        </div>
        {(sidebarOpen || isMobile) && (
          <div>
            <h1 className="text-lg font-semibold">Heladería Sharita</h1>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all
                ${sidebarOpen || isMobile ? 'justify-start' : 'justify-center'}
                ${isActive 
                  ? 'bg-gray-800 text-white border-l-4 border-pink-500' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(sidebarOpen || isMobile) && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Botón de logout */}
      <Button
        variant="ghost"
        className="mt-auto gap-3 justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
        onClick={() => {/* lógica de logout */}}
      >
        <LogOut className="h-5 w-5" />
        {(sidebarOpen || isMobile) && <span>Cerrar Sesión</span>}
      </Button>
    </div>
  );

  // Vista móvil con Sheet
  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={(open) => !open && onClose?.()}>
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
      color2
    </div>
  );
}