import type { VercelRequest, VercelResponse } from '@vercel/node';
import Database from 'better-sqlite3';
import path from 'path';

// open the database file that was copied into the api folder
const dbPath = path.join(process.cwd(), 'api', 'mango.db');
console.log('vercel products function starting, dbPath =', dbPath);

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const db = new Database(dbPath, { readonly: true });
    const products = db.prepare('SELECT * FROM products').all();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(products));
  } catch (err: any) {
    console.error('database query failed', err);
    res.status(500).json({ error: err.message || 'unknown error' });
  }
}
