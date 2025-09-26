import { Router } from 'express';
import { loginStudent, getStudentProfile, signupStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginStudent);
router.post('/signup', signupStudent);
router.get('/me', protect, getStudentProfile);

export default router;


