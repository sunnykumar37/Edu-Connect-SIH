import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createContent, listContent, deleteContent } from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), createContent);
router.get('/', protect, listContent);
router.delete('/:id', protect, deleteContent);

export default router;


