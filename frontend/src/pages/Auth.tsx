import { useState } from 'react';

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
    
    // Мок авторизация
    setTimeout(() => {
      alert(isRegister ? '✅ Регистрация успешна!' : '✅ Вход выполнен!');
      window.location.hash = '#catalog';
      setLoading(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          {isRegister ? '👤 Регистрация' : '🔐 Вход'}
        </h1>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                className="auth-input"
                placeholder="👤 Имя"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                required
              />
              <input
                className="auth-input"
                type="email"
                placeholder="📧 Email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                required
              />
              <input
                className="auth-input"
                placeholder="📱 Телефон"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                required
              />
            </>
          )}
          <input
            className="auth-input"
            placeholder="🔑 Логин"
            value={form.login}
            onChange={e => handleChange('login', e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="🔒 Пароль"
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            required
          />
          
          <button 
            className={`auth-button ${loading ? 'loading' : ''}`}
            type="submit" 
            disabled={loading}
          >
            {loading ? '⏳ Загрузка...' : (isRegister ? 'Создать аккаунт' : 'Войти')}
          </button>
        </form>

        <p className="auth-toggle">
          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)}
            className="toggle-link"
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
          </button>
        </p>
      </div>
    </div>
  );
};