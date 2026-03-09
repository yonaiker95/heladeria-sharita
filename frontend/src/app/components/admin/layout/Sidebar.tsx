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
  Calendar,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useEffect } from 'react';
import { useAuthStore } from '@/app/state/userStore';

interface AdminSidebarProps {
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarWidth?: string; // Podemos mantenerlo si es necesario, pero usaremos clases fijas
}

const menuItems = [
  {
    name: 'Dashboard',
    icon: Home,
    href: '/admin/dashboard',
    permission: ['SuperAdmin', 'admin', 'CFO', 'Seller', 'RRHH'],
    "coming soon": false
  },
  {
    name: 'Productos',
    icon: Package,
    href: '/admin/products',
    permission: ['SuperAdmin', 'admin', 'Seller'],
    "coming soon": false
  },
  {
    name: 'Pedidos',
    icon: ShoppingCart,
    href: '/admin/orders',
    permission: ['SuperAdmin', 'admin', 'Seller'],
    "coming soon": false
  },
  {
    name: 'Clientes',
    icon: Users,
    href: '/admin/client',
    permission: ['SuperAdmin', 'admin', 'Seller'],
    "coming soon": false
  },
  {
    name: 'Personal',
    icon: Users,
    href: '/admin/employee',
    permission: ['SuperAdmin', 'admin', 'RRHH'],
    "coming soon": false
  },
  {
    name: 'Ausencias (Proximamente)',
    icon: Calendar,
    href: '/admin/absences',
    permission: ['SuperAdmin', 'admin', 'RRHH'],
    "coming soon": true
  },
  {
    name: 'Reclutamiento (Proximamente)',
    icon: Briefcase,
    href: '/admin/recruitment',
    permission: ['SuperAdmin', 'admin', 'RRHH'],
    "coming soon": true
  },
  {
    name: 'Capacitacion (Proximamente)',
    icon: GraduationCap,
    href: '/admin/training',
    permission: ['SuperAdmin', 'admin', 'RRHH'],
    "coming soon": true
  },
  {
    name: 'Ventas',
    icon: DollarSign,
    href: '/admin/sales',
    permission: ['SuperAdmin', 'admin'],
    "coming soon": false
  },
  {
    name: 'Ingresos',
    icon: DollarSign,
    href: '/admin/income',
    permission: ['SuperAdmin', 'admin', 'CFO'],
    "coming soon": false
  },
  {
    name: 'Gastos',
    icon: DollarSign,
    href: '/admin/bills',
    permission: ['SuperAdmin', 'admin', 'CFO'],
    "coming soon": false
  },
  {
    name: 'Reportes',
    icon: BarChart3,
    href: '/admin/reports',
    permission: ['SuperAdmin', 'admin', 'CFO'],
    "coming soon": false
  },
  {
    name: 'Configuración',
    icon: Settings,
    href: '/admin/settings',
    permission: ['SuperAdmin', 'admin'],
    "coming soon": false
  },
];

export default function AdminSidebar({
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  useEffect(() => {
    console.log('Rol actual del usuario:', user?.permission);
  }, [user?.permission]);

  const handleItemClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.permission) return false;

    return item.permission.includes(user?.permission || '');
  });

  const SidebarContent = (
    <div className="h-full overflow-y-auto p-5 dark:bg-gray-900 text-black dark:text-white bg-secondary">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl shrink-0">
          🍦
        </div>
        {(isMobile || sidebarOpen) && (
          <div>
            <h1 className="text-lg font-semibold ">Heladería Sharita</h1>
            <p className="text-xs text-gray-400">
              {user?.permission?.includes('SuperAdmin') &&
                'Super Administrador'}
              {user?.permission?.includes('admin') && 'Administrador'}
              {user?.permission?.includes('seller') && 'Vendedor'}
              {user?.permission?.includes('CFO') && 'Chief Financial Officer'}
              {user?.permission?.includes('RRHH') && 'Recursos Humanos'}
            </p>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleItemClick}
              className={`
                flex items-center gap-3 p-3 rounded-lg no-underline transition-all
                ${item['coming soon'] ? 'opacity-50 pointer-events-none': ''}
                ${
                  !isMobile && !sidebarOpen ? 'justify-center' : 'justify-start'
                }
                ${
                  isActive
                    ? 'bg-gray-800 text-white border-l-4 border-pink-500'
                    : 'dark:text-gray-400 text-gray-600 hover:bg-gray-800 hover:text-gray-200'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.name}</span>}
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
        <SheetContent
          side="left"
          className="p-0 bg-gray-900 text-white border-r-0 w-70"
        >
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
