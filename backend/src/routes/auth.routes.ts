import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../db/database.js';
import { env } from '../config/env.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { email, password, name, role = 'customer', phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const r = db.prepare('INSERT INTO users (email, password, name, role, phone) VALUES (?, ?, ?, ?, ?)').run(email, hashed, name, role, phone ?? null);
    const user = { id: Number(r.lastInsertRowid), email, role, name };
    const token = jwt.sign(user, env.jwtSecret, { expiresIn: '7d' });
    res.json({ token, user });
  } catch {
    res.status(400).json({ error: 'Email already exists' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, phone, password } = req.body;
  const user: any = email
    ? db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    : db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });
  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
  res.json({ token, user: payload });
});

authRouter.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.json({ success: true });
  const token = crypto.randomBytes(24).toString('hex');
  db.prepare('UPDATE users SET reset_token = ?, reset_expires_at = ? WHERE id = ?').run(token, Date.now() + 1000 * 60 * 30, user.id);
  res.json({ success: true, resetToken: token });
});

authRouter.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const user: any = db.prepare('SELECT * FROM users WHERE reset_token = ? AND reset_expires_at > ?').get(token, Date.now());
  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
  const hashed = await bcrypt.hash(password, 10);
  db.prepare('UPDATE users SET password = ?, reset_token = NULL, reset_expires_at = NULL WHERE id = ?').run(hashed, user.id);
  res.json({ success: true });
});
