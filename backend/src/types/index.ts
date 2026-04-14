export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  deliveryAddress: string;
  phone: string;
  email: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: string;
}