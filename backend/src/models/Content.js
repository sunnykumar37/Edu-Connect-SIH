import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String, trim: true },
    type: { type: String, enum: ['pdf', 'video', 'link'], default: 'pdf' },
    linkUrl: { type: String },
    fileUrl: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    isAIGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', ContentSchema);
export default Content;


