'use server';

import { cookies } from 'next/headers';

const getcookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
};

export const getdashboard = async () => {
  const token = await getcookies();
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
};

export default getdashboard;