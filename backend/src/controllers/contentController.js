import Content from '../models/Content.js';

export async function createContent(req, res) {
  try {
    const { title, description, subject, type = 'pdf', linkUrl } = req.body;
    const uploadedUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    // Business rule: teacher-uploaded PDFs should appear under Class Content for students.
    const effectiveType = uploadedUrl && !linkUrl && type === 'pdf' ? 'link' : type;
    const fileUrl = effectiveType === 'link' ? undefined : uploadedUrl;
    const finalLink = effectiveType === 'link' ? (linkUrl || uploadedUrl) : undefined;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const doc = await Content.create({ title, description, subject, type: effectiveType, linkUrl: finalLink, fileUrl, createdBy: req.user?._id });
    res.status(201).json({ content: doc });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}

export async function listContent(_req, res) {
  const items = await Content.find().sort({ createdAt: -1 });
  res.json({ items });
}

export async function deleteContent(req, res) {
  const { id } = req.params;
  await Content.findByIdAndDelete(id);
  res.json({ ok: true });
}


