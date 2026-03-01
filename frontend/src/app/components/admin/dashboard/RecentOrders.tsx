import { BadgeCheck, CircleX, Loader, ClockFading } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useDashboardStore from '@/app/state/dashboardStore';

export const RecentOrders = () => {
  const { isLoading, recentOrders, error } = useDashboardStore();

  if (isLoading)
    return (
      <div className="p-4 text-center text-gray-500">Cargando Pedidos...</div>
    );
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (recentOrders.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">
        No hay datos de ventas
      </div>
    );

  return (
    <div className="flex flex-col gap-3 max-h-75 overflow-y-auto pr-2">
      {recentOrders.map((order, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-3 p-4 bg-muted rounded-lg border border-border"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xl leading-none">🍦</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground text-base truncate mb-0.5">
                  # {order.invoice_number}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {order.customer?.name || 'Cliente'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <p className="font-semibold text-foreground text-base">
              ${order.total_price}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={statusToVariant[order.status] || 'secondary'}>
                {statusToIcon[order.status]} {order.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(order.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'ahora';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} h`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} d`;
}

const statusToVariant: Record<
  string,
  | 'link'
  | 'default'
  | 'success'
  | 'outline'
  | 'destructive'
  | 'secondary'
  | 'ghost'
  | 'info'
  | null
  | undefined
> = {
  Completado: 'success',
  Pendiente: 'outline',
  Cancelado: 'destructive',
  'En Preparacion': 'default',
};

const statusToIcon: Record<string, React.ReactNode> = {
  Completado: <BadgeCheck data-icon="inline-start" />,
  Pendiente: <ClockFading data-icon="inline-start" />,
  Cancelado: <CircleX data-icon="inline-start" />,
  'En Preparacion': (
    <Loader className="animate-spin" data-icon="inline-start" />
  ),
};
