const DeliveryService = require('../services/delivery.service');

class DeliveryController {
  private deliveryService: any;

  constructor() {
    this.deliveryService = new DeliveryService();
  }

  createOrder = async (req: any, res: any) => {
    try {
      const userId = req.cookies.userId;
      
      if (!userId) {
        res.status(401).json({ error: 'Не авторизован' });
        return;
      }

      const deliveryData = req.body;
      
      if (!deliveryData.address || !deliveryData.phone || !deliveryData.email) {
        res.status(400).json({ error: 'Все поля обязательны' });
        return;
      }

      const cartResponse = await fetch('http://localhost:3000/api/cart', {
        headers: { Cookie: req.headers.cookie }
      });
      const cart = await cartResponse.json();

      if (!cart.items || cart.items.length === 0) {
        res.status(400).json({ error: 'Корзина пуста' });
        return;
      }

      const cartItems = cart.items.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        title: item.title
      }));

      const order = this.deliveryService.createOrder(userId, deliveryData, cartItems);
      
      await fetch('http://localhost:3000/api/cart', {
        method: 'DELETE',
        headers: { Cookie: req.headers.cookie }
      });

      res.json({ orderId: order.id, message: 'Заказ оформлен' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при оформлении заказа' });
    }
  };

  getOrders = (req: any, res: any) => {
    try {
      const userId = req.cookies.userId;
      
      if (!userId) {
        res.status(401).json({ error: 'Не авторизован' });
        return;
      }

      const orders = this.deliveryService.getOrdersByUser(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
  };
}

module.exports = DeliveryController;