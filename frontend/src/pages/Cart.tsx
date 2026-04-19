import { useState, useEffect } from 'react';

interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Мок-данные корзины
  useEffect(() => {
    setTimeout(() => {
      setCart([
        { productId: 1, title: "Samsung", price: 1500, quantity: 2 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="cart-empty">
        <div className="loading-spinner">⏳ Загрузка корзины...</div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Корзина</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Корзина пуста</h2>
          <a href="#catalog" className="empty-button">
            Перейти в каталог →
          </a>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.productId} className="cart-item">
                <div className="cart-item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">{item.price.toLocaleString()}₽</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="remove-btn"
                  >
                    🗑 
                  </button>
                </div>
                <div className="item-total">
                  {(item.price * item.quantity).toLocaleString()}₽
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-total">
              <h2>Итого: {total.toLocaleString()}₽</h2>
            </div>
            <a href="#delivery" className="checkout-btn">
              🧾 Оформить доставку
            </a>
          </div>
        </>
      )}
    </div>
  );
};
