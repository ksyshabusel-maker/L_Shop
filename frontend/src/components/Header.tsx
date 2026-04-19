import { useState, useEffect } from 'react';
import type { User } from '../types';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginInput, setLoginInput] = useState('');

  useEffect(() => {
    const mockUserString = localStorage.getItem('user');
    if (mockUserString) {
      setUser(JSON.parse(mockUserString));
    }
  }, []);

  const loginUser = () => {
    if (!loginInput.trim()) return;
    
    const newUser: User = {
      id: Date.now(),
      name: loginInput.trim(),
      email: `${loginInput.toLowerCase()}@example.com`,
      login: loginInput.toLowerCase().replace(/\s+/g, '_'),
      phone: '+375 (29) 000-00-00'
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setShowAuthModal(false);
    setLoginInput('');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <header className="header">
        <nav className="header-nav">
          {/* ЛОГО ЛЕВАЯ БЕЛОЕ */}
          <a href="#catalog" className="logo">
            <h2>TechShop</h2>
          </a>

          {/* КОРЗИНА ЦЕНТР БЕЛОЕ */}
          <div className="header-center">
            <a href="#cart" className="cart-link">
              🛒 Корзина <span className="cart-badge">3</span>
            </a>
          </div>

          {/* ПРАВАЯ ВХОД БЕЛОЕ */}
          <div className="header-right">
            {user ? (
              <div className="user-menu">
                👋 <strong>{user.name}</strong>
                <button onClick={logout} className="logout-btn">
                  Выйти
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="login-btn"
              >
                🔐 Войти
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* МОДАЛЬНОЕ ОКНО ВВОДА */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <h3>🔐 Вход в личный кабинет</h3>
            <input
              className="modal-input"
              placeholder="Введите ваше имя"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              autoFocus
            />
            <div className="modal-buttons">
              <button onClick={loginUser} className="modal-confirm">
                Войти
              </button>
              <button 
                onClick={() => setShowAuthModal(false)} 
                className="modal-cancel"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};