import Notification from '../models/Notification.js'

// Get notifications for the current user
async function getNotifications(req, res) {
  try {
    const { role, className } = req.user
  
    // Find notifications that are relevant to the user
    const query = {
      $or: [
        { targetRole: 'all' },
        { targetRole: role }
      ]
    }
    
    // If user has a class, include class-specific notifications
    if (className) {
      query.$or.push({ targetClass: className })
    }
    
    // Get notifications sorted by date (newest first)
    const notifications = await Notification.find(query)
      .sort({ date: -1, priority: -1 })
      
    res.json({
      success: true,
      notifications
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    })
  }
}

// Create a new notification (admin/teacher only)
async function createNotification(req, res) {
  try {
    const { type, title, description, date, priority, targetRole, targetClass } = req.body
    
    const notification = new Notification({
      type,
      title,
      description,
      date,
      priority,
      targetRole,
      targetClass
    })
    
    await notification.save()
    
    res.status(201).json({
      success: true,
      notification
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create notification'
    })
  }
}

// Get important exams notifications
async function getExamNotifications(req, res) {
  try {
    const exams = await Notification.find({ type: 'exam' })
      .sort({ date: 1 })
      
    res.json({
      success: true,
      exams
    })
  } catch (error) {
    console.error('Error fetching exam notifications:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exam notifications'
    })
  }
}

// Get job opportunities notifications
async function getJobNotifications(req, res) {
  try {
    const jobs = await Notification.find({ type: 'job' })
      .sort({ date: 1 })
      
    res.json({
      success: true,
      jobs
    })
  } catch (error) {
    console.error('Error fetching job notifications:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job notifications'
    })
  }
}

export {
  getNotifications,
  createNotification,
  getExamNotifications,
  getJobNotifications
}