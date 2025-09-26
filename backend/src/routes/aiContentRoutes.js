import express from 'express'
import { generateContent, testAIContent } from '../controllers/aiContentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Test endpoint (no auth required for testing)
router.get('/test', testAIContent)

// AI content generation endpoint
router.post('/generate-content', protect, generateContent)

export default router
