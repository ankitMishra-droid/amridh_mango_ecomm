import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/products.routes.js';
import { orderRouter } from './routes/orders.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import uploadRouter from './routes/upload.routes.js';
import { userRouter } from './routes/users.routes.js';

export const app = express();

const corsOptions = {
  origin: [env.frontendUrl, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/users', userRouter);
