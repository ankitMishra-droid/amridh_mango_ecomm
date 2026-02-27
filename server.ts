import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/db.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = "mango-secret-key-123";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Auth Routes
  app.post("/api/register", async (req, res) => {
    const { email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(email, hashedPassword, name, role || 'customer');
      const user = { id: result.lastInsertRowid, email, name, role: role || 'customer' };
      const token = jwt.sign(user, JWT_SECRET);
      res.json({ token, user });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Product Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { name, category, price, wholesale_price, stock, description, image_url } = req.body;
    const result = db.prepare('INSERT INTO products (name, category, price, wholesale_price, stock, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)').run(name, category, price, wholesale_price, stock, description, image_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.patch("/api/products/:id", (req, res) => {
    const { stock, price } = req.body;
    db.prepare('UPDATE products SET stock = ?, price = ? WHERE id = ?').run(stock, price, req.params.id);
    res.json({ success: true });
  });

  // Order Routes
  app.post("/api/orders", (req, res) => {
    const { user_id, total, items } = req.body;
    const result = db.prepare('INSERT INTO orders (user_id, total, items) VALUES (?, ?, ?)').run(user_id, total, JSON.stringify(items));
    
    // Update stock
    items.forEach((item: any) => {
      db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.id);
    });

    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/orders", (req, res) => {
    const orders = db.prepare('SELECT orders.*, users.name as user_name FROM orders JOIN users ON orders.user_id = users.id ORDER BY created_at DESC').all();
    res.json(orders.map((o: any) => ({ ...o, items: JSON.parse(o.items) })));
  });

  app.get("/api/orders/user/:userId", (req, res) => {
    const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.params.userId);
    res.json(orders.map((o: any) => ({ ...o, items: JSON.parse(o.items) })));
  });

  app.patch("/api/orders/:id/status", (req, res) => {
    const { status } = req.body;
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true });
  });

  // Coupon Routes
  app.get("/api/coupons/:code", (req, res) => {
    const coupon = db.prepare('SELECT * FROM coupons WHERE code = ? AND active = 1').get(req.params.code);
    if (coupon) res.json(coupon);
    else res.status(404).json({ error: "Invalid coupon" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
