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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Menu,
  TrendingUp,
  DollarSign,
  CreditCard,
  Landmark,
  MoreHorizontal,
  Search,
  Download,
  FileText,
  PieChart as PieChartIcon,
} from 'lucide-react';

// Datos de ejemplo (reemplazar con datos reales de API)
const kpiData = [
  {
    title: 'Ingresos totales',
    value: '$2.4M',
    icon: DollarSign,
    change: '+12.3%',
    changeType: 'positive',
  },
  {
    title: 'EBITDA',
    value: '$890K',
    icon: TrendingUp,
    change: '+8.1%',
    changeType: 'positive',
  },
  {
    title: 'Margen neto',
    value: '18.5%',
    icon: PieChartIcon,
    change: '-2.1%',
    changeType: 'negative',
  },
  {
    title: 'Flujo de caja libre',
    value: '$320K',
    icon: Landmark,
    change: '+5.4%',
    changeType: 'positive',
  },
];

const revenueExpenseData = [
  { month: 'Ene', ingresos: 420000, gastos: 310000 },
  { month: 'Feb', ingresos: 450000, gastos: 330000 },
  { month: 'Mar', ingresos: 580000, gastos: 390000 },
  { month: 'Abr', ingresos: 520000, gastos: 380000 },
  { month: 'May', ingresos: 610000, gastos: 410000 },
  { month: 'Jun', ingresos: 590000, gastos: 430000 },
];

const expenseDistribution = [
  { name: 'Nómina', value: 185000 },
  { name: 'Marketing', value: 95000 },
  { name: 'I+D', value: 72000 },
  { name: 'Operaciones', value: 68000 },
  { name: 'Administración', value: 43000 },
];

const COLORS = [
  'hsl(var(--primary))',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8884d8',
];

const receivables = [
  {
    id: 'INV-001',
    cliente: 'Empresa A',
    fecha: '2026-02-15',
    vencimiento: '2026-03-15',
    monto: 45000,
    estado: 'pendiente',
  },
  {
    id: 'INV-002',
    cliente: 'Corporación B',
    fecha: '2026-02-20',
    vencimiento: '2026-03-20',
    monto: 87000,
    estado: 'pagado',
  },
  {
    id: 'INV-003',
    cliente: 'Startup C',
    fecha: '2026-02-25',
    vencimiento: '2026-03-25',
    monto: 23000,
    estado: 'atrasado',
  },
  {
    id: 'INV-004',
    cliente: 'Grupo D',
    fecha: '2026-03-01',
    vencimiento: '2026-03-31',
    monto: 124000,
    estado: 'pendiente',
  },
  {
    id: 'INV-005',
    cliente: 'Internacional E',
    fecha: '2026-03-05',
    vencimiento: '2026-04-05',
    monto: 65000,
    estado: 'pendiente',
  },
];

const cashFlowProjection = [
  { mes: 'Jul', proyectado: 350000 },
  { mes: 'Ago', proyectado: 380000 },
  { mes: 'Sep', proyectado: 410000 },
  { mes: 'Oct', proyectado: 390000 },
  { mes: 'Nov', proyectado: 430000 },
  { mes: 'Dic', proyectado: 520000 },
];

export default function CFODashboard() {
  return (
        <div className="flex-1 space-y-2 p-4 md:p-6">
          {/* Tarjetas KPI */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, i) => {
              const Icon = kpi.icon;
              const changeColor =
                kpi.changeType === 'positive'
                  ? 'text-green-600'
                  : 'text-red-600';
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
                      {kpi.change} vs mes anterior
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Gráficos principales */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Ingresos vs Gastos */}
            <Card>
              <CardHeader>
                <CardTitle>Ingresos vs Gastos</CardTitle>
                <CardDescription>Evolución mensual</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number | undefined) => {
                      if (value === undefined) return '$0';
                      return `$${value.toLocaleString()}`;
                    }}
                    />
                    <Legend />
                    <Bar
                      dataKey="ingresos"
                      fill="hsl(var(--primary))"
                      name="Ingresos"
                    />
                    <Bar dataKey="gastos" fill="#ff8042" name="Gastos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribución de gastos */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>Por categoría</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        percent !== undefined ? `${name} ${(percent * 100).toFixed(0)}%` : name
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number | undefined) => {
                      if (value === undefined) return '$0';
                      return `$${value.toLocaleString()}`;
                    }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de cuentas por cobrar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Cuentas por Cobrar</CardTitle>
                <CardDescription>
                  Facturas pendientes y próximas a vencer
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
                    <TableHead>Factura</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Fecha
                    </TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivables.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.cliente}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {inv.fecha}
                      </TableCell>
                      <TableCell>{inv.vencimiento}</TableCell>
                      <TableCell>${inv.monto.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inv.estado === 'pagado'
                              ? 'default'
                              : inv.estado === 'atrasado'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {inv.estado}
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
                            <DropdownMenuItem>Registrar pago</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Anular factura
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

          {/* Flujo de caja proyectado */}
          <Card>
            <CardHeader>
              <CardTitle>Flujo de Caja Proyectado</CardTitle>
              <CardDescription>Próximos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return '$0';
                      return `$${value.toLocaleString()}`;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="proyectado"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
  );
}
