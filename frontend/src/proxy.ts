import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('myapp_token')?.value;

  // 1. Definir tipos de rutas
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/user');
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isHome = pathname === '/';

  // 2. Si no hay token, proteger rutas privadas
  if (!token) {
    if (isAdminRoute || isUserRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    // 3. Verificación real del JWT (Extraemos el rol)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role as string;

    // --- LÓGICA DE REDIRECCIÓN ---

    // A. Redirigir raíces vacías: /admin -> /admin/dashboard y /user -> /user/dashboard
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (pathname === '/user') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }

    // B. Si está logueado e intenta ir a Login, Register o Home (/)
    if (isAuthPage || isHome) {
      const target = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      return NextResponse.redirect(new URL(target, request.url));
    }

    // C. Prevención de cruce de roles (Seguridad)
    if (isAdminRoute && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
    
    if (isUserRoute && userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Si el token falla (expirado o manipulado)
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('myapp_token');
    return response;
  }
}

export const config = {
  matcher: ['/', '/login', '/register', '/admin/:path*', '/user/:path*'],
};