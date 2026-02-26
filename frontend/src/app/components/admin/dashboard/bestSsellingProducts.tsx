import { useState, useEffect } from 'react';
import { getdashboard } from './DashFetch';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface topProducts {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minimum_stock: number;
  total_sold: number;
}

interface Refresh {
  refreshTrigger: number;
}

export const BestSellingProducts = (refreshTrigger: Refresh) => {
  const [topProducts, setTopProducts] = useState<topProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getdashboard();
        // Asumimos que response es un array de DailySale
        const data: topProducts[] = response.topProducts;
        setTopProducts(data);
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
  if (topProducts.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">
        No hay datos de productos más vendidos
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {topProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-3 p-3 rounded-lg bg-muted border border-border"
        >
          {/* Fila superior: icono + nombre + ventas */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-lg sm:text-xl">🍦</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground text-sm sm:text-base truncate">
                  {product.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {product.total_sold} ventas
                </p>
              </div>
            </div>
          </div>

          {/* Fila inferior: stock + flecha */}
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <div className="text-xs sm:text-sm">
              <span className="text-muted-foreground">Stock: </span>
              <span
                className={
                  product.stock < product.minimum_stock
                    ? 'font-medium text-red-600 dark:text-red-400'
                    : 'font-medium text-green-600 dark:text-green-400'
                }
              >
                {product.stock} unidades
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      ))}
      </div>
    </>
  );
};
