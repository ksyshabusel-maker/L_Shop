import { useState, useEffect } from 'react';
import { shopApi } from '../api/shopApi';
import type { CartItem } from '../types';

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopApi.cart()
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Авторизуйтесь для просмотра корзины');
        window.location.href = '/auth';
        setLoading(false);
      });
  }, []);

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    try {
      await shopApi.updateCart(productId, quantity);
      setCart(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      ));
    } catch (error) {
      alert('Ошибка обновления корзины');
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await shopApi.removeFromCart(productId);
      setCart(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      alert('Ошибка удаления');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛒 Корзина</h1>
      
      {cart.length === 0 ? (
        <p>Корзина пуста. <a href="/">Перейти в каталог</a></p>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '800px' }}>
            {cart.map(item => (
              <div key={item.productId} style={{
                display: 'flex', gap: '1rem', padding: '1rem',
                border: '1px solid #eee', borderRadius: '8px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 data-title="basket">{item.title}</h3>
                  <p data-price="basket">{item.price.toFixed(2)}₽</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.productId)} style={{ color: 'red' }}>🗑️</button>
                </div>
                <strong>{(item.price * item.quantity).toFixed(2)}₽</strong>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '2rem', padding: '1rem', 
            background: '#f8f9fa', borderRadius: '8px', textAlign: 'right'
          }}>
            <h2>Итого: {total.toFixed(2)}₽</h2>
            <a href="/delivery">
              <button style={{
                background: '#28a745', color: 'white', 
                padding: '1rem 2rem', border: 'none', 
                borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer'
              }}>
                🧾 Оформить доставку
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};