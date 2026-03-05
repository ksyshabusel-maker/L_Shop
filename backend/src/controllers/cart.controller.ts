import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
export class CartController {
  private cartService: CartService;
  constructor() {
    this.cartService = new CartService();
  }
  getCart = (req: Request, res: Response): void => {
    try {
      const userId = req.cookies.userId || 'guest_' + Date.now(); 
      const cart = this.cartService.getCart(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении корзины' });
    }
  };
  addToCart = (req: Request, res: Response): void => {
    try {
      const userId = req.cookies.userId || 'guest_' + Date.now();
      const { productId } = req.body;
      if (!productId) {
        res.status(400).json({ error: 'Не указан товар' });
        return;
      }
      const cart = this.cartService.addToCart(userId, productId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при добавлении товара' });
    }
  };
  removeOneFromCart = (req: Request, res: Response): void => {
    try {
      const userId = req.cookies.userId || 'guest_' + Date.now();
      const { productId } = req.body;
      if (!productId) {
        res.status(400).json({ error: 'Не указан товар' });
        return;
      }
      const cart = this.cartService.removeOneFromCart(userId, productId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при удалении товара' });
    }
  };
  removeFromCart = (req: Request, res: Response): void => {
    try {
      const userId = req.cookies.userId || 'guest_' + Date.now();
      const productId = String(req.params.productId);
      const cart = this.cartService.removeFromCart(userId, productId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при удалении товара' });
    }
  };
  clearCart = (req: Request, res: Response): void => {
    try {
      const userId = req.cookies.userId || 'guest_' + Date.now();
      const cart = this.cartService.clearCart(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при очистке корзины' });
    }
  };
}