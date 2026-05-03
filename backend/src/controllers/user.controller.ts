import { Request, Response } from 'express';
import { User } from '../models/User.js';

export class UserController {
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find().select('-password -reset_token -reset_expires_at');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  public static async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      
      if (!['admin', 'customer'].includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
      }

      const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user role' });
    }
  }

  public static async updateUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      // Ensure we don't duplicate email if someone else has it
      if (email) {
        const existing = await User.findOne({ email, _id: { $ne: id } });
        if (existing) {
          res.status(400).json({ error: 'Email already in use by another user' });
          return;
        }
      }

      const user = await User.findByIdAndUpdate(
        id, 
        { name, email, phone }, 
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user info' });
    }
  }
}
