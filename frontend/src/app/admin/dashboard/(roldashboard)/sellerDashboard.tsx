'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  MoreHorizontal,
  Search,
  PlusCircle,
} from 'lucide-react';

// Datos de ejemplo
const salesData = [
  { name: 'Ene', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Abr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
];

const recentOrders = [
  {
    id: '1234',
    customer: 'Juan Pérez',
    email: 'juan@example.com',
    date: '2026-03-01',
    total: 125.99,
    status: 'completado',
  },
  {
    id: '1235',
    customer: 'María García',
    email: 'maria@example.com',
    date: '2026-03-02',
    total: 89.5,
    status: 'procesando',
  },
  {
    id: '1236',
    customer: 'Carlos López',
    email: 'carlos@example.com',
    date: '2026-03-02',
    total: 210.0,
    status: 'pendiente',
  },
  {
    id: '1237',
    customer: 'Ana Martínez',
    email: 'ana@example.com',
    date: '2026-03-03',
    total: 45.75,
    status: 'completado',
  },
];

const stats = [
  {
    title: 'Pedidos',
    value: '345',
    icon: ShoppingCart,
    description: '+12% desde el mes pasado',
  },
  {
    title: 'Clientes',
    value: '189',
    icon: Users,
    description: '+8 nuevos esta semana',
  },
  {
    title: 'Productos',
    value: '45',
    icon: Package,
    description: '3 sin stock',
  },
];

export default function SellerDashboard() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gráfico de ventas */}
        {/* <Card>
            <CardHeader>
              <CardTitle>Ventas mensuales</CardTitle>
              <CardDescription>Enero - Junio 2026</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}

        {/* Tabla de pedidos recientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos recientes</CardTitle>
              <CardDescription>Últimos 5 pedidos realizados</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.email}
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'completado'
                            ? 'default'
                            : order.status === 'procesando'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Actualizar estado</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Cancelar pedido
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
