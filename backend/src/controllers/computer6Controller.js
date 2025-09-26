import Computer6 from '../models/Computer6.js';

export async function listComputer6(_req, res) {
  try {
    const items = await Computer6.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}


