import useDashboardStore from '@/app/state/dashboardStore';


export const SalesData = () => {
  const { isLoading, sellerUpdate, error } = useDashboardStore();

  // Calcular el monto máximo para escalar las barras
  const maxAmount = Math.max(...sellerUpdate.map(item => item.amount), 0);

  if (isLoading) return <div className="p-4 text-center text-gray-500">Cargando ventas...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (sellerUpdate.length === 0) return <div className="p-4 text-center text-gray-500">No hay datos de ventas</div>;

  return (
    <>
      {/* Contenedor del gráfico de barras con scroll horizontal si es necesario */}
      <div className="flex items-end gap-[clamp(6px,2vw,12px)] h-[clamp(120px,25vw,160px)] mt-[clamp(16px,4vw,32px)] overflow-x-auto pb-2">
        {sellerUpdate.map((item, idx) => {
          // Calcular altura relativa al máximo (mínimo 8% para que se vea aunque sea cero)
          const percent = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 8;
          return (
            <div key={idx} className="flex-1 min-w-10 flex flex-col items-center">
              <div
                className="w-[clamp(30px,8vw,75%)] bg-linear-to-t from-blue-500 to-purple-600 rounded-t-md transition-all duration-500 ease-out"
                style={{ height: `${percent}%`, minHeight: '20px' }}
              />
              <span className="mt-[clamp(4px,1vw,8px)] text-[clamp(10px,2.5vw,12px)] text-gray-500">
                {item.day}
              </span>
              <span className="text-[clamp(10px,2.5vw,12px)] font-medium text-gray-700 text-center wrap-break-word">
                ${item.amount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total semanal */}
      <div className="mt-[clamp(16px,4vw,32px)] pt-[clamp(16px,4vw,24px)] border-t border-gray-200">
        <div className="flex justify-between items-center text-[clamp(12px,3vw,14px)] flex-wrap gap-2">
          <span className="text-gray-500">Total semanal:</span>
          <span className="font-bold text-gray-500 text-[clamp(14px,3.5vw,16px)]">
            ${sellerUpdate.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
};