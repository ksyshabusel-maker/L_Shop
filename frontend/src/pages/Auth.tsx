import { useState } from 'react';
import { shopApi } from '../api/shopApi';

export const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    login: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegister) {
        await shopApi.register(form);
      } else {
        await shopApi.login({ login: form.login, password: form.password });
      }
      window.location.href = '/';
    } catch (error) {
      alert(isRegister ? 'Ошибка регистрации' : 'Неверный логин/пароль');
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ 
      maxWidth: '400px', margin: '4rem auto', 
      padding: '2rem', border: '1px solid #ddd', 
      borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {isRegister ? '👤 Регистрация' : '🔐 Вход'}
      </h1>
      
      <form 
        data-registration
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {isRegister && (
          <>
            <input
              required
              placeholder="👤 Имя"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="📧 Email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            <input
              required
              placeholder="📱 Телефон"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
          </>
        )}
        <input
          required
          placeholder="🔑 Логин"
          value={form.login}
          onChange={e => handleChange('login', e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="🔒 Пароль"
          value={form.password}
          onChange={e => handleChange('password', e.target.value)}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            background: loading ? '#6c757d' : '#007bff',
            color: 'white', padding: '1rem',
            border: 'none', borderRadius: '8px',
            fontSize: '1.1rem', cursor: 'pointer'
          }}
        >
          {loading ? '⏳ Загрузка...' : (isRegister ? 'Создать аккаунт' : 'Войти')}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          type="button" 
          onClick={() => setIsRegister(!isRegister)}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
        </button>
      </p>
    </div>
  );
};