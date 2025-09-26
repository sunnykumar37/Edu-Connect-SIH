import { Router } from 'express';
import { listComputer6 } from '../controllers/computer6Controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', protect, listComputer6);
export default router;


