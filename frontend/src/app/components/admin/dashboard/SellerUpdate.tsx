import { useState, useEffect } from 'react';
import { getdashboard } from './DashFetch';

// Define el tipo de dato que devuelve la API
interface DailySale {
  day: string;
  amount: number;
  // Si la API ya envía porcentaje, puedes incluirlo; si no, lo calculamos
}

export const SalesData = ({ refreshTrigger }: { refreshTrigger?: any }) => {
  const [salesData, setSalesData] = useState<DailySale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getdashboard();
        // Asumimos que response es un array de DailySale
        const data: DailySale[] = response.sellerUpdate;
        const totalVendido = data.reduce((acc, item) => acc + item.amount, 0);
        setTotal(totalVendido);
        setSalesData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [refreshTrigger]);

  // Calcular el monto máximo para escalar las barras
  const maxAmount = Math.max(...salesData.map(item => item.amount), 0);

  if (loading) return <div className="p-4 text-center text-gray-500">Cargando ventas...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (salesData.length === 0) return <div className="p-4 text-center text-gray-500">No hay datos de ventas</div>;

  return (
    <>
      {/* Contenedor del gráfico de barras con scroll horizontal si es necesario */}
      <div className="flex items-end gap-[clamp(6px,2vw,12px)] h-[clamp(120px,25vw,160px)] mt-[clamp(16px,4vw,32px)] overflow-x-auto pb-2">
        {salesData.map((item, idx) => {
          // Calcular altura relativa al máximo (mínimo 8% para que se vea aunque sea cero)
          const percent = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 8;
          return (
            <div key={idx} className="flex-1 min-w-[40px] flex flex-col items-center">
              <div
                className="w-[clamp(30px,8vw,75%)] bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-md transition-all duration-500 ease-out"
                style={{ height: `${percent}%`, minHeight: '20px' }}
              />
              <span className="mt-[clamp(4px,1vw,8px)] text-[clamp(10px,2.5vw,12px)] text-gray-500">
                {item.day}
              </span>
              <span className="text-[clamp(10px,2.5vw,12px)] font-medium text-gray-700 text-center break-words">
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
          <span className="font-bold text-gray-900 text-[clamp(14px,3.5vw,16px)]">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
};