'use client';
import React, { useState } from 'react';
import { SalesData } from '../../components/admin/dashboard/SellerUpdate';
import { RecentOrders } from '@/app/components/admin/dashboard/RecentOrders';
import Link from 'next/link';
import { BestSellingProducts } from '@/app/components/admin/dashboard/bestSsellingProducts';
import { MinimumQuantity } from '@/app/components/admin/dashboard/minimumQuantity';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  RefreshCw,
  ShoppingCart,
  Box,
  Users,
  HandCoins,
  BarChart3,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [stats, setStats] = useState([
    {
      title: 'Ventas Hoy',
      value: '$1,250.50',
      change: '+12.5%',
      color: '#10b981',
      icon: <HandCoins />,
    },
    {
      title: 'Pedidos Pendientes',
      value: '8',
      change: '+2 nuevos',
      color: '#3b82f6',
      icon: <ShoppingCart />,
    },
    {
      title: 'Productos en Stock',
      value: '156',
      change: '-3 bajos',
      color: '#8b5cf6',
      icon: <Box />,
    },
    {
      title: 'Clientes Nuevos',
      value: '24',
      change: '+8.7%',
      color: '#ec4899',
      icon: <Users />,
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // --- LÓGICA DE ACTUALIZACIÓN ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
    // Simulamos una carga de datos de 1.5 segundos
    setTimeout(() => {
      // Aquí podrías hacer un fetch a tu API
      console.log('Datos actualizados');
      setIsRefreshing(false);
    }, 1500);
  };

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
                    disabled={isRefreshing}
                    size="sm"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${
                        isRefreshing ? 'animate-spin' : ''
                      }`}
                    />
                    {isRefreshing ? 'Actualizando...' : 'Actualizar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xl shrink-0"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center gap-4">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <Badge
                variant={stat.change.includes('+') ? 'success' : 'destructive'}
                className="mt-1"
              >
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-4 md:grid-cols-2 mb-6 md:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Ventas de la Semana</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <SalesData refreshTrigger={refreshTrigger} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pedidos Recientes</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <RecentOrders refreshTrigger={refreshTrigger} />
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
            <BestSellingProducts refreshTrigger={refreshTrigger} />
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
            <MinimumQuantity refreshTrigger={refreshTrigger} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
