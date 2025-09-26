import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['exam', 'job', 'announcement', 'reminder']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  targetRole: {
    type: String,
    enum: ['student', 'teacher', 'all'],
    default: 'all'
  },
  targetClass: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Notification', notificationSchema)