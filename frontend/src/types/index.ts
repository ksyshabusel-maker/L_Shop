export interface User {
  id: number;
  name: string;
  email: string;
  login: string;
  phone: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
}

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}