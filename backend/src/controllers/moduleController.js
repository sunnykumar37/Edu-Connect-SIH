import Module from '../models/Module.js';

export async function createModule(req, res) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const m = await Module.create({ title, createdBy: req.user?._id });
  res.status(201).json({ module: m });
}

export async function listModules(_req, res) {
  const items = await Module.find().sort({ createdAt: -1 });
  res.json({ items });
}


