'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  ToggleLeft,
  ToggleRight,
  User,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// ---------- Tipos ----------
type UserRole = 'Admin' | 'CFO' | 'Seller' | 'RRHH' | 'SuperAdmin';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

// ---------- Datos mock ----------
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '555-1234',
    address: 'Av. Siempre Viva 123',
    role: 'RRHH',
    active: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '2',
    name: 'María Gómez',
    email: 'maria@example.com',
    phone: '555-5678',
    role: 'Seller',
    active: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    phone: '555-9012',
    address: 'Calle Falsa 456',
    role: 'CFO',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Ana López',
    email: 'ana@example.com',
    phone: '555-3456',
    role: 'admin',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Pedro Ramírez',
    email: 'pedro@example.com',
    role: 'SuperAdmin',
    active: false,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

// Colores para badges según rol
const roleColors: Record<UserRole, string> = {
  admin:
    'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-700',
  CFO: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700',
  Seller:
    'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700',
  RRHH: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
  SuperAdmin:
    'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
};

// Opciones de rol para selects
const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'Admin', label: 'Administrador' },
  { value: 'CFO', label: 'Chief Financial Officer' },
  { value: 'Seller', label: 'Vendedor' },
  { value: 'RRHH', label: 'Recursos Humanos' },
  { value: 'SuperAdmin', label: 'Super Administrador' },
];

import { useAuthStore } from '@/app/state/userStore';
import useDashboardStore, { EmployeeUpdateItem } from '@/app/state/dashboardStore';

export default function AdminCustomersPage() {
  const { fetchEmployee, lastFetched, isLoading, EmployeeUpdate } = useDashboardStore();
  const { user } = useAuthStore();
  const handleRefresh = () => {
    fetchEmployee(user?.userId, user?.permission);
  };

  useEffect(() => {
    const ONE_MINUTES = 60 * 1000;
    if (!lastFetched || Date.now() - lastFetched > ONE_MINUTES) {
      console.log('Actualizando dashboard...');
      fetchEmployee(user?.userId, user?.permission);
    }
  }, [lastFetched, fetchEmployee]);

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<EmployeeUpdateItem>();

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'cliente' as UserRole,
    active: true,
  });

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'Seller',
      active: true,
    });
    setIsDialogOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      role: user.role,
      active: user.is_active,
    });
    setIsDialogOpen(true);
  };

  // Guardar usuario (crear o actualizar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      // Actualizar
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...formData,
                phone: formData.phone || undefined,
                address: formData.address || undefined,
              }
            : u
        )
      );
    } else {
      // Crear nuevo
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        created_at: new Date().toISOString(),
      };
      setUsers((prev) => [newUser, ...prev]);
    }
    setIsDialogOpen(false);
  };

  // Eliminar usuario (físicamente, aunque en producción podrías desactivar)
  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  // Activar/desactivar usuario (toggle rápido)
  const toggleActive = (userId: string, currentActive: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: !currentActive } : u))
    );
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Personal</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Tabla de usuarios */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EmployeeUpdate.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '—'}</TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role]}>
                    {roleOptions.find((r) => r.value === user.role)?.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.is_active ? (
                    <Badge
                      variant="success"
                      className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700"
                    >
                      Activo
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700"
                    >
                      Inactivo
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingUser(user)}
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleActive(user.id, user.active)}
                      title={user.active ? 'Desactivar' : 'Activar'}
                    >
                      {user.active ? (
                        <ToggleRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setUserToDelete(user)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará
                            permanentemente el usuario{' '}
                            <strong>{userToDelete?.name}</strong>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setUserToDelete(null)}
                          >
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={confirmDelete}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay usuarios. Agrega uno nuevo.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de creación/edición */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </DialogTitle>
            <DialogDescription>
              Completa los datos del usuario/cliente.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    active: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="active">Usuario activo</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingUser ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de visualización de detalles */}
      <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{viewingUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{viewingUser.email}</p>
              </div>
              {viewingUser.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p>{viewingUser.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Rol</p>
                <Badge className={roleColors[viewingUser.role]}>
                  {roleOptions.find((r) => r.value === viewingUser.role)?.label}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                {viewingUser.is_active ? (
                  <Badge variant="success">Activo</Badge>
                ) : (
                  <Badge variant="destructive">Inactivo</Badge>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Fecha de registro
                </p>
                <p>{new Date(viewingUser.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingUser(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
