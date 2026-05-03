import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, role = 'customer', phone } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name, role, phone });
      await user.save();

      const payload = { id: user._id, email: user.email, role: user.role, name: user.name };
      const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
      
      res.json({ token, user: payload });
    } catch (error) {
      res.status(500).json({ error: 'Server error during registration' });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, phone, password, username } = req.body;
      const identifier = email || phone || username;
      
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { name: identifier },
          { phone: identifier }
        ]
      });

      if (!user || !(await bcrypt.compare(password, user.password || ''))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const payload = { id: user._id, email: user.email, role: user.role, name: user.name };
      const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
      
      res.json({ token, user: payload });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login' });
    }
  }

  public static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.json({ success: true });
        return;
      }

      const token = crypto.randomBytes(24).toString('hex');
      user.reset_token = token;
      user.reset_expires_at = new Date(Date.now() + 1000 * 60 * 30);
      await user.save();

      res.json({ success: true, resetToken: token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body;
      const user = await User.findOne({ reset_token: token, reset_expires_at: { $gt: new Date() } });
      
      if (!user) {
        res.status(400).json({ error: 'Invalid or expired token' });
        return;
      }

      user.password = await bcrypt.hash(password, 10);
      user.reset_token = undefined;
      user.reset_expires_at = undefined;
      await user.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}
