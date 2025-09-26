import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: { type: [String], default: [] },
    correct: { type: Number, default: 0 },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // Legacy single-question fields (kept for backward compatibility)
    question: { type: String },
    answer: { type: String },
    // New multi-question support
    subject: { type: String, trim: true },
    className: { type: String },
    questions: { type: [QuestionSchema], default: [] },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    isAIGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubmissionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    response: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    correctCount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Submission = mongoose.model('Submission', SubmissionSchema);
const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;


