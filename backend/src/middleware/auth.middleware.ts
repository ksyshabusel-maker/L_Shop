import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const userId = req.cookies.userId;
  
  if (!userId) {
    res.status(401).json({ error: 'Не авторизован' });
    return;
  }

  req.userId = userId;
  next();
}
export default authMiddleware;
