import { Router } from "express";
import { register, login, getMe } from "./auth.service";
import { deleteSession, getUserId } from "../../utils/auth";
import { requireAuth } from "./auth.middleware";

const router = Router();

router.post("/register", async (req, res) => {
  console.log("RAW BODY:", req.body);
  try {
    const result = await register(req.body);
    res.cookie("sessionId", result.sessionId, {
  httpOnly: true,
  maxAge: 600000 
});

    res.json({ user: result.user });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);

    res.cookie("sessionId", result.sessionId, {
  httpOnly: true,
  maxAge: 600000 
});

    res.json({ user: result.user });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/logout", (req, res) => {
  const sessionId = req.cookies?.sessionId;

  if (sessionId) {
  deleteSession(sessionId);
}
  res.clearCookie("sessionId");

  res.json({ ok: true });
});

router.get("/me", requireAuth, async (req, res) => {
  const userId = res.locals.userId;

  const user = await getMe(userId);

  res.json(user);
});

export default router;
