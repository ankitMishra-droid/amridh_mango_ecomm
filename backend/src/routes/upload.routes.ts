import { Router } from 'express';
import { upload } from '../config/cloudinary.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: req.file.path });
});

router.post('/multiple', requireAuth, requireAdmin, upload.array('images', 5), (req, res) => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  const urls = (req.files as Express.Multer.File[]).map(file => file.path);
  res.json({ urls });
});

export default router;
