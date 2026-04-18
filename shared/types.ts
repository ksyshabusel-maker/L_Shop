export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
}

export interface ProductsQuery {
  search?: string;
  sort?: 'price_asc' | 'price_desc';
  category?: string;
  inStock?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
}

export interface Order {
  id: string;
  userId: string;
  deliveryAddress: string;
  phone: string;
  email: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface DeliveryRequest {
  address: string;
  phone: string;
  email: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}