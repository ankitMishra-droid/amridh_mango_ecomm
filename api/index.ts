import { app } from '../backend/src/app.js';
import { connectDB } from '../backend/src/db/database.js';

let isConnected = false;

// Connect to DB once when the Vercel serverless function cold-starts
const initialize = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Export the express app wrapped with the initializer
export default async (req: any, res: any) => {
  await initialize();
  return app(req, res);
};
