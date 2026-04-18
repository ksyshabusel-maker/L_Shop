import { Request, Response, NextFunction } from "express";
import { getUserId } from "../../utils/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.sessionId;
  const userId = getUserId(sessionId);

  if (!userId) {
    return res.status(401).json({ message: "не авторизован" });
  }

  res.locals.userId = userId;

  next();
}