import axios from 'axios';
import type { User, Product, CartItem } from '../types';

const api = axios.create({ baseURL: '/api' });

export const shopApi = {
  // 🔐 Авторизация
  register: (data: { name: string; email: string; login: string; phone: string; password: string }) =>
    api.post<User>('/auth/register', data),
  login: (data: { login: string; password: string }) =>
    api.post<User>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get<User>('/auth/me'),

  // 🛒 Продукты
  products: (params: { search?: string; sort?: string; category?: string; inStock?: boolean }) =>
    api.get<Product[]>('/products', { params }),

  // 🛍️ Корзина
  cart: () => api.get<CartItem[]>('/cart'),
  addToCart: (productId: number, quantity: number) =>
    api.post(`/cart/${productId}`, { quantity }),
  updateCart: (productId: number, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId: number) => api.delete(`/cart/${productId}`),

  // 📦 Доставка
  createOrder: (data: { address: string; phone: string; email: string }) =>
    api.post('/delivery/order', data)
};