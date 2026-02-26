'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logoutUser } from '../../login/AuthFetch';
import { UserInfo } from './user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  permission: {
    permission: string;
  };
}

export const AdminHeader = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data: User[] = await UserInfo(); // Asumimos que devuelve array con un elemento
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      router.push('/login');
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      {/* Buscador */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar productos, pedidos..."
            className="pl-8 w-full sm:w-96 bg-muted"
          />
        </div>
      </div>

      {/* Acciones derecha */}
      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

        {/* Perfil con Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 h-auto p-1"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium leading-none">
                  {loading ? 'Cargando...' : userData?.name}
                </p>
                <p className="text-xs text-muted-foreground">Ver perfil</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  {loading ? '?' : userData?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{userData?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botón de cambio de tema */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
