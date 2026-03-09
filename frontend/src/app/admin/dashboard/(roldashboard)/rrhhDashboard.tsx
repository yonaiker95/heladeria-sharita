'use client';

import { useEffect, useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

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
  ResponsiveContainer,
  PieSectorShapeProps,
  Sector,
} from 'recharts';
import {
  MoreHorizontal,
  PlusCircle,
  CalendarIcon,
  RefreshCw,
} from 'lucide-react';
import { useAuthStore } from '@/app/state/userStore';
import useDashboardStore from '@/app/state/dashboardStore';
import { KPI } from '@/app/components/admin/dashboard/kpi';

interface CustomTooltipProps {
  active?: boolean;
  payload?: readonly {
    name?: string;
    value?: string | number;
    color?: string;
    dataKey?: string;
    nameKey?: string;
  }[];
  label?: string | number;
}

const openPositions = [
  {
    id: 'POS-001',
    title: 'Desarrollador Backend Senior',
    department: 'Ingeniería',
    candidates: 8,
    status: 'activa',
    priority: 'alta',
  },
  {
    id: 'POS-002',
    title: 'Ejecutivo de Cuentas',
    department: 'Ventas',
    candidates: 12,
    status: 'activa',
    priority: 'media',
  },
  {
    id: 'POS-003',
    title: 'Analista de Marketing Digital',
    department: 'Marketing',
    candidates: 5,
    status: 'activa',
    priority: 'media',
  },
  {
    id: 'POS-004',
    title: 'Especialista en Compensaciones',
    department: 'RRHH',
    candidates: 3,
    status: 'activa',
    priority: 'baja',
  },
];

const upcomingLeave = [
  {
    id: 1,
    employee: 'María González',
    type: 'Vacaciones',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    days: 7,
    status: 'aprobado',
  },
  {
    id: 2,
    employee: 'Pedro Sánchez',
    type: 'Licencia médica',
    startDate: '2026-03-10',
    endDate: '2026-03-12',
    days: 3,
    status: 'aprobado',
  },
  {
    id: 3,
    employee: 'Lucía Fernández',
    type: 'Vacaciones',
    startDate: '2026-03-20',
    endDate: '2026-03-27',
    days: 7,
    status: 'pendiente',
  },
];

const colorMap = {
  // Departamentos
  Ventas: '#8884d8',
  Marketing: '#82ca9d',
  TI: '#ffc658',
  'Recursos Humanos': '#ff8042',
  Finanzas: '#ff6b6b',
  Operaciones: '#a4de6c',
  Gerencia: '#d0ed57',
  Administrativo: '#8884d8',
  Vendedores: '#82ca9d',
  Almacen: '#ffc658',
  Mantenimiento: '#ff8042',

  // Géneros
  Masculino: '#82ca9d',
  Femenino: '#ffc658',
  Otro: '#8884d8',
} as const;

type Departamento = keyof typeof colorMap;

const colors = ['#82ca9d', '#ffc658'];

