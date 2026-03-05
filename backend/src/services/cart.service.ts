import * as fs from 'fs';
import * as path from 'path';
import { Cart, CartItem } from '../types/cart.types';
export class CartService {
  private filePath: string;
  constructor() {
    this.filePath = path.join(__dirname, '../data/cart.json');
  }
  private readCarts(): Cart[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  private writeCarts(carts: Cart[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
  }
  getCart(userId: string): Cart {
    const carts = this.readCarts();
    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
      return { userId, items: [] };
    }
    return cart;
  }
  addToCart(userId: string, productId: string): Cart {
    const carts = this.readCarts();
    let cart = carts.find(c => c.userId === userId);
    if (!cart) {
      cart = { userId, items: [] };
      carts.push(cart);
    }
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
    this.writeCarts(carts);
    return cart;
  }
  removeOneFromCart(userId: string, productId: string): Cart {
    const carts = this.readCarts();
    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
      return { userId, items: [] };
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex !== -1) {
      const item = cart.items[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    }
    this.writeCarts(carts);
    return cart;
  }
  removeFromCart(userId: string, productId: string): Cart {
    const carts = this.readCarts();
    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
      return { userId, items: [] };
    }
    cart.items = cart.items.filter(item => item.productId !== productId);
    this.writeCarts(carts);
    return cart;
  }
  clearCart(userId: string): Cart {
    const carts = this.readCarts();
    const cart = carts.find(c => c.userId === userId);
    if (cart) {
      cart.items = [];
      this.writeCarts(carts);
    }
    return { userId, items: [] };
  }
}