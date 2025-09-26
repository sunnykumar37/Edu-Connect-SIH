import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/educonnect_punjab';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo');

  // Clear existing notifications
  await Notification.deleteMany({});
  console.log('Cleared existing notifications');

  // Seed exam notifications
  const examNotifications = [
    {
      type: 'exam',
      title: 'Class 10 Board Exams',
      description: 'Important dates and guidelines for upcoming board examinations',
      date: new Date('2025-10-15'),
      priority: 'high',
      targetRole: 'student'
    },
    {
      type: 'exam',
      title: 'NTSE Stage 1',
      description: 'National Talent Search Examination registration deadline approaching',
      date: new Date('2025-11-01'),
      priority: 'high',
      targetRole: 'student'
    },
    {
      type: 'exam',
      title: 'Class 12 Board Exams',
      description: 'Important dates and guidelines for upcoming board examinations',
      date: new Date('2025-10-20'),
      priority: 'high',
      targetRole: 'student'
    }
  ];

  // Seed job notifications
  const jobNotifications = [
    {
      type: 'job',
      title: 'Government Jobs After Class 10',
      description: 'New recruitment opportunities for Class 10 pass students',
      date: new Date('2025-10-05'),
      priority: 'medium',
      targetRole: 'student'
    },
    {
      type: 'job',
      title: 'Punjab Police Recruitment',
      description: 'Constable recruitment for Punjab Police - applications open',
      date: new Date('2025-10-10'),
      priority: 'high',
      targetRole: 'student'
    }
  ];

  // Seed announcement notifications
  const announcementNotifications = [
    {
      type: 'announcement',
      title: 'New Digital Literacy Program',
      description: 'Launch of new computer literacy courses for all students',
      date: new Date('2025-09-30'),
      priority: 'medium',
      targetRole: 'all'
    },
    {
      type: 'announcement',
      title: 'Teacher Training Workshop',
      description: 'Mandatory training workshop for all teaching staff',
      date: new Date('2025-10-02'),
      priority: 'high',
      targetRole: 'teacher'
    }
  ];

  // Combine all notifications
  const allNotifications = [...examNotifications, ...jobNotifications, ...announcementNotifications];

  // Insert notifications
  for (const notification of allNotifications) {
    await Notification.create(notification);
    console.log('Seeded notification:', notification.title);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});