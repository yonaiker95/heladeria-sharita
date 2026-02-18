import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   _Id: string;
//   role?: string;
//   iat?: number;
//   exp?: number; 
// }

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado.' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(403).json({ error: 'Token inválido o expirado.' });
      return;
    }
    next();
  });
}