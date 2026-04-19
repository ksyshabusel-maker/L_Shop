import { randomUUID } from "crypto";

const sessions = new Map<string, string>(); 

export function createSession(userId: string) {
  const sessionId = randomUUID();
  sessions.set(sessionId, userId);
  return sessionId;
}

export function getUserId(sessionId?: string) {
  if (!sessionId) return null;
  return sessions.get(sessionId) || null;
}

export function deleteSession(sessionId?: string) {
  if (!sessionId) return;
  sessions.delete(sessionId);
}