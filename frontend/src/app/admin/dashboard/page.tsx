'use client';
import { useEffect} from 'react';
import { SalesData } from '@/app/components/admin/dashboard/sellerUpdate';
import { RecentOrders } from '@/app/components/admin/dashboard/recentOrders';
import { CardDashboard } from '@/app/components/admin/dashboard/cardDashboard';
import Link from 'next/link';
import { BestSellingProducts } from '@/app/components/admin/dashboard/bestSsellingProducts';
import { MinimumQuantity } from '@/app/components/admin/dashboard/minimumQuantity';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  RefreshCw,
  BarChart3,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useDashboardStore from '@/app/state/dashboardStore';

export default function AdminDashboard() {
  const {fetchDashboard, lastFetched, isLoading} = useDashboardStore();
  
  const handleRefresh = () => {
    fetchDashboard(); // Forzar actualización
  };

  useEffect(() => {
    const ONE_MINUTES = 60 * 1000;
    if (!lastFetched || Date.now() - lastFetched > ONE_MINUTES) {
      console.log('Actualizando dashboard...');
      fetchDashboard();
    }
  }, [lastFetched, fetchDashboard]);
  


  return (
    <div className="p-4 md:p-6 bg-muted/50 min-h-screen w-full overflow-x-hidden box-border">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Dashboard
              </h1>
              <div className="flex flex-col gap-3 w-full">
                <p className="text-sm text-muted-foreground">
                  Bienvenido de vuelta, aquí tienes un resumen de tu heladería
                </p>
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
        <CardDashboard />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-4 md:grid-cols-2 mb-6 md:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Ventas de la Semana</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <SalesData  />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pedidos Recientes</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <RecentOrders />
            <div className="mt-4 text-center">
              <Link
                href="/admin/orders"
                className="inline-block w-full px-3 py-2 text-sm font-medium text-primary border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Ver todos los pedidos
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Products and Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Productos Más Vendidos
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BestSellingProducts  />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Alertas del Sistema
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MinimumQuantity  />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

