import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Box, HandCoins, ShoppingCart, Users } from 'lucide-react';
import useDashboardStore from '@/app/state/dashboardStore';

export const CardDashboard = () => {
    const {pendingOrders, salesToday, newCustomers, stockInfo} = useDashboardStore();
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Ventas Hoy
          </CardTitle>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xl shrink-0 bg-green-500">
            <HandCoins />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center gap-4">
          <div className="text-2xl font-bold text-foreground">
            ${salesToday.total}
          </div>
          <Badge variant={getBadgeVariant(salesToday.changePercent)} className="mt-1">
            {formatChange(salesToday.changePercent)}
          </Badge>
        </CardContent>
      </Card>

      {/* Pedidos Pendientes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pedidos Pendientes
          </CardTitle>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xl shrink-0 bg-blue-500">
            <ShoppingCart />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center gap-4">
          <div className="text-2xl font-bold text-foreground">
            {pendingOrders.total}
          </div>
          <Badge variant="secondary" className="mt-1">
            {pendingOrders.today} nuevos hoy
          </Badge>
        </CardContent>
      </Card>

      {/* Productos en Stock */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Productos en Stock
          </CardTitle>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xl shrink-0 bg-violet-500">
            <Box />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center gap-4">
          <div className="text-2xl font-bold text-foreground">
            {stockInfo.totalProducts}
          </div>
          <Badge variant="secondary" className="mt-1">
            {stockInfo.lowStockCount} bajos
          </Badge>
        </CardContent>
      </Card>

      {/* Clientes Nuevos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Clientes Nuevos
          </CardTitle>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xl shrink-0 bg-pink-500">
            <Users />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center gap-4">
          <div className="text-2xl font-bold text-foreground">
            {newCustomers.total}
          </div>
          <Badge variant={getBadgeVariant(newCustomers.changePercent)} className="mt-1">
            {formatChange(newCustomers.changePercent)}
          </Badge>
        </CardContent>
      </Card>
    </>
  );
};
const getBadgeVariant = (value: number): 'success' | 'destructive' | 'secondary' => {
  if (value > 0) return 'success';
  if (value < 0) return 'destructive';
  return 'secondary'; // valor 0
};

const formatChange = (value: number | null | undefined): string => {
  if (value == null) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
};