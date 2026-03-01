import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import getdashboard from '@/app/components/admin/dashboard/dashFetch';

export interface SellerUpdateItem {
  day: string;
  amount: number;
  percent: number;
}

export interface Customer {
  name: string;
  email: string;
}

export interface RecentOrder {
  id: string;
  status: string;
  invoice_number: string;
  product_name: string;
  total_price: number;
  created_at: string;
  customer: Customer;
}

export interface TopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minimum_stock: number;
  total_sold: number;
}

export interface MinimumQuantityProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minimum_stock: number;
  deficit: number;
}

export interface SalesToday {
  total: number;
  changePercent: number;
}

export interface PendingOrders {
  total: number;
  today: number;
}

export interface StockInfo {
  totalProducts: number;
  lowStockCount: number;
}

export interface NewCustomers {
  total: number;
  changePercent: number;
}

export interface DashboardData {
  sellerUpdate: SellerUpdateItem[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  minimumQuantity: MinimumQuantityProduct[];
  salesToday: SalesToday;
  pendingOrders: PendingOrders;
  stockInfo: StockInfo;
  newCustomers: NewCustomers;
}

// Estado inicial (vacío)
export const initialDashboardData: DashboardData = {
  sellerUpdate: [],
  recentOrders: [],
  topProducts: [],
  minimumQuantity: [],
  salesToday: { total: 0, changePercent: 0 },
  pendingOrders: { total: 0, today: 0 },
  stockInfo: { totalProducts: 0, lowStockCount: 0 },
  newCustomers: { total: 0, changePercent: 0 },
};

interface DashboardStore extends DashboardData {
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null; // timestamp de la última actualización exitosa
  fetchDashboard: () => Promise<void>;
  clearDashboard: () => void;
}

const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      ...initialDashboardData,
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchDashboard: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getdashboard();
          console.log('Fetch Dashboard Response:', data);

          // data debe coincidir con la estructura DashboardData
          set({
            ...data,
            isLoading: false,
            lastFetched: Date.now(),
          });
        } catch (err: any) {
          set({
            error: err.message || 'Error al cargar dashboard',
            isLoading: false,
          });
          console.error(err);
        }
      },

      clearDashboard: () => {
        set({ ...initialDashboardData, lastFetched: null });
      },
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDashboardStore;
