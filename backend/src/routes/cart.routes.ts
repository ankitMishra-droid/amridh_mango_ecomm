import { Router } from 'express';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';

export const cartRouter = Router();
cartRouter.use(requireAuth);

cartRouter.get('/', (req: any, res) => {
  const items = db.prepare(`SELECT c.product_id as id, c.quantity, p.name, p.price, p.image_url
    FROM carts c JOIN products p ON p.id = c.product_id WHERE c.user_id = ?`).all(req.user.id);
  res.json(items);
});
cartRouter.post('/item', (req: any, res) => {
  const { productId, quantity } = req.body;
  db.prepare('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?) ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = excluded.quantity').run(req.user.id, productId, quantity);
  res.json({ success: true });
});
cartRouter.delete('/item/:productId', (req: any, res) => {
  db.prepare('DELETE FROM carts WHERE user_id = ? AND product_id = ?').run(req.user.id, req.params.productId);
  res.json({ success: true });
});
