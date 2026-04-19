import { Request, Response, NextFunction } from "express";
import { getUserId } from "../utils/auth";

export interface AuthRequest extends Request {
  userId: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.sessionId;

  const userId = getUserId(sessionId);

  if (!userId) {
    return res.status(401).json({ message: "нет тебя в моем списке" });
  }

  (req as AuthRequest).userId = userId;

  next();
}