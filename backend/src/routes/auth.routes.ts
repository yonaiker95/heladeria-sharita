// src/routes/auth.routes.ts
import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { adminDashboard } from '../controllers/admin.dashboard.controller';
import { adminUserInfo } from '../controllers/admin.user.controller';
import { adminTestDashboard } from '../controllers/test.controllers';

const router: Router = Router();
router.post('/login', loginController);
router.get('/admin/dashboard', authenticateToken, adminDashboard);
router.get('/admin/test', authenticateToken, adminTestDashboard);
router.get('/admin/user', authenticateToken, adminUserInfo);


export default router;
