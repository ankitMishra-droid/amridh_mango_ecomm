import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.js';

export const cartRouter = Router();

cartRouter.use(requireAuth);

cartRouter.get('/', CartController.getCart);
cartRouter.post('/item', CartController.addToCart);
cartRouter.delete('/item/:productId', CartController.removeFromCart);
