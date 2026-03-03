import type { Handler } from '@netlify/functions';
import Database from 'better-sqlite3';
import path from 'path';

// open the same database file that your local server uses
// keep in mind that Netlify Functions run in a read-only filesystem
// except for /tmp; writes will be lost between cold starts.
const dbPath = path.join(__dirname, '..', '..', 'mango.db');
const db = new Database(dbPath, { readonly: true });
console.log('products function starting, dbPath =', dbPath, 'exists?', require('fs').existsSync(dbPath));

export const handler: Handler = async (event) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products),
    };
  } catch (err: any) {
    console.error('database query failed', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'unknown error' }),
    };
  }
};