import Database from 'better-sqlite3';
const db = new Database('./mango.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables);

if (tables.some(t => t.name === 'products')) {
  const products = db.prepare("SELECT * FROM products LIMIT 5").all();
  console.log("Sample products:", JSON.stringify(products, null, 2));
}
