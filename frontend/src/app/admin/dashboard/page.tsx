'use client';

import { useAuthStore } from '@/app/state/userStore';
import AdminDashboard from './(roldashboard)/adminDashboard';

const AdminDashboardPage = () => {
  const user = useAuthStore((state) => state.user?.permission || ''); // Obtener el permiso del usuario desde el store
  if (user === 'Admin') {
    return <AdminDashboard />;
  }

  if (user === 'SuperAdmin') {
    return <AdminDashboard />;
  }

  if (user === 'CFO') {
    return <AdminDashboard />;
  }
  if (user === 'Seller') {
    return <AdminDashboard />;
  }
  if (user === 'RRHH') {
    return <AdminDashboard />;
  }
};

export default AdminDashboardPage;
