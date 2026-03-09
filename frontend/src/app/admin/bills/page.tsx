'use client';

import { useState } from 'react';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Menu,
  DollarSign,
  CreditCard,
  TrendingDown,
  Building,
  MoreHorizontal,
  Search,
  Download,
  Filter,
  PlusCircle,
  CalendarIcon,
  ArrowUpDown,
} from 'lucide-react';

// Datos mock - Gastos
const kpiData = [
  {
    title: 'Gastos Totales (Mes)',
    value: '$458.2K',
    icon: DollarSign,
    change: '+8.2%',
    changeType: 'negative',
    description: 'vs mes anterior',
  },
  {
    title: 'Gastos Acumulados Año',
    value: '$2.84M',
    icon: TrendingDown,
    change: '+5.1%',
    changeType: 'negative',
    description: 'vs presupuesto',
  },
  {
    title: 'Categoría Principal',
    value: 'Nómina',
    icon: Building,
    change: '$185K',
    changeType: 'neutral',
    description: '42% del total',
  },
  {
    title: 'Top Proveedor',
    value: 'Servicios TI S.A.',
    icon: CreditCard,
    change: '$67.3K',
    changeType: 'neutral',
    description: 'este mes',
  },
];

const monthlyExpenses = [
  { month: 'Ene', gastos: 385000, presupuesto: 400000 },
  { month: 'Feb', gastos: 392000, presupuesto: 400000 },
  { month: 'Mar', gastos: 421000, presupuesto: 410000 },
  { month: 'Abr', gastos: 438000, presupuesto: 420000 },
  { month: 'May', gastos: 452000, presupuesto: 430000 },
  { month: 'Jun', gastos: 458200, presupuesto: 440000 },
];

const categoryData = [
  { name: 'Nómina', value: 185000 },
  { name: 'Marketing', value: 62000 },
  { name: 'Tecnología', value: 54000 },
  { name: 'Operaciones', value: 73000 },
  { name: 'Administración', value: 42000 },
  { name: 'Otros', value: 42200 },
];

const COLORS = [
  'hsl(var(--primary))',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8884d8',
  '#00C49F',
];

const departmentExpenses = [
  { department: 'Ingeniería', gastos: 124000 },
  { department: 'Ventas', gastos: 98000 },
  { department: 'Marketing', gastos: 87000 },
  { department: 'RRHH', gastos: 45000 },
  { department: 'Finanzas', gastos: 52000 },
  { department: 'Operaciones', gastos: 112000 },
];

const recentTransactions = [
  {
    id: 'TRX-001',
    fecha: '2026-03-08',
    concepto: 'Servicios cloud AWS',
    categoria: 'Tecnología',
    proveedor: 'Amazon Web Services',
    monto: 12450.0,
    estado: 'aprobado',
    metodo: 'Transferencia',
  },
  {
    id: 'TRX-002',
    fecha: '2026-03-07',
    concepto: 'Campaña Google Ads',
    categoria: 'Marketing',
    proveedor: 'Google',
    monto: 8750.0,
    estado: 'aprobado',
    metodo: 'Tarjeta crédito',
  },
  {
    id: 'TRX-003',
    fecha: '2026-03-06',
    concepto: 'Mantenimiento oficinas',
    categoria: 'Operaciones',
    proveedor: 'Servicios Generales Ltda.',
    monto: 3200.0,
    estado: 'pendiente',
    metodo: 'Transferencia',
  },
  {
    id: 'TRX-004',
    fecha: '2026-03-05',
    concepto: 'Licencias software',
    categoria: 'Tecnología',
    proveedor: 'Microsoft',
    monto: 5600.0,
    estado: 'aprobado',
    metodo: 'Tarjeta crédito',
  },
  {
    id: 'TRX-005',
    fecha: '2026-03-04',
    concepto: 'Material de oficina',
    categoria: 'Administración',
    proveedor: 'Office Depot',
    monto: 890.5,
    estado: 'rechazado',
    metodo: 'Efectivo',
  },
  {
    id: 'TRX-006',
    fecha: '2026-03-03',
    concepto: 'Nómina quincenal',
    categoria: 'Nómina',
    proveedor: '—',
    monto: 92500.0,
    estado: 'aprobado',
    metodo: 'Transferencia',
  },
];

