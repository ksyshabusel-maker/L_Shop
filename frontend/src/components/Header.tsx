import { useState, useEffect } from 'react';
import { shopApi } from '../api/shopApi';
import type { User } from '../types';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [cartCount, setCartCount] = useState(0);  // ← Пока закомментировано

  useEffect(() => {
    shopApi.me().then(res => setUser(res.data)).catch(() => setUser(null));
  }, []);

  const logout = () => {
    shopApi.logout().then(() => {
      setUser(null);
      window.location.href = '/';
    });
  };

  return (
    <header style={{background: '#333', color: 'white', padding: '1rem'}}>
      <nav style={{display: 'flex', gap: '1rem'}}>
        <a href="/" style={{color: 'white'}}>🏠 Главная</a>
        <a href="/cart" style={{color: 'white'}}>🛒 Корзина</a>
        {user ? (
          <>
            👋 {user.name} <button onClick={logout} style={{color: 'orange'}}>Выйти</button>
          </>
        ) : (
          <a href="/auth" style={{color: 'white'}}>🔐 Войти</a>
        )}
      </nav>
    </header>
  );
};