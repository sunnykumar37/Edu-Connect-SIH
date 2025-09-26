import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/educonnect_punjab';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo');

  // Seed Teacher (permanent account requested)
  const teacherEmail = 'sunnyk28912@gmail.com';
  const existingTeacher = await Teacher.findOne({ email: teacherEmail });
  if (!existingTeacher) {
    await Teacher.create({
      name: 'Sunny',
      email: teacherEmail,
      phone: '9999999999',
      password: 'Sunny@123',
      school: 'Govt Sr Sec School',
      subjects: ['Maths', 'Science'],
      role: 'teacher',
      isActive: true,
    });
    console.log('Seeded teacher:', teacherEmail);
  } else {
    console.log('Teacher already exists:', teacherEmail);
  }

  // Seed Student
  const studentKey = { name: 'Raman', className: '10', rollNumber: '23' };
  const existingStudent = await Student.findOne(studentKey);
  if (!existingStudent) {
    await Student.create({ ...studentKey, password: 'Pass1234', isActive: true });
    console.log('Seeded student:', JSON.stringify(studentKey));
  } else {
    console.log('Student already exists:', JSON.stringify(studentKey));
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