export default function HRDashboard() {
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const { fetchDashboard, lastFetched, isLoading, hhrrData } =
    useDashboardStore();
  const { user } = useAuthStore();

  const handleRefresh = () => {
    fetchDashboard(user?.userId, user?.permission);
  };

  useEffect(() => {
    const ONE_MINUTES = 60 * 1000;
    if (!lastFetched || Date.now() - lastFetched > ONE_MINUTES) {
      console.log('Actualizando dashboard...');
      fetchDashboard(user?.userId, user?.permission);
    }
  }, [lastFetched, fetchDashboard]);

  const MyCustomPie = (props: PieSectorShapeProps) => (
    <Sector {...props} fill={colors[props.index % colors.length]} />
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 space-y-4 p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Dashboard
                  </h1>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-row items-center gap-4 flex-wrap">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date().toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <Button
                        onClick={handleRefresh}
                        // disabled={isRefreshing}
                        size="sm"
                      >
                        <RefreshCw
                          className={`mr-2 h-4 w-4 ${
                            isLoading ? 'animate-spin' : ''
                          }`}
                        />
                        {isLoading ? 'Actualizando...' : 'Actualizar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <KPI />

          {/* Tabs para organización */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visión General</TabsTrigger>
              <TabsTrigger value="employees">Empleados</TabsTrigger>
              <TabsTrigger value="recruitment">Reclutamiento-(Proximamente)</TabsTrigger>
              <TabsTrigger value="attendance">Asistencia-(Proximamente)</TabsTrigger>
            </TabsList>

            {/* Pestaña Visión General */}
            <TabsContent value="overview" className="space-y-4">
              {/* Gráficos principales */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Distribución por departamento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Empleados por Departamento</CardTitle>
                    <CardDescription>Distribución actual</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={
                          hhrrData?.visionGeneral.empleadosPorDepartamento ?? []
                        }
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis
                          dataKey="departamento"
                          type="category"
                          width={120}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={CustomTooltip} />
                        <Bar dataKey="cantidad">
                          {(
                            hhrrData?.visionGeneral.empleadosPorDepartamento ??
                            []
                          ).map((entry, index) => {
                            const color =
                              colorMap[entry.departamento as Departamento] ??
                              '#8884d8';
                            return <Cell key={`cell-${index}`} fill={color} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Composición por género */}
                <Card>
                  <CardHeader>
                    <CardTitle>Composición por Género</CardTitle>
                    <CardDescription>Diversidad en la empresa</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hhrrData?.visionGeneral.composicionGenero}
                          // data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name = 'genero', percent }) =>
                            percent !== undefined
                              ? `${name} ${(percent * 100).toFixed(0)}%`
                              : `${name}`
                          }
                          outerRadius={80}
                          nameKey="genero"
                          dataKey="cantidad"
                          shape={MyCustomPie}
                        ></Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Distribución por edad */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Edad</CardTitle>
                  <CardDescription>Rangos etarios</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hhrrData?.visionGeneral.distribucionEdad}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rango" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="cantidad" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Evolución de métricas */}
              <div className="grid gap-4 md:grid-cols-3">
                <Contrataciones6MChart
                  data={hhrrData?.visionGeneral.contrataciones6m ?? []}
                />
                <Rotacion6MChart
                  data={hhrrData?.visionGeneral.rotacion6m ?? []}
                />
                <Ausentismo6MChart
                  data={hhrrData?.visionGeneral.ausentismo6m ?? []}
                />
              </div>
            </TabsContent>

            {/* Pestaña Empleados */}
            <TabsContent value="employees" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Empleados Recientes</CardTitle>
                    <CardDescription>Últimas incorporaciones</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={departmentFilter}
                      onValueChange={setDepartmentFilter}
                    >
                      <SelectTrigger className="w-37.5">
                        <SelectValue placeholder="Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="ingenieria">Ingeniería</SelectItem>
                        <SelectItem value="ventas">Ventas</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finanzas">Finanzas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Nuevo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Puesto</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Departamento
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Email
                        </TableHead>
                        <TableHead>Fecha Ingreso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hhrrData?.empleados.recientes.map((emp) => (
                        <TableRow key={emp.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {emp.empleado.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {emp.empleado}
                            </div>
                          </TableCell>
                          <TableCell>{emp.puesto}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {emp.departamento}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {emp.email}
                          </TableCell>
                          <TableCell>{emp.fecha_ingreso}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                emp.estado === 'activo'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {emp.estado === 'activo'
                                ? 'Activo'
                                : 'Período prueba'}
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
                                <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Desactivar
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

            {/* Pestaña Reclutamiento */}
            <TabsContent value="recruitment" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Posiciones Abiertas</CardTitle>
                    <CardDescription>Vacantes activas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Puesto</TableHead>
                          <TableHead>Depto.</TableHead>
                          <TableHead>Candidatos</TableHead>
                          <TableHead>Prioridad</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {openPositions.map((pos) => (
                          <TableRow key={pos.id}>
                            <TableCell className="font-medium">
                              {pos.title}
                            </TableCell>
                            <TableCell>{pos.department}</TableCell>
                            <TableCell>{pos.candidates}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  pos.priority === 'alta'
                                    ? 'destructive'
                                    : pos.priority === 'media'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {pos.priority}
                              </Badge>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline de Reclutamiento</CardTitle>
                    <CardDescription>Proceso actual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Seleccionados</span>
                        <span className="font-medium">24</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Entrevistados</span>
                        <span className="font-medium">15</span>
                      </div>
                      <Progress value={37.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Ofertas enviadas</span>
                        <span className="font-medium">8</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Contrataciones</span>
                        <span className="font-medium">5</span>
                      </div>
                      <Progress value={12.5} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pestaña Asistencia */}
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Ausencias</CardTitle>
                  <CardDescription>
                    Vacaciones y licencias programadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Inicio</TableHead>
                        <TableHead>Fin</TableHead>
                        <TableHead>Días</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingLeave.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.employee}
                          </TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.startDate}</TableCell>
                          <TableCell>{item.endDate}</TableCell>
                          <TableCell>{item.days}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === 'aprobado'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {item.status}
                            </Badge>
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

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Asistencia (Hoy)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 text-center md:grid-cols-3">
                    <div>
                      <div className="text-2xl font-bold">212</div>
                      <p className="text-xs text-muted-foreground">Presentes</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground">Ausentes</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Vacaciones
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold mb-2 text-sm">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-medium text-white">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface Data6Mes {
  mes: string;
  contrataciones?: number;
  ausentismo?: number;
  rotacion?: number;
}

export const Contrataciones6MChart = ({
  data,
}: {
  data: Data6Mes[];
}) => {
  const formattedData = data.map((item) => {
    const [year, month] = item.mes.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const mesFormateado = date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    });
    return {
      ...item,
      mesFormateado:
        mesFormateado.charAt(0).toUpperCase() + mesFormateado.slice(1),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contrataciones Últimos 6 Meses</CardTitle>
        <CardDescription>Evolución de nuevas incorporaciones</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesFormateado" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="contrataciones"
              stroke="#ff8042"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Contrataciones"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const Ausentismo6MChart = ({
  data,
}: {
  data: Data6Mes[];
}) => {
  const formattedData = data.map((item) => {
    const [year, month] = item.mes.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const mesFormateado = date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    });
    return {
      ...item,
      mesFormateado:
        mesFormateado.charAt(0).toUpperCase() + mesFormateado.slice(1),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ausentismo (%)</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesFormateado" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="ausentismo"
              stroke="#ff8042"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="ausentismo"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const Rotacion6MChart = ({
  data,
}: {
  data: Data6Mes[];
}) => {
  const formattedData = data.map((item) => {
    const [year, month] = item.mes.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const mesFormateado = date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    });
    return {
      ...item,
      mesFormateado:
        mesFormateado.charAt(0).toUpperCase() + mesFormateado.slice(1),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rotación (%)</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesFormateado" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rotacion"
              stroke="#ff8042"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="rotacion"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};