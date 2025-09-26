import Quiz, { Submission } from '../models/Quiz.js';

export async function createQuiz(req, res) {
  try {
    const { title, className, subject, questions } = req.body;
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required' });
    }
    const normalized = questions.map((q) => ({
      text: (q?.text || '').trim(),
      options: Array.isArray(q?.options) ? q.options.map((o) => (o || '').toString()) : [],
      correct: Number.isFinite(q?.correct) ? Number(q.correct) : 0,
    }));
    const quiz = await Quiz.create({ title: title.trim(), className, subject, questions: normalized, teacher: req.user?._id });
    res.status(201).json({ quiz });
  } catch (e) {
    console.error('Create quiz error:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}

export async function listQuizzes(_req, res) {
  try {
    const items = await Quiz.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (e) {
    console.error('List quizzes error:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}

export async function submitQuiz(req, res) {
  const { quizId, responses } = req.body; // responses: array of selected option indices
  const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  let correctCount = 0;
  (quiz.questions || []).forEach((q, i) => {
    if (Number(responses?.[i]) === Number(q.correct)) correctCount += 1;
  });
  const sub = await Submission.create({ quiz: quiz._id, student: req.user?._id, response: JSON.stringify(responses || []), isCorrect: correctCount === quiz.questions.length, correctCount, total: quiz.questions.length });
  res.status(201).json({ submission: sub, correctCount, total: quiz.questions.length });
}

export async function quizResults(_req, res) {
  try {
    const results = await Submission.find()
      .populate('quiz')
      .populate('student', 'name email className rollNumber')
      .sort({ createdAt: -1 });
    res.json({ results });
  } catch (e) {
    console.error('Quiz results error:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}


