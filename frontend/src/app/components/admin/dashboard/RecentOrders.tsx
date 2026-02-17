import { useState, useEffect } from 'react';
import { getdashboard } from './DashFetch';

// Define el tipo de dato que devuelve la API
interface recentOrders {
  id: string;
  invoice_number: string;
  product_name: string;
  total_price: string;
  created_at: string;
  customer: {
    name: string;
    email: string;
  }[];
}

export const RecentOrders = ({ refreshTrigger }: { refreshTrigger?: any }) => {
  const [recentOrders, setRecentOrders] = useState<recentOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getdashboard();
        // Asumimos que response es un array de DailySale
        const data: recentOrders[] = response.recentOrders;
        setRecentOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [refreshTrigger]);

  if (loading)
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
    <div className="flex flex-col gap-[clamp(12px,3vw,16px)] max-h-[300px] overflow-y-auto pr-2">
      {recentOrders.map((order, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-3 p-[clamp(12px,3vw,16px)] bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between gap-[clamp(8px,2vw,16px)]">
            <div className="flex items-center gap-[clamp(8px,2vw,16px)] min-w-0">
              <div className="w-[clamp(32px,8vw,40px)] h-[clamp(32px,8vw,40px)] bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[clamp(16px,4vw,20px)] leading-none">
                  🍦
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-[clamp(14px,3vw,16px)] m-0 mb-1 truncate">
                  {order.invoice_number}
                </p>
                <p className="text-[clamp(12px,3vw,14px)] text-gray-500 m-0 truncate">
                  {order.customer.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <p className="font-medium text-gray-900 text-[clamp(14px,3vw,16px)] m-0">
              ${order.total_price}
            </p>
            <div className="flex items-center gap-[clamp(6px,2vw,8px)] flex-wrap">
              <span
                className={`
              text-[clamp(10px,2.5vw,12px)] px-[clamp(6px,2vw,8px)] py-[clamp(3px,1vw,4px)]
              rounded-full whitespace-nowrap
              ${
                order.status === 'Completado'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'En preparación'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }
            `}
              >
                {order.status}
              </span>
              <span className="text-[clamp(10px,2.5vw,12px)] text-gray-500">
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
