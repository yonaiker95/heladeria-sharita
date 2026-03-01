
import { AlertTriangle, Package } from 'lucide-react';
import useDashboardStore from '@/app/state/dashboardStore';

export const MinimumQuantity = () => {
  const {isLoading, minimumQuantity, error} = useDashboardStore();

  if (isLoading)
    return (
      <div className="p-4 text-center text-gray-500">Cargando stock...</div>
    );
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (minimumQuantity.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">
        No hay productos con stock por debajo del mínimo
      </div>
    );

  return (
    <div className="space-y-4">
        {minimumQuantity.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-3 p-3 rounded-lg bg-muted border border-border hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Icono - si es bajo stock mostramos alerta, si no, paquete normal */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0">
              {product.stock < product.minimum_stock ? (
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              ) : (
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            {/* Contenido principal */}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground text-sm sm:text-base truncate mb-1">
                {product.name}
              </p>

              {/* Stock actual y mínimo */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground">Stock: </span>
                  <span
                    className={
                      product.stock < product.minimum_stock
                        ? 'font-medium text-red-600 dark:text-red-400'
                        : 'font-medium text-green-600 dark:text-green-400'
                    }
                  >
                    {product.stock} uds
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mínimo: </span>
                  <span className="font-medium text-foreground">
                    {product.minimum_stock} uds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
