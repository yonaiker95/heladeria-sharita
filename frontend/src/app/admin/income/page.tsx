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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  MoreHorizontal,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// Datos mock (reemplazar con API real)
const revenueKPIs = [
  {
    title: 'Ingresos Totales (YTD)',
    value: '$8.24M',
    change: '+15.3%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    title: 'Facturación Mensual',
    value: '$1.42M',
    change: '+5.7%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    title: 'Cuentas por Cobrar',
    value: '$2.1M',
    change: '+8.2%',
    changeType: 'negative',
    icon: Landmark,
  },
  {
    title: 'Ingresos Recurrentes (MRR)',
    value: '$780K',
    change: '+12.4%',
    changeType: 'positive',
    icon: Calendar,
  },
];

const monthlyRevenue = [
  { month: 'Ene', facturado: 820000, cobrado: 790000, previsto: 850000 },
  { month: 'Feb', facturado: 890000, cobrado: 850000, previsto: 880000 },
  { month: 'Mar', facturado: 1010000, cobrado: 980000, previsto: 1020000 },
  { month: 'Abr', facturado: 980000, cobrado: 940000, previsto: 990000 },
  { month: 'May', facturado: 1120000, cobrado: 1080000, previsto: 1150000 },
  { month: 'Jun', facturado: 1240000, cobrado: 1150000, previsto: 1250000 },
];

const revenueByProduct = [
  { name: 'Producto A', value: 3200000 },
  { name: 'Producto B', value: 2100000 },
  { name: 'Servicio C', value: 1800000 },
  { name: 'Licencias', value: 940000 },
  { name: 'Consultoría', value: 600000 },
];

const COLORS = [
  'hsl(var(--primary))',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8884d8',
];

const invoices = [
  {
    id: 'INV-2026-001',
    cliente: 'Empresa Alpha',
    fecha: '2026-03-01',
    vencimiento: '2026-03-31',
    monto: 45000,
    estado: 'pagada',
    tipo: 'factura',
  },
  {
    id: 'INV-2026-002',
    cliente: 'Corporación Beta',
    fecha: '2026-03-02',
    vencimiento: '2026-04-01',
    monto: 78000,
    estado: 'pendiente',
    tipo: 'factura',
  },
  {
    id: 'RCT-2026-001',
    cliente: 'Startup Gamma',
    fecha: '2026-03-03',
    vencimiento: '2026-03-03',
    monto: 25000,
    estado: 'pagada',
    tipo: 'recibo',
  },
  {
    id: 'INV-2026-003',
    cliente: 'Grupo Delta',
    fecha: '2026-03-04',
    vencimiento: '2026-04-03',
    monto: 123000,
    estado: 'vencida',
    tipo: 'factura',
  },
  {
    id: 'INV-2026-004',
    cliente: 'Internacional Epsilon',
    fecha: '2026-03-05',
    vencimiento: '2026-04-04',
    monto: 92000,
    estado: 'pendiente',
    tipo: 'factura',
  },
  {
    id: 'RCT-2026-002',
    cliente: 'Empresa Zeta',
    fecha: '2026-03-06',
    vencimiento: '2026-03-06',
    monto: 15000,
    estado: 'pagada',
    tipo: 'recibo',
  },
  {
    id: 'INV-2026-005',
    cliente: 'Compañía Eta',
    fecha: '2026-03-07',
    vencimiento: '2026-04-06',
    monto: 65000,
    estado: 'pendiente',
    tipo: 'factura',
  },
];

const revenueByClient = [
  { cliente: 'Empresa Alpha', total: 320000 },
  { cliente: 'Corporación Beta', total: 280000 },
  { cliente: 'Grupo Delta', total: 210000 },
  { cliente: 'Internacional Epsilon', total: 185000 },
  { cliente: 'Startup Gamma', total: 95000 },
];

export default function CFOIngresosPage() {
  return (
    <div className="flex min-h-screen w-full bg-muted/40 m-0">
      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {revenueKPIs.map((kpi, i) => {
            const Icon = kpi.icon;
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
                  <div className="flex items-center gap-1 text-xs">
                    {kpi.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={
                        kpi.changeType === 'positive'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {kpi.change}
                    </span>
                    <span className="text-muted-foreground">
                      vs período anterior
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Gráficos principales */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Evolución de ingresos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Evolución de Ingresos</CardTitle>
              <CardDescription>
                Facturado vs cobrado vs previsto
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
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
                  <Line
                    type="monotone"
                    dataKey="facturado"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Facturado"
                  />
                  <Line
                    type="monotone"
                    dataKey="cobrado"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Cobrado"
                  />
                  <Line
                    type="monotone"
                    dataKey="previsto"
                    stroke="#ffc658"
                    strokeWidth={2}
                    name="Previsto"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ingresos por producto */}
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Producto</CardTitle>
              <CardDescription>Distribución anual</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByProduct}
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
                    {revenueByProduct.map((entry, index) => (
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

        {/* Segunda fila de gráficos */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Ingresos por cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clientes por Ingresos</CardTitle>
              <CardDescription>Clientes con mayor facturación</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByClient} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="cliente" type="category" width={120} />
                  <Tooltip
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return '$0';
                      return `$${value.toLocaleString()}`;
                    }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ingresos mensuales (área) */}
          <Card>
            <CardHeader>
              <CardTitle>Proyección de Ingresos</CardTitle>
              <CardDescription>Próximos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyRevenue
                    .slice(-3)
                    .concat(
                      monthlyRevenue
                        .slice(0, 3)
                        .map((d) => ({ ...d, month: `Proy ${d.month}` }))
                    )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return '$0';
                      return `$${value.toLocaleString()}`;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="previsto"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.3}
                    name="Previsto"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs con listados */}
        <Tabs defaultValue="facturas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="facturas">Facturas y recibos</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="facturas" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Facturas y Recibos</CardTitle>
                  <CardDescription>
                    Últimas transacciones registradas
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.id}</TableCell>
                        <TableCell>{inv.cliente}</TableCell>
                        <TableCell>{inv.fecha}</TableCell>
                        <TableCell>{inv.vencimiento}</TableCell>
                        <TableCell>${inv.monto.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              inv.estado === 'pagada'
                                ? 'default'
                                : inv.estado === 'vencida'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {inv.estado}
                          </Badge>
                          {inv.tipo === 'recibo' && (
                            <Badge variant="outline" className="ml-2">
                              Recibo
                            </Badge>
                          )}
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
                              <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Registrar pago
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

          <TabsContent value="clientes">
            <Card>
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>
                  Listado de clientes con facturación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Facturación total</TableHead>
                      <TableHead>Última factura</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueByClient.map((client) => (
                      <TableRow key={client.cliente}>
                        <TableCell className="font-medium">
                          {client.cliente}
                        </TableCell>
                        <TableCell>${client.total.toLocaleString()}</TableCell>
                        <TableCell>2026-03-05</TableCell>
                        <TableCell>
                          <Badge variant="default">Activo</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="productos">
            <Card>
              <CardHeader>
                <CardTitle>Productos y Servicios</CardTitle>
                <CardDescription>Ingresos por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Ingresos totales</TableHead>
                      <TableHead>% del total</TableHead>
                      <TableHead>Crecimiento anual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueByProduct.map((prod) => (
                      <TableRow key={prod.name}>
                        <TableCell className="font-medium">
                          {prod.name}
                        </TableCell>
                        <TableCell>${prod.value.toLocaleString()}</TableCell>
                        <TableCell>
                          {(
                            (prod.value /
                              revenueByProduct.reduce(
                                (acc, p) => acc + p.value,
                                0
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600">+12%</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
