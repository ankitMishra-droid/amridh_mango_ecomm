import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

export const userRouter = Router();

// Protect all user routes with requireAuth and requireAdmin
userRouter.use(requireAuth, requireAdmin);

userRouter.get('/', UserController.getAllUsers);
userRouter.put('/:id/role', UserController.updateUserRole);
userRouter.put('/:id', UserController.updateUserInfo);
