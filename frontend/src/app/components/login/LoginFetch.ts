'use server';

import { cookies } from 'next/headers';

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    // Importante: permite que el navegador reciba y guarde el Set-Cookie de Express
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error');

  // Guardamos las cookies DESDE el servidor
  const cookieStore = await cookies();
  
  // Guardamos el token que viene de Express
  if (data.token) {
    cookieStore.set('session_token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  // Guardamos el rol para el Middleware
  cookieStore.set('user_role', data.role, {
    path: '/',
    sameSite: 'lax',
  });

  // En lugar de devolver data, retornamos el destino
  return { success: true, role: data.role };
}

// 'use server';

// import { cookies } from 'next/headers';

// export async function loginUser(email: string, password: string) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//     // Importante: permite que el navegador reciba y guarde el Set-Cookie de Express
//     credentials: 'include',
//   });

//   const data = await response.json();
//   console.log('Login Response Data:', data);
//   // throw new Error(data);

//   if (!response.ok) {
//     throw new Error(data.message || 'Credenciales incorrectas');
//   }
//   return data;
// }
