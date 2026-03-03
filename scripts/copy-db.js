import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '..', 'mango.db');
const netlifyDir = path.resolve(__dirname, '..', 'netlify', 'functions');
const vercelDir = path.resolve(__dirname, '..', 'api');

if (!fs.existsSync(src)) {
  console.error('source database not found at', src);
  process.exit(1);
}

// helper to copy to a destination, creating dirs
function copyTo(dir) {
  const dest = path.join(dir, 'mango.db');
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('copied mango.db to', dest);
}

copyTo(netlifyDir);
copyTo(vercelDir);
