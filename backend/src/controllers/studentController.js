import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

function generateToken(userId) {
  return jwt.sign({ id: userId, role: 'student' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export async function loginStudent(req, res) {
  try {
    const { name, className, rollNumber, password, email } = req.body;
    let student;
    if (email) {
      const normalized = email.toLowerCase();
      // Block teacher accounts from using student login
      const teacherExists = await Teacher.findOne({ email: normalized });
      if (teacherExists) {
        return res.status(403).json({ message: 'This account is a teacher. Please use the Teacher portal to login.' });
      }
      student = await Student.findOne({ email: normalized });
    } else {
      if (!name || !className || !rollNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      student = await Student.findOne({ name, className, rollNumber });
    }
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!student.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    const token = generateToken(student._id);
    return res.json({ token, student: student.toJSON() });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function getStudentProfile(req, res) {
  return res.json({ student: req.user });
}

export async function signupStudent(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, password required' });
    }
    const existing = await Student.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const student = await Student.create({ name, className: 'N/A', rollNumber: 'N/A', password, isActive: true, email: email.toLowerCase() });
    const token = generateToken(student._id);
    return res.status(201).json({ token, student: student.toJSON() });
  } catch (e) {
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
}


