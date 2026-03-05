export interface Delivery {
  id?: string
  userId: string
  items: { productId: string; quantity: number }[]
  address: string
  phone: string
  email: string
  paymentMethod: string
  createdAt?: Date
}