import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import teacherRoutes from './src/routes/teacherRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import contentRoutes from './src/routes/contentRoutes.js';
import quizRoutes from './src/routes/quizRoutes.js';
import moduleRoutes from './src/routes/moduleRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import aiContentRoutes from './src/routes/aiContentRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';
import path from 'path';
import fs from 'fs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'educonnect-punjab-backend' });
});

// Ensure uploads directory exists to prevent multer crashes
const uploadsDir = path.join(process.cwd(), 'uploads');
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) { console.error('Failed creating uploads dir', e); }

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ai-content', aiContentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Backward-compatible mounts (allow calls without /api prefix)
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);

// Helpful hints for common misuses (navigating to POST endpoints)
app.get(['/api/students/signup', '/students/signup'], (_req, res) => {
  res.status(405).json({ message: 'Use POST with JSON body to sign up: POST /api/students/signup' });
});
app.get(['/api/teachers/signup', '/teachers/signup'], (_req, res) => {
  res.status(405).json({ message: 'Use POST with JSON body to sign up: POST /api/teachers/signup' });
});

// Error handler to surface detailed errors during dev
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

// Mongo connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/educonnect_punjab';
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

startServer();

// Surface unhandled async errors in dev
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});


