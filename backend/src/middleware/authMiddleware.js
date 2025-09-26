import jwt from 'jsonwebtoken';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

export async function protect(req, res, next) {
  try {
    let token = null;
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = null;
    if (decoded.role === 'student') {
      user = await Student.findById(decoded.id).select('-password');
    } else {
      user = await Teacher.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user; // attach sanitized user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
}


