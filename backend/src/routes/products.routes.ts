import { Router } from 'express';
import { db } from '../db/database.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const productRouter = Router();

productRouter.get('/', (_req, res) => {
  const products = db.prepare('SELECT * FROM products').all() as any[];
  const imageStmt = db.prepare('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC');
  res.json(products.map((p) => ({ ...p, images: [p.image_url, ...(imageStmt.all(p.id) as any[]).map((i) => i.image_url)] })));
});

productRouter.post('/', requireAuth, requireAdmin, (req, res) => {
  const { name, category, description, price, stock, sku, image_url, images = [] } = req.body;
  const result = db.prepare('INSERT INTO products (name, category, description, price, stock, sku, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)').run(name, category, description, price, stock, sku, image_url);
  const id = Number(result.lastInsertRowid);
  const imageInsert = db.prepare('INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)');
  images.forEach((url: string, idx: number) => imageInsert.run(id, url, idx));
  res.json({ id });
});

productRouter.put('/:id', requireAuth, requireAdmin, (req, res) => {
  const { name, category, description, price, stock, sku, image_url } = req.body;
  db.prepare('UPDATE products SET name=?, category=?, description=?, price=?, stock=?, sku=?, image_url=? WHERE id=?').run(name, category, description, price, stock, sku, image_url, req.params.id);
  res.json({ success: true });
});

productRouter.delete('/:id', requireAuth, requireAdmin, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});
