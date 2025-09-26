import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Computer6 from '../models/Computer6.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/educonnect_punjab';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');

  const docs = [
    { title: 'Computer-6 PDF 1', link: 'https://drive.google.com/file/d/1OzGVhvmO1vzRFM7CfAseAY_nK2MrI0Zl/preview' },
    { title: 'Computer-6 PDF 2', link: 'https://drive.google.com/file/d/1qfo1LRa5tguzHcQm9XajWg6CqkK8EP3-/preview' },
    { title: 'Computer-6 PDF 3', link: 'https://drive.google.com/file/d/1dWZizRZQkpscGh1s9Erb6xPKVW01CxLD/preview' },
  ];

  // Upsert by link to avoid duplicates
  for (const doc of docs) {
    await Computer6.updateOne({ link: doc.link }, { $setOnInsert: doc }, { upsert: true });
  }

  console.log('Seeded computer-6');
  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });


