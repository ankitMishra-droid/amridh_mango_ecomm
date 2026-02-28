import Database from "better-sqlite3";
import path from "path";

// Create database in root directory safely
const dbPath = path.join(process.cwd(), "mango.db");
const db = new Database(dbPath);

// Enable foreign keys (important)
db.pragma("foreign_keys = ON");

// ============================
// Initialize Tables
// ============================

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    price REAL NOT NULL,
    wholesale_price REAL,
    stock INTEGER DEFAULT 0,
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
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    discount_percent INTEGER,
    active INTEGER DEFAULT 1
  );
`);

// ============================
// Seed Initial Products
// ============================

const productCount = db
  .prepare("SELECT COUNT(*) as count FROM products")
  .get() as { count: number };

if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products 
    (name, category, price, wholesale_price, stock, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProducts: [
    string,
    string,
    number,
    number,
    number,
    string,
    string
  ][] = [
    [
      "Mango Pulp",
      "Pulp",
      400,
      300,
      300,
      "100% pure Alphonso mango pulp.",
      "/images/product-Amirdh-Mango-pulp.webp",
    ],
    [
      "Mango Pickle",
      "Pickles",
      250,
      180,
      500,
      "Traditional spicy and tangy mango pickle.",
      "/images/Product-showcases_image1-5.webp",
    ],
    [
      "Mango Papad",
      "Papad",
      200,
      150,
      150,
      "Traditional sun-dried mango leather (Aam Papad).",
      "/images/papad.webp",
    ],
    [
      "Alphonso Mango",
      "Fresh Mangoes",
      1200,
      900,
      100,
      "The King of Mangoes from Ratnagiri.",
      "/images/AdobeStock_43300661.jpeg",
    ],
    [
      "Mango Cubes",
      "Cubes",
      350,
      280,
      120,
      "Dehydrated sweet mango cubes, perfect for snacking.",
      "/images/cubes.avif",
    ],
    [
      "Mango Juice",
      "Beverages",
      150,
      110,
      1000,
      "Refreshing natural mango juice.",
      "/images/AdobeStock_1645367592.jpeg",
    ],
    // [
    //   "Dasheri Mango",
    //   "Fresh Mangoes",
    //   500,
    //   350,
    //   200,
    //   "Delicious Dasheri mangoes from Malihabad.",
    //   "/images/dasheri-mango.jpg",
    // ],
    [
      "Mango Gift Box",
      "Gifts",
      2500,
      2000,
      50,
      "Premium assortment of mangoes and treats.",
      "/images/mango_gift.webp",
    ],
    // [
    //   "Mango Jam",
    //   "Jam",
    //   300,
    //   220,
    //   80,
    //   "Sweet and tangy mango jam made from fresh pulp.",
    //   "/images/mango-jam.jpg",
    // ],
    // [
    //   "Kesar Mango",
    //   "Fresh Mangoes",
    //   800,
    //   600,
    //   150,
    //   "Sweet and aromatic Kesar mangoes from Gujarat.",
    //   "/images/kesar-mango.jpg",
    // ],
  ];

  const insertMany = db.transaction((products) => {
    for (const product of products) {
      insertProduct.run(...product);
    }
  });

  insertMany(initialProducts);

  // Seed Coupons
  const insertCoupon = db.prepare(
    "INSERT INTO coupons (code, discount_percent) VALUES (?, ?)"
  );

  insertCoupon.run("MANGO10", 10);
  insertCoupon.run("WHOLESALE20", 20);

  console.log("✅ Initial products and coupons seeded.");
}

export default db;