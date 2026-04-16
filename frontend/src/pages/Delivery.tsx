import { useState } from 'react';
import { shopApi } from '../api/shopApi';

export const Delivery = () => {
  const [form, setForm] = useState({
    address: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await shopApi.createOrder(form);
      setSuccess(true);
      setTimeout(() => window.location.href = '/', 2000);
    } catch (error) {
      alert('Ошибка оформления заказа');
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>✅ Заказ успешно оформлен!</h1>
      <p>Перенаправляем на главную...</p>
    </div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📦 Оформление доставки</h1>
      
      <form 
        data-delivery-form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <label>🏠 Адрес доставки:</label>
          <input
            required
            placeholder="ул. Ленина, д. 10, кв. 5"
            value={form.address}
            onChange={e => handleChange('address', e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label>📱 Телефон:</label>
          <input
            required
            type="tel"
            placeholder="+375 (29) 123-45-67"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label>✉️ Email:</label>
          <input
            required
            type="email"
            placeholder="user@example.com"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            background: loading ? '#6c757d' : '#28a745',
            color: 'white',
            padding: '1rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Оформляем...' : '✅ Подтвердить заказ'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/cart" style={{ color: '#007bff' }}>← Назад в корзину</a>
      </div>
    </div>
  );
};