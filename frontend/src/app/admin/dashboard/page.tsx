'use client';

import { useAuthStore } from '@/app/state/userStore';
import { useEffect, useState } from 'react';
import AdminDashboard from './(roldashboard)/adminDashboard';
import CFODashboard from './(roldashboard)/cfoDashboard';
import SellerDashboard from './(roldashboard)/sellerDashboard';
import HRDashboard from './(roldashboard)/rrhhDashboard';
import Loading3D from '@/app/components/Loading3D';

export default function DashboardPage() {
  const userRole = useAuthStore((state) => state.user?.permission);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este efecto se ejecuta solo en el cliente, después de la hidratación
    setIsClient(true);
  }, []);

  // Mientras no estemos en el cliente, mostramos un placeholder vacío o un loader
  if (!isClient) {
    return <Loading3D />; // o null, pero con cuidado de no causar hidratación vacía
  }

  // Aquí ya estamos en el cliente y el store debería tener el valor real
  if (userRole === 'Admin' || userRole === 'SuperAdmin') {
    return <AdminDashboard />;
  }
  if (userRole === 'CFO') {
    return <CFODashboard />;
  }
  if (userRole === 'Seller') {
    return <SellerDashboard />;
  }
  if (userRole === 'RRHH') {
    return <HRDashboard />;
  }

  // Si no hay rol o no coincide, mostramos algo
  return <div>Acceso no autorizado</div>;
}