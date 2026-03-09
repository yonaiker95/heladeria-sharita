'use server';

import { cookies } from 'next/headers';
import { useAuthStore } from '@/app/state/userStore';

const getcookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
};

export const getdashboard = async (userId= '', permission = '') => {  
  const userRole = permission || useAuthStore.getState().user?.userId;
  const token = await getcookies();
  if (permission.length > 0) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Id': `${userId}`,
          'X-User-Role': `${userRole}`,
          'Content-Type': 'application/json',
        },

      }
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    // console.log('Datos del dashboard:', data);
    console.log('Dashboard data fetched successfully');
    return data;
  }
};

export const getEmployee = async (userId= '', permission = '') => {
  const userRole = permission || useAuthStore.getState().user?.userId;
  const token = await getcookies();
  if (permission.length > 0) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Id': `${userId}`,
          'X-User-Role': `${userRole}`,
          'Content-Type': 'application/json',
        },

      }
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    // console.log('Datos del dashboard:', data);
    console.log('Dashboard data fetched successfully');
    return data;
  }
}

export default getdashboard;
