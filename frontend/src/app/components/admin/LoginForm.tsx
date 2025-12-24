// frontend/src/components/admin/LoginWithIllustration.tsx
export default function LoginWithIllustration() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Panel izquierdo - Ilustración */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-xl">🍦</span>
            </div>
            <span className="text-white text-xl font-bold">Heladería Sharita</span>
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
            <h1 className="text-3xl font-bold text-gray-900">Heladería Sharita</h1>
            <p className="text-gray-600 mt-2">Panel de Administración</p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
              <p className="text-gray-500 mt-1">Ingresa a tu cuenta para continuar</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    ¿Olvidaste?
                  </a>
                </div>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Recordar dispositivo
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Iniciar sesión
              </button>
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