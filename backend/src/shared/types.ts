export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl: string;
}

//
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface CartResponseItem extends Product {
  quantity: number;
}
export interface CartResponse {
  items: CartResponseItem[];
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}