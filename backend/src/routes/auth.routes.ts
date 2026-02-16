// src/routes/auth.routes.ts
import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { adminDashboard } from '../controllers/admin.dashboard.controller';

const router: Router = Router();
router.post('/login', loginController);
router.get('/admin/dashboard', authenticateToken, adminDashboard);


export default router;
