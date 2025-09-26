import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createQuiz, listQuizzes, submitQuiz, quizResults } from '../controllers/quizController.js';

const router = Router();

router.post('/', protect, createQuiz);
router.get('/', protect, listQuizzes);
router.post('/submit', protect, submitQuiz);
router.get('/results', protect, quizResults);

export default router;


