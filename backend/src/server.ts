import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB } from './db/database.js';

connectDB().then(() => {
  app.listen(env.port, () => console.log(`API running on :${env.port}`));
});
