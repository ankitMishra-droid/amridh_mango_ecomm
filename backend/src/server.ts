import { app } from './app.js';
import { env } from './config/env.js';
import './db/database.js';

app.listen(env.port, () => console.log(`API running on :${env.port}`));