const pendingApprovals = [
  {
    id: 'APR-001',
    solicitante: 'María González',
    departamento: 'Marketing',
    concepto: 'Campaña influencers',
    monto: 12500,
    fecha: '2026-03-08',
  },
  {
    id: 'APR-002',
    solicitante: 'Carlos Ruiz',
    departamento: 'Ingeniería',
    concepto: 'Nuevos servidores',
    monto: 28750,
    fecha: '2026-03-07',
  },
  {
    id: 'APR-003',
    solicitante: 'Ana Torres',
    departamento: 'Operaciones',
    concepto: 'Curso capacitación',
    monto: 3800,
    fecha: '2026-03-07',
  },
];

export default function CFOExpensesPanel() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
        {/* Main */}
        <main className="flex-1 space-y-4 p-4 md:p-6">
          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, i) => {
              const Icon = kpi.icon;
              const changeColor =
                kpi.changeType === 'positive'
                  ? 'text-green-600'
                  : kpi.changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-muted-foreground';
              return (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {kpi.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className={`text-xs ${changeColor}`}>
                      {kpi.change} {kpi.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs para diferentes vistas */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="details">Detalle</TabsTrigger>
              <TabsTrigger value="approvals">Pendientes</TabsTrigger>
            </TabsList>

            {/* Pestaña Resumen */}
            <TabsContent value="overview" className="space-y-4">
              {/* Gráficos superiores */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Evolución mensual */}
                <Card>
                  <CardHeader>
                    <CardTitle>Evolución Mensual</CardTitle>
                    <CardDescription>Gastos vs Presupuesto</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyExpenses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="gastos"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Gastos"
                        />
                        <Line
                          type="monotone"
                          dataKey="presupuesto"
                          stroke="#ff8042"
                          strokeWidth={2}
                          name="Presupuesto"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Distribución por categoría */}
                <Card>
                  <CardHeader>
                    <CardTitle>Gastos por Categoría</CardTitle>
                    <CardDescription>Distribución del mes</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => `$${value.toLocaleString()}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Gastos por departamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Departamento</CardTitle>
                  <CardDescription>Acumulado mensual</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentExpenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Bar
                        dataKey="gastos"
                        fill="hsl(var(--primary))"
                        name="Gastos"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pestaña Detalle */}
            <TabsContent value="details" className="space-y-4">
              {/* Filtros */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="nomina">Nómina</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="operaciones">Operaciones</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="aprobado">Aprobado</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="rechazado">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Aplicar filtros
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Nuevo gasto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabla de transacciones */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Transacciones recientes</CardTitle>
                    <CardDescription>
                      Últimos gastos registrados
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todas
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-25">ID</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Categoría
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Proveedor
                        </TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell>{tx.fecha}</TableCell>
                          <TableCell>{tx.concepto}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tx.categoria}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {tx.proveedor}
                          </TableCell>
                          <TableCell className="text-right">
                            ${tx.monto.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                tx.estado === 'aprobado'
                                  ? 'default'
                                  : tx.estado === 'pendiente'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {tx.estado}
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
                                <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Anular
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
            </TabsContent>

            {/* Pestaña Aprobaciones Pendientes */}
            <TabsContent value="approvals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aprobaciones Pendientes</CardTitle>
                  <CardDescription>
                    Gastos que requieren autorización
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Solicitud</TableHead>
                        <TableHead>Solicitante</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingApprovals.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">
                            {req.id}
                          </TableCell>
                          <TableCell>{req.solicitante}</TableCell>
                          <TableCell>{req.departamento}</TableCell>
                          <TableCell>{req.concepto}</TableCell>
                          <TableCell>{req.fecha}</TableCell>
                          <TableCell className="text-right">
                            ${req.monto.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="default">
                                Aprobar
                              </Button>
                              <Button size="sm" variant="outline">
                                Rechazar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
}
