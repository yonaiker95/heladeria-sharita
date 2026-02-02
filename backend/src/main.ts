import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import globalRouter from './routes/globalRoutes';

dotenv.config();
const URL_BASE: string = process.env.URL_BASE || '/api';
const PORT: number = parseInt(process.env.PORT || '3000');
const HOST: string = process.env.HOST || '0.0.0.0';


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${URL_BASE}`, globalRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
