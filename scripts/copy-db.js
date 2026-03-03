const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'mango.db');
const destDir = path.resolve(__dirname, '..', 'netlify', 'functions');
const dest = path.join(destDir, 'mango.db');

if (!fs.existsSync(src)) {
  console.error('source database not found at', src);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('copied mango.db to', dest);
