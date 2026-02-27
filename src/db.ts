import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('mango.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'customer',
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price REAL,
    wholesale_price REAL,
    stock INTEGER,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL,
    status TEXT DEFAULT 'Placed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    items TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    discount_percent INTEGER,
    active INTEGER DEFAULT 1
  );
`);

// Seed initial products if empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare('INSERT INTO products (name, category, price, wholesale_price, stock, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
  const initialProducts = [
    ['Alphonso Mango', 'Fresh Mangoes', 1200, 900, 100, 'The King of Mangoes from Ratnagiri.', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800'],
    ['Kesar Mango', 'Fresh Mangoes', 800, 600, 150, 'Sweet and aromatic Kesar mangoes from Gujarat.', 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=800'],
    ['Dasheri Mango', 'Fresh Mangoes', 500, 350, 200, 'Delicious Dasheri mangoes from Malihabad.', 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800'],
    ['Mango Pickle', 'Pickles', 250, 180, 500, 'Traditional spicy and tangy mango pickle.', 'https://images.unsplash.com/photo-1589135340847-57a6b32370cf?auto=format&fit=crop&q=80&w=800'],
    ['Mango Pulp', 'Pulp', 400, 300, 300, '100% pure Alphonso mango pulp.', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800'],
    ['Mango Juice', 'Beverages', 150, 110, 1000, 'Refreshing natural mango juice.', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800'],
    ['Mango Jam', 'Jam', 300, 220, 80, 'Sweet and tangy mango jam made from fresh pulp.', 'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&q=80&w=800'],
    ['Mango Cubes', 'Cubes', 350, 280, 120, 'Dehydrated sweet mango cubes, perfect for snacking.', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800'],
    ['Mango Papad', 'Papad', 200, 150, 150, 'Traditional sun-dried mango leather (Aam Papad).', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800'],
    ['Mango Gift Box', 'Gifts', 2500, 2000, 50, 'Premium assortment of mangoes and treats.', 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800']
  ];

  initialProducts.forEach(p => insertProduct.run(...p));
  
  // Seed a coupon
  db.prepare('INSERT INTO coupons (code, discount_percent) VALUES (?, ?)').run('MANGO10', 10);
  db.prepare('INSERT INTO coupons (code, discount_percent) VALUES (?, ?)').run('WHOLESALE20', 20);
}

export default db;
