import jwt from 'jsonwebtoken';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

function generateToken(userId) {
  return jwt.sign({ id: userId, role: 'teacher' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export async function signup(req, res) {
  try {
    const { name, email, phone, password, school, subjects = [], role = 'teacher' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server misconfiguration: missing JWT secret' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Teacher.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const teacher = await Teacher.create({
      name,
      email: normalizedEmail,
      phone: phone || '0000000000',
      password,
      school: school || 'N/A',
      subjects,
      role
    });

    const token = generateToken(teacher._id);
    return res.status(201).json({ token, teacher: teacher.toJSON() });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = typeof email === 'string' ? email.toLowerCase().trim() : '';
    // Block student accounts from using teacher login
    const studentExists = await Student.findOne({ email: normalizedEmail });
    if (studentExists) {
      return res.status(403).json({ message: 'This account is a student. Please use the Student portal to login.' });
    }
    const teacher = await Teacher.findOne({ email: normalizedEmail });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!teacher.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server misconfiguration: missing JWT secret' });
    }
    const token = generateToken(teacher._id);
    return res.json({ token, teacher: teacher.toJSON() });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function getProfile(req, res) {
  return res.json({ teacher: req.user });
}


