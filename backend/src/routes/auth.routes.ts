import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { adminDashboard } from '../controllers/admin.dashboard.controller';
import { adminTestDashboard } from '../controllers/test.controllers';

const router: Router = Router();
router.post('/login', loginController);
router.get('/admin/dashboard', authenticateToken, adminDashboard);
router.get('/admin/test', authenticateToken, adminTestDashboard);


export default router;
