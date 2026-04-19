import { Router, Request, Response } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "./cart.service";

const router = Router();

router.use(requireAuth);

// GET CART
router.get("/", async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  const cart = await getCart(userId);
  res.json(cart);
});

// ADD TO CART
router.post("/:productId", async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const productIdRaw = req.params.productId;

if (typeof productIdRaw !== "string") {
  return res.status(400).json({ message: "фигня с продукт айди" });
}

const productId = productIdRaw;
  const quantity = Number(req.body.quantity);

  if (!productId) {
    return res.status(400).json({ message: "нет продукт айди" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "неправильное количество" });
  }

  await addToCart(userId, productId, quantity);

  res.json({ ok: true });
});

// UPDATE ITEM
router.put("/:productId", async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const productIdRaw = req.params.productId;

if (typeof productIdRaw !== "string") {
  return res.status(400).json({ message: "invalid productId" });
}

const productId = productIdRaw;
  const quantity = Number(req.body.quantity);

  if (!productId) {
    return res.status(400).json({ message: "нет productId" });
  }

  if (quantity === undefined) {
    return res.status(400).json({ message: "неправильное количество" });
  }

  await updateCartItem(userId, productId, quantity);

  res.json({ ok: true });
});

// DELETE ITEM
router.delete("/:productId", async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const productIdRaw = req.params.productId;

if (typeof productIdRaw !== "string") {
  return res.status(400).json({ message: "invalid productId" });
}

const productId = productIdRaw;

  await removeCartItem(userId, productId);

  res.json({ ok: true });
});

// CLEAR CART
router.delete("/", async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  await clearCart(userId);

  res.json({ ok: true });
});

export default router;