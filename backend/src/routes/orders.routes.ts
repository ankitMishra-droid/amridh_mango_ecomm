import { Router } from 'express';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { sendOrderConfirmation } from '../services/mail.service.js';

export const orderRouter = Router();

orderRouter.post('/', requireAuth, async (req: any, res) => {
  const { items } = req.body;
  const userId = req.user.id;
  const total = items.reduce((s: number, i: any) => s + i.quantity * i.price, 0);
  const tx = db.transaction(() => {
    const result = db.prepare('INSERT INTO orders (user_id, total, items) VALUES (?, ?, ?)').run(userId, total, JSON.stringify(items));
    const orderId = Number(result.lastInsertRowid);
    const updateStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
    items.forEach((i: any) => updateStock.run(i.quantity, i.id));
    return orderId;
  });
  const orderId = tx();
  const user: any = db.prepare('SELECT email FROM users WHERE id = ?').get(userId);
  await sendOrderConfirmation(user.email, orderId, total);
  res.json({ id: orderId, total });
});
