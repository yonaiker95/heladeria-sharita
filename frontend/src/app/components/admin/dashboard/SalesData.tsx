import {useState, useEffect} from 'react'
import {getdashboard} from './DashFetch'

export const SalesData = (refreshTrigger) => {


  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

useEffect(() =>{
 const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);
       const response = await getdashboard()
        const data: DailySale[] = response;
        const totalVendido = data.reduce((acc, item) => acc + item.amount, 0);
        setTotal(totalVendido)
        setSalesData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
},[refreshTrigger])

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(6px, 2vw, 12px)', height: 'clamp(120px, 25vw, 160px)', marginTop: 'clamp(16px, 4vw, 32px)', overflowX: 'auto', paddingBottom: '8px' }}>
            {salesData.map((item, idx) => (
              <div key={idx} style={{ flex: '1', minWidth: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 'clamp(30px, 8vw, 75%)', height: `${item.percent}%`, background: 'linear-gradient(to top, #3b82f6, #8b5cf6)', borderRadius: '6px 6px 0 0', minHeight: '20px', transition: 'height 0.5s ease-out' }} />
                <span style={{ marginTop: 'clamp(4px, 1vw, 8px)', fontSize: 'clamp(10px, 2.5vw, 12px)', color: '#6b7280' }}>{item.day}</span>
                <span style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: '500', color: '#374151', textAlign: 'center', wordBreak: 'break-word' }}>${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(16px, 4vw, 32px)', paddingTop: 'clamp(16px, 4vw, 24px)', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'clamp(12px, 3vw, 14px)', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: '#6b7280' }}>Total semanal:</span>
              <span style={{ fontWeight: '700', color: '#111827', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>${total}</span>
            </div>
          </div>
    
    </>
  )
}

