import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface JwtUser { id: string; role: 'admin' | 'customer'; email: string; name?: string }

export function requireAuth(req: Request & { user?: JwtUser }, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(bearer.slice(7), env.jwtSecret) as JwtUser;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireAdmin(req: Request & { user?: JwtUser }, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}
