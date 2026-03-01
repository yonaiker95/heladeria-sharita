'use server';

import { UserDataCookie } from '@/lib/cookieTransfer';
import { cookies } from 'next/headers';

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (!response.ok) return (data.message || 'Error');

  // Guardamos las cookies DESDE el servidor
  const cookieStore = await cookies();
  
  // Guardamos el token que viene de Express
  if (data.token) {
    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  const dataCookie = await UserDataCookie(data.token);

  return { success: data.success, userData: dataCookie };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  return { success: true };
}


