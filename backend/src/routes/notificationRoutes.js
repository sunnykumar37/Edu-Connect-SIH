 import express from 'express'
import { getNotifications, createNotification, getExamNotifications, getJobNotifications } from '../controllers/notificationController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(protect)

// Get notifications for the current user
router.get('/', getNotifications)

// Create a new notification (admin/teacher only)
router.post('/', createNotification)

// Get important exams notifications
router.get('/exams', getExamNotifications)

// Get job opportunities notifications
router.get('/jobs', getJobNotifications)

export default router