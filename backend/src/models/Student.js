import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    className: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{4}$/.test(v),
        message: 'Password must be exactly 4 digits'
      }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

StudentSchema.index({ name: 1, className: 1, rollNumber: 1 }, { unique: true });

StudentSchema.pre('save', async function hashPasswordIfModified(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

StudentSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

StudentSchema.methods.toJSON = function toJSONSafe() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Student = mongoose.model('Student', StudentSchema);
export default Student;


