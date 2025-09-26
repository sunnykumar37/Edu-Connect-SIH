import { Router } from 'express';
import { signup, login, getProfile } from '../controllers/teacherController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// POST /api/teachers/signup
router.post('/signup', signup);

// POST /api/teachers/login
router.post('/login', login);

// GET /api/teachers/me
router.get('/me', protect, getProfile);

export default router;


