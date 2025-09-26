import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createModule, listModules } from '../controllers/moduleController.js';

const router = Router();
router.post('/', protect, createModule);
router.get('/', protect, listModules);
export default router;


