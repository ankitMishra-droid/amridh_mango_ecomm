import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const productRouter = Router();

productRouter.get('/', ProductController.getProducts);
productRouter.post('/', requireAuth, requireAdmin, ProductController.createProduct);
productRouter.put('/:id', requireAuth, requireAdmin, ProductController.updateProduct);
productRouter.delete('/:id', requireAuth, requireAdmin, ProductController.deleteProduct);
