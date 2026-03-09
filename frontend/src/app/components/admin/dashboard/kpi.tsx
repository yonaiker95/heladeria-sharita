'use client';

import useDashboardStore from '@/app/state/dashboardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  Clock,
  HeartPulse,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react';

export const KPI = () => {
  const { hhrrData } = useDashboardStore();
  console.log(hhrrData?.totalEmpleados);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hhrrData?.totalEmpleados}</div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nuevos Ingresos</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hhrrData?.nuevosIngresos}</div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rotación</CardTitle>
          <UserMinus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hhrrData?.rotacionGeneral}</div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ausentismo</CardTitle>
          <HeartPulse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {hhrrData?.ausentismoGeneral}
          </div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tiempo Medio Contratación
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {hhrrData?.tiempoMedioContratacion}
          </div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Posiciones Abiertas
          </CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {hhrrData?.posicionesAbiertas}
          </div>
          {/* <p className={`text-xs ${hhrrData?.}`}>
                {kpi.change} {kpi.description}
              </p> */}
        </CardContent>
      </Card>
    </div>
  );
};
