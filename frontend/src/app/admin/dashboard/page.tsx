'use client';

import { useAuthStore } from '@/app/state/userStore';
import AdminDashboard from './(roldashboard)/adminDashboard';
import CFODashboard from './(roldashboard)/cfoDashboard';
import SellerDashboard from './(roldashboard)/sellerDashboard';
import HRDashboard from './(roldashboard)/rrhhDashboard';

export default function AdminDashboardPage() {
  const user = useAuthStore((state) => state.user?.permission || ''); // Obtener el permiso del usuario desde el store
  if (user === 'Admin') {
    return <AdminDashboard />;
  }

  if (user === 'SuperAdmin') {
    return <AdminDashboard />;
  }

  if (user === 'CFO') {
    return <CFODashboard />;
  }
  if (user === 'Seller') {
    return <SellerDashboard />;
  }
  if (user === 'RRHH') {
    return <HRDashboard />;
  }

  return 
};
