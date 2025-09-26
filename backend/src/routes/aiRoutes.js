import express from 'express'
import { generateQuiz, testAI } from '../controllers/aiController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// AI test endpoint (no auth required for testing)
router.get('/test', testAI)

// AI quiz generation endpoint
router.post('/generate-quiz', protect, generateQuiz)

export default router
