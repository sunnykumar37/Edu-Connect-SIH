import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  },
  { timestamps: true }
);

const Module = mongoose.model('Module', ModuleSchema);
export default Module;


