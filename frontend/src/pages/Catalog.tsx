import { useState, useEffect } from 'react';
import { shopApi } from '../api/shopApi';
import type { Product } from '../types';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: '',
    category: '',
    inStock: false
  });

  useEffect(() => {
    shopApi.products(filters).then(res => setProducts(res.data));
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛍️ Каталог товаров L_Shop</h1>
      
      {/* Фильтры */}
      <div style={{ 
        marginBottom: '2rem', padding: '1rem', 
        border: '1px solid #ddd', borderRadius: '8px' 
      }}>
        <input 
          placeholder="🔍 Поиск по названию/описанию..."
          value={filters.search}
          onChange={e => handleFilterChange('search', e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem', width: '200px' }}
        />
        <select 
          onChange={e => handleFilterChange('sort', e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        >
          <option value="">Сортировка</option>
          <option value="price_asc">💰 По цене (возр.)</option>
          <option value="price_desc">💰 По цене (убыв.)</option>
        </select>
        <label style={{ marginRight: '1rem' }}>
          <input 
            type="checkbox" 
            checked={filters.inStock}
            onChange={e => handleFilterChange('inStock', e.target.checked)}
          /> В наличии
        </label>
      </div>

      {/* Сетка товаров */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {products.length ? (
          products.map(product => (
            <div key={product.id} style={{
              border: '1px solid #eee', borderRadius: '8px', 
              padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 data-title={product.title}>{product.title}</h3>
              <p data-price={product.price.toFixed(2)}>💰 {product.price}₽</p>
              <p>{product.description?.slice(0, 100)}...</p>
              <p>{product.category} | {product.inStock ? '✅ В наличии' : '❌ Нет'}</p>
              <button style={{background: '#007bff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px'}}>
                🛒 В корзину
              </button>
            </div>
          ))
        ) : (
          <p>Товары не найдены. Измените фильтры.</p>
        )}
      </div>
    </div>
  );
};