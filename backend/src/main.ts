import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes';

dotenv.config();

const app: Application = express();

// Configuraciones
const URL_BASE = process.env.URL_BASE || '/api';
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Corregido: Usamos 'as any' para evitar el conflicto de tipos de Express
app.use(cookieParser() as any);

// Rutas
app.use(URL_BASE, router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is healthy! 🚀');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
