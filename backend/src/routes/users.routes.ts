import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

export const userRouter = Router();

// Profile endpoints (require auth but NOT admin)
userRouter.put('/profile', requireAuth, UserController.updateOwnProfile);
userRouter.post('/profile/addresses', requireAuth, UserController.addAddress);
userRouter.put('/profile/addresses/:addressId', requireAuth, UserController.updateAddress);
userRouter.delete('/profile/addresses/:addressId', requireAuth, UserController.deleteAddress);
userRouter.put('/profile/addresses/:addressId/default', requireAuth, UserController.setDefaultAddress);

// Admin-only routes
userRouter.get('/', requireAuth, requireAdmin, UserController.getAllUsers);
userRouter.post('/admin', requireAuth, requireAdmin, UserController.createAdmin);
userRouter.put('/:id/role', requireAuth, requireAdmin, UserController.updateUserRole);
userRouter.put('/:id', requireAuth, requireAdmin, UserController.updateUserInfo);
