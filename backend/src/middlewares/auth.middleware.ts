// const jwt = require('jsonwebtoken');
// import { NextFunction, Request, Response } from 'express';


// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   // 1. Obtener el token de las cookies (necesitas cookie-parser) o del header Authorization
//   const token = req.cookies.myapp_token || req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(403).json({ message: "No se proporcionó un token." });
//   }

//   try {
//     // 2. Verificar el token con el mismo secreto que usaste para firmarlo
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // 3. Inyectar los datos del usuario en la petición para que las rutas los usen
//     req.user = decoded; 
    
//     next(); // Continuar a la ruta
//   } catch (err) {
//     return res.status(401).json({ message: "Token inválido o expirado." });
//   }
// };

// // Middleware opcional para roles específicos
// const isAdmin = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: "Requiere rol de Administrador." });
//   }
// };

// module.exports = { verifyToken, isAdmin };