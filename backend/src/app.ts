import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/products.routes.js';
import { orderRouter } from './routes/orders.routes.js';
import { cartRouter } from './routes/cart.routes.js';

export const app = express();
app.use(express.json());
app.use('/api', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
