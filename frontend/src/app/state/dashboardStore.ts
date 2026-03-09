import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import getdashboard, { getEmployee } from '@/app/components/admin/dashboard/DashFetch';

// Tipos existentes
export interface SellerUpdateItem {
  day: string;
  amount: number;
  percent: number;
}

export interface Customer {
  name: string;
  email: string;
  // Para SuperAdmin puede tener id y phone, pero aquí usamos el mínimo común
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

export interface EmpleadosPorDepartamento {
  departamento: string;
  cantidad: number;
}

export interface ComposicionGenero {
  genero: string;
  cantidad: number;
}

export interface DistribucionEdad {
  rango: string;
  cantidad: number;
}

export interface ContratacionesMes {
  mes: string;
  contrataciones: number;
}

export interface RotacionMes {
  mes: string;
  rotacion: number;
}

export interface AusentismoMes {
  mes: string;
  ausentismo: number;
}

export interface EmpleadoReciente {
  id?: number | string;
  empleado: string;
  puesto: string | null;
  departamento: string | null;
  email: string;
  fecha_ingreso: string;
  estado: string;
}

export interface PipelineEtapa {
  etapa: string;
  candidatos: number;
}

export interface VisionGeneral {
  empleadosPorDepartamento: EmpleadosPorDepartamento[];
  composicionGenero: ComposicionGenero[];
  distribucionEdad: DistribucionEdad[];
  contrataciones6m: ContratacionesMes[];
  rotacion6m: RotacionMes[];
  ausentismo6m: AusentismoMes[];
}

export interface EmpleadosSeccion {
  recientes: EmpleadoReciente[];
}

export interface ReclutamientoSeccion {
  posicionesAbiertas: number;
  pipeline: PipelineEtapa[];
}

export interface HHRRData {
  totalEmpleados: number;
  nuevosIngresos: number;
  rotacionGeneral: number;
  ausentismoGeneral: number;
  tiempoMedioContratacion: number;
  posicionesAbiertas: number;
  visionGeneral: VisionGeneral;
  empleados: EmpleadosSeccion;
  reclutamiento: ReclutamientoSeccion;
}
export interface EmployeeUpdateItem {
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: string;
  created_at: string;
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
  hhrrData?: HHRRData;
  EmployeeUpdate: EmployeeUpdateItem[];
}

// Respuesta completa de la API (lo que devuelve la función de Supabase)
export interface DashboardApiResponse extends DashboardData {
  authorized: boolean;
  role: string;
}


// Estado inicial (sin hhrrData)
export const initialDashboardData: DashboardData = {
  sellerUpdate: [],
  recentOrders: [],
  topProducts: [],
  minimumQuantity: [],
  salesToday: { total: 0, changePercent: 0 },
  pendingOrders: { total: 0, today: 0 },
  stockInfo: { totalProducts: 0, lowStockCount: 0 },
  newCustomers: { total: 0, changePercent: 0 },
  EmployeeUpdate: []
};

interface DashboardStore extends DashboardData {
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null; 
  fetchDashboard: (userId: string, userRole: string) => Promise<void>;
  fetchEmployee: (userId: string, userRole: string) => Promise<void>;
  clearDashboard: () => void;
}

const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      ...initialDashboardData,
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchDashboard: async (userId = '', userRole = '') => {
        set({ isLoading: true, error: null });
        try {
          const data: DashboardApiResponse = await getdashboard(userId, userRole);
          console.log('Fetch Dashboard Response:', data);

          // Extraemos solo las propiedades de DashboardData (ignoramos authorized y role)
          const { authorized, role, ...dashboardData } = data;

          set({
            ...dashboardData,
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

      fetchEmployee: async (userId = '', userRole = '') => {
        set({ isLoading: true, error: null });
        try {
          const data: DashboardApiResponse = await getEmployee(userId, userRole);
          console.log('Fetch Employee Response:', data);

          const { authorized, role, ...dashboardData } = data;

          set({
            ...dashboardData,
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