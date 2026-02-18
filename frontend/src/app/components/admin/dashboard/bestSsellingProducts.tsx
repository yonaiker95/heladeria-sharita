import { useState, useEffect } from 'react';
import { getdashboard } from './DashFetch';

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
      {topProducts.map((product) => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: 'clamp(10px, 3vw, 12px)',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(8px, 2vw, 12px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2vw, 12px)',
                minWidth: '0',
                flex: '1',
              }}
            >
              <div
                style={{
                  width: 'clamp(32px, 8vw, 40px)',
                  height: 'clamp(32px, 8vw, 40px)',
                  backgroundColor: '#bfdbfe',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: '0',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    lineHeight: '1',
                  }}
                >
                  🍦
                </span>
              </div>
              <div style={{ minWidth: '0', flex: '1' }}>
                <p
                  style={{
                    fontWeight: '500',
                    color: '#111827',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    margin: '0 0 4px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    color: '#6b7280',
                    margin: '0',
                  }}
                >
                  {product.total_sold} ventas
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
              <span style={{ color: '#6b7280' }}>Stock: </span>
              <span
                style={{
                  fontWeight: '500',
                  color: product.stock < product.minimum_stock ? '#dc2626' : '#059669',
                }}
              >
                {product.stock} unidades
              </span>
            </div>
            <svg
              style={{
                width: 'clamp(14px, 3vw, 16px)',
                height: 'clamp(14px, 3vw, 16px)',
                color: '#9ca3af',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}{' '}
    </>
  );
};
