'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginWithIllustration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://192.168.0.160:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // Importante: permite que el navegador reciba y guarde el Set-Cookie de Express
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // 1. Extraer el rol de la respuesta de tu API
      const userRole = data.role; // 'admin' o 'user'

      // 2. Establecer la cookie de rol para el Middleware
      // Usamos SameSite=Lax para que el middleware la lea correctamente al redirigir
      document.cookie = `user_role=${userRole}; path=/; max-age=3600; SameSite=Lax`;

      // 3. Guardar datos no sensibles en localStorage para uso rápido en la UI
      localStorage.setItem('user_role', userRole);

      // 4. Redirigir según el rol
      const targetPath =
        userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';

      // 5. Redirección con window.location.href
      // ¿Por qué? router.push de Next.js a veces no dispara el middleware
      // en la primera carga si las cookies acaban de cambiar.
      // location.href garantiza una petición fresca al servidor.
      window.location.href = targetPath;
    } catch (err: any) {
      setError(err.message);
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [debugInfo, setDebugInfo] = useState('');

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   setDebugInfo('Iniciando login...');

  //   try {
  //     setDebugInfo('Enviando datos a Express...');

  //     // 1. Llamar a tu API Express
  //     const response = await fetch('http://localhost:3000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //       credentials: 'include', // ⭐ NECESARIO para cookies
  //     });

  //     setDebugInfo(`Respuesta recibida. Status: ${response.status}`);

  //     // 2. Tu API devuelve: { message: "...", role: "admin"|"user" }
  //     const data = await response.json();
  //     setDebugInfo(prev => prev + `\nDatos: ${JSON.stringify(data)}`);

  //     if (response.ok) {
  //       // 3. Obtener el ROL de la respuesta
  //       const userRole = data.role; // ← 'admin' o 'user'
  //       setDebugInfo(prev => prev + `\nRol detectado: ${userRole}`);

  //       // 4. ⭐⭐ GUARDAR EL ROL EN UNA COOKIE ⭐⭐
  //       // Esto es lo que el middleware va a leer
  //       const cookieString = `user_role=${userRole}; path=/; max-age=3600; SameSite=Lax`;
  //       document.cookie = cookieString;

  //       setDebugInfo(prev => prev + `\nCookie establecida: ${cookieString}`);

  //       // 5. Mostrar todas las cookies actuales
  //       setTimeout(() => {
  //         console.log('🍪 TODAS las cookies después del login:', document.cookie);
  //         setDebugInfo(prev => prev + `\nCookies actuales: ${document.cookie}`);
  //       }, 100);

  //       // 6. También guardar en localStorage (para el cliente)
  //       localStorage.setItem('user_role', userRole);
  //       localStorage.setItem('user_email', email);

  //       // 7. Redirigir según rol
  //       const dashboard = userRole === 'admin'
  //         ? '/admin/dashboard'
  //         : '/user/dashboard';

  //       setDebugInfo(prev => prev + `\nRedirigiendo a: ${dashboard}`);

  //       // 8. Redirigir CON RECARGA FORZADA
  //       // Esto asegura que el middleware se ejecute de nuevo
  //       setTimeout(() => {
  //         window.location.href = dashboard;
  //       }, 500);

  //     } else {
  //       setError(data.message || 'Error en login');
  //       setDebugInfo(prev => prev + `\n❌ Error: ${data.message}`);
  //     }

  //   } catch (error: any) {
  //     console.error('Error completo:', error);
  //     setError('No se pudo conectar al servidor');
  //     setDebugInfo(prev => prev + `\n❌ Catch error: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Panel izquierdo - Ilustración */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-xl">🍦</span>
            </div>
            <span className="text-white text-xl font-bold">
              Heladería Sharita
            </span>
          </div>

          <div className="mt-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Panel de Control
            </h2>
            <p className="text-blue-100 text-lg">
              Gestiona tu heladería desde un solo lugar
            </p>
          </div>
        </div>

        {/* Ilustración/Decoración */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 text-white/80">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header para móvil */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Heladería Sharita
            </h1>
            <p className="text-gray-600 mt-2">Panel de Administración</p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Bienvenido de nuevo
              </h2>
              <p className="text-gray-500 mt-1">
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  {/* <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    ¿Olvidaste?
                  </a> */}
                </div>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Recordar dispositivo
                </label>
              </div> */}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Iniciar sesión
              </button>
              {error && (
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error de inicio de sesión
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>
                      Las credenciales ingresadas son incorrectas. Por favor,
                      inténtalo de nuevo.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2024 Heladería Sharita. Todos los derechos reservados.</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
