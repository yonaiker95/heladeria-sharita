// components/Loading3D.tsx
import React from 'react';

const Loading3D: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-transparent">
      {/* Contenedor del cubo 3D */}
      <div
        className="relative w-20 h-20"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-30deg) rotateY(45deg)',
          animation: 'spin3D 3s linear infinite',
        }}
      >
        {/* Cara frontal */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'translateZ(40px)' }}
        />
        {/* Cara trasera */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'rotateY(180deg) translateZ(40px)' }}
        />
        {/* Cara derecha */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'rotateY(90deg) translateZ(40px)' }}
        />
        {/* Cara izquierda */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'rotateY(-90deg) translateZ(40px)' }}
        />
        {/* Cara superior */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'rotateX(90deg) translateZ(40px)' }}
        />
        {/* Cara inferior */}
        <div
          className="absolute w-20 h-20 bg-blue-500/80 border-2 border-white/20 shadow-lg shadow-blue-500/50"
          style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}
        />
      </div>

      {/* Texto de carga con animación de pulso */}
      <p className="mt-8 text-lg text-gray-600 dark:text-gray-300 animate-pulse">
        Cargando...
      </p>

      {/* Definición de la animación personalizada */}
      <style>{`
        @keyframes spin3D {
          from {
            transform: rotateX(-30deg) rotateY(45deg);
          }
          to {
            transform: rotateX(-30deg) rotateY(405deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading3D;
