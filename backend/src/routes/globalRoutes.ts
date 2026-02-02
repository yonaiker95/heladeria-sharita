import express from 'express';
import { loginController } from '../controller/login/login.controller';

const GlobalRoutes: express.Router = express.Router();

GlobalRoutes.post('/login', loginController);

export default GlobalRoutes;
