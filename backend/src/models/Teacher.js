import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{4}$/.test(v),
        message: 'Password must be exactly 4 digits'
      }
    },
    school: { type: String, required: true, trim: true },
    subjects: { type: [String], default: [] },
    role: { type: String, enum: ['teacher', 'admin'], default: 'teacher' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Hash password before save if modified
TeacherSchema.pre('save', async function hashPasswordIfModified(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare candidate password
TeacherSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive fields in JSON
TeacherSchema.methods.toJSON = function toJSONSafe() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;


