const fs = require('fs');
const path = require('path');

export class DeliveryService {
  private ordersPath: string;

  constructor() {
    this.ordersPath = path.join(__dirname, '../data/orders.json');
  }

  private readOrders(): any[] {
    try {
      const data = fs.readFileSync(this.ordersPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private writeOrders(orders: any[]): void {
    fs.writeFileSync(this.ordersPath, JSON.stringify(orders, null, 2));
  }

  createOrder(userId: string, deliveryData: any, cartItems: any[]): any {
    const orders = this.readOrders();
    
    const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
      id: Date.now().toString(),
      userId: userId,
      deliveryAddress: deliveryData.address,
      phone: deliveryData.phone,
      email: deliveryData.email,
      items: cartItems,
      total: total,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    orders.push(newOrder);
    this.writeOrders(orders);
    
    return newOrder;
  }

  getOrdersByUser(userId: string): any[] {
    const orders = this.readOrders();
    return orders.filter((o: any) => o.userId === userId);
  }
}

export default DeliveryService;
