import { useState, useEffect } from 'react';
import { shopApi } from '../api/shopApi';
import type { User } from '../types';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Проверка авторизации
    shopApi.me()
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    shopApi.logout().then(() => {
      setUser(null);
      window.location.href = '/';
    });
  };

  return (
    <header style={{
      background: '#333', color: 'white', 
      padding: '1rem', display: 'flex', justifyContent: 'space-between'
    }}>
      <h1 style={{margin: 0}}>
        <a href="/" style={{color: 'white', textDecoration: 'none'}}>L_Shop</a>
      </h1>
      
      <nav>
        <a href="/" style={{margin: '0 1rem', color: 'white'}}>Каталог</a>
        <a href="/cart" style={{margin: '0 1rem', color: 'white'}}>
          Корзина ({cartCount})
        </a>
        {user ? (
          <span>
            {user.name} | <button onClick={logout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>Выйти</button>
          </span>
        ) : (
          <a href="/auth" style={{color: 'white'}}>Войти</a>
        )}
      </nav>
    </header>
  );
};