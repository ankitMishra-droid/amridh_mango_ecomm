import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const orderRouter = Router();

orderRouter.post('/', requireAuth, OrderController.createOrder);
orderRouter.get('/', requireAuth, OrderController.getOrders);
orderRouter.patch('/:id/status', requireAuth, requireAdmin, OrderController.updateOrderStatus);
