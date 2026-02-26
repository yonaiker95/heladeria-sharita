'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
} from 'lucide-react';

// ---------- Tipos ----------
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  minimum_stock: number;
  total_sold?: number; // para más vendidos
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: 'Pendiente' | 'En preparacion' | 'Completado' | 'Cancelado';
  total: number;
  createdAt: string;
  items: { productId: string; quantity: number }[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendedor' | 'cajero';
  enabled: boolean;
  createdAt: string;
}

// ---------- Datos Mock (extendidos) ----------
const mockProducts: Product[] = [
  { id: '1', name: 'Helado de Chocolate', price: 3.5, stock: 45, minimum_stock: 10, total_sold: 234 },
  { id: '2', name: 'Helado de Vainilla', price: 3.0, stock: 32, minimum_stock: 10, total_sold: 198 },
  { id: '3', name: 'Cono Mixto', price: 4.0, stock: 8, minimum_stock: 15, total_sold: 145 },
  { id: '4', name: 'Batido de Fresa', price: 5.5, stock: 12, minimum_stock: 8, total_sold: 97 },
  { id: '5', name: 'Toppings de Chocolate', price: 1.2, stock: 120, minimum_stock: 30, total_sold: 312 },
];

const mockOrders: Order[] = [
  { id: '1', orderNumber: '0001', customerName: 'Juan Pérez', status: 'Completado', total: 10.0, createdAt: '2026-02-20T10:30:00Z', items: [] },
  { id: '2', orderNumber: '0002', customerName: 'María Gómez', status: 'En preparacion', total: 12.0, createdAt: '2026-02-21T11:45:00Z', items: [] },
  { id: '3', orderNumber: '0003', customerName: 'Carlos Ruiz', status: 'Pendiente', total: 9.0, createdAt: '2026-02-22T09:20:00Z', items: [] },
  { id: '4', orderNumber: '0004', customerName: 'Ana López', status: 'Completado', total: 15.5, createdAt: '2026-02-22T14:10:00Z', items: [] },
  { id: '5', orderNumber: '0005', customerName: 'Pedro Sánchez', status: 'Cancelado', total: 7.5, createdAt: '2026-02-23T16:30:00Z', items: [] },
  { id: '6', orderNumber: '0006', customerName: 'Lucía Fernández', status: 'Completado', total: 21.0, createdAt: '2026-02-23T18:20:00Z', items: [] },
  { id: '7', orderNumber: '0007', customerName: 'Jorge Martínez', status: 'Completado', total: 8.0, createdAt: '2026-02-24T12:00:00Z', items: [] },
  { id: '8', orderNumber: '0008', customerName: 'Laura Díaz', status: 'En preparacion', total: 13.5, createdAt: '2026-02-24T15:45:00Z', items: [] },
  { id: '9', orderNumber: '0009', customerName: 'Roberto Castro', status: 'Pendiente', total: 6.0, createdAt: '2026-02-25T10:10:00Z', items: [] },
  { id: '10', orderNumber: '0010', customerName: 'Sofía Romero', status: 'Completado', total: 18.0, createdAt: '2026-02-25T13:30:00Z', items: [] },
];

const mockUsers: User[] = [
  { id: '1', name: 'Admin Principal', email: 'admin@heladeria.com', role: 'admin', enabled: true, createdAt: '2026-01-01T00:00:00Z' },
  { id: '2', name: 'Vendedor 1', email: 'vendedor1@heladeria.com', role: 'vendedor', enabled: true, createdAt: '2026-01-15T00:00:00Z' },
  { id: '3', name: 'Vendedor 2', email: 'vendedor2@heladeria.com', role: 'vendedor', enabled: false, createdAt: '2026-01-20T00:00:00Z' },
  { id: '4', name: 'Cajero 1', email: 'cajero1@heladeria.com', role: 'cajero', enabled: true, createdAt: '2026-02-01T00:00:00Z' },
];

// Función para generar datos de ventas por día (últimos 7 días)
const generateSalesData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('es-ES', { weekday: 'short' });
    // Simular ventas aleatorias pero con tendencia
    const sales = Math.floor(Math.random() * 500) + 200 + i * 20;
    data.push({
      day,
      date: date.toISOString().split('T')[0],
      ventas: sales,
      pedidos: Math.floor(Math.random() * 15) + 5,
    });
  }
  return data;
};

const salesData = generateSalesData();

// Datos para productos más vendidos (top 5)
const topProductsData = mockProducts
  .sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0))
  .slice(0, 5)
  .map(p => ({ name: p.name, ventas: p.total_sold || 0 }));

// Datos para distribución de estados de pedidos
const orderStatusData = [
  { name: 'Completados', value: mockOrders.filter(o => o.status === 'Completado').length, color: '#10b981' },
  { name: 'Pendientes', value: mockOrders.filter(o => o.status === 'Pendiente').length, color: '#f59e0b' },
  { name: 'En preparación', value: mockOrders.filter(o => o.status === 'En preparacion').length, color: '#3b82f6' },
  { name: 'Cancelados', value: mockOrders.filter(o => o.status === 'Cancelado').length, color: '#ef4444' },
];

// Productos con stock bajo
const lowStockProducts = mockProducts.filter(p => p.stock < p.minimum_stock);

// Cálculos de KPIs
const totalUsers = mockUsers.length;
const activeUsers = mockUsers.filter(u => u.enabled).length;
const totalOrders = mockOrders.length;
const completedOrders = mockOrders.filter(o => o.status === 'Completado').length;
const totalRevenue = mockOrders
  .filter(o => o.status === 'Completado')
  .reduce((sum, o) => sum + o.total, 0);
const monthlyRevenue = mockOrders
  .filter(o => o.status === 'Completado' && new Date(o.createdAt).getMonth() === new Date().getMonth())
  .reduce((sum, o) => sum + o.total, 0);
const pendingOrders = mockOrders.filter(o => o.status === 'Pendiente' || o.status === 'En preparacion').length;

// Colores para gráficos
const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('week');

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reportes y Análisis</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rango de fechas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% respecto al mes anterior
            </p>
            <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '75%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos del Mes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              {pendingOrders} pendientes / en preparación
            </p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              de {totalUsers} usuarios totales
            </p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2 nuevos este mes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              productos por debajo del mínimo
            </p>
            <div className="mt-2 flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>Requieren atención</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico de ventas diarias */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Ventas Diarias</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Area type="monotone" dataKey="ventas" stroke="#3b82f6" fill="#93c5fd" name="Ventas" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de distribución de pedidos por estado */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Estado de Pedidos</CardTitle>
            <CardDescription>Distribución actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Productos más vendidos (barras) */}
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Top 5 productos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventas" fill="#10b981" name="Cantidad vendida" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pedidos recientes (tabla pequeña) */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>Últimos 5 pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N°</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.status === 'Completado'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pendiente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'En preparacion'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Sección de alertas y productos con stock bajo */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Stock Bajo</CardTitle>
            <CardDescription>Productos que necesitan reabastecimiento</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.stock} / Mínimo: {product.minimum_stock}
                      </p>
                    </div>
                    <Badge variant="destructive">Crítico</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay productos con stock bajo</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios Recientes</CardTitle>
            <CardDescription>Últimos usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.slice(0, 3).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.enabled ? 'success' : 'secondary'}>
                        {user.enabled ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de rendimiento en tarjetas adicionales */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                completedOrders > 0 ? totalRevenue / completedOrders : 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">por pedido completado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProducts.reduce((acc, p) => acc + (p.total_sold || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">total histórico</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">pedidos completados vs total</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}