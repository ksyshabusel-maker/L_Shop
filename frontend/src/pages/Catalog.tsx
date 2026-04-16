import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;  // phone, laptop, audio и т.д.
}
export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setProducts([
    { id: 1, name: "iPhone 16 Pro 256GB", price: 399, image: "/image/ap.jpg", category: "phone" },
    { id: 2, name: "MacBook Air M3 16GB", price: 519, image: "/image/lap.jpg", category: "laptop" },
    { id: 3, name: "AirPods Pro 2", price: 76, image: "/image/n.jpg", category: "audio" },
    { id: 4, name: "iPad Pro 11' M4", price: 306, image: "/image/pl.jpg", category: "tablet" },
    { id: 5, name: "Apple Watch Ultra", price: 275, image: "/image/r.jpg", category: "watch" },
    { id: 6, name: "Samsung Galaxy S25", price: 275, image: "/image/sam.jpg", category: "phone" },
    { id: 7, name: "PS5 Slim 1TB", price: 214, image: "/image/game.jpg", category: "console" },
    { id: 8, name: "RTX 4090 24GB", price: 764, image: "/image/f956ce5c726ede806efaaa08aa6acc9d.jpg", category: "video" },
    { id: 9, name: "Redmi Note 8", price: 400, image: "/image/ntk.jpg", category: "phone" }
  ]);
}, []);
   

  // 🔍 ФИЛЬТРАЦИЯ + ПОИСК + СОРТИРОВКА
  useEffect(() => {
    let result = [...products];

    // Поиск
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Категория
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(result);
  }, [search, category, sortBy, products]);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ ${product.name} добавлен в корзину!`);
  };

  return (
    <div className="catalog-page">
      <h1 className="catalog-title"> Электроника ({filteredProducts.length})</h1>
      
      {/* 🔍 ПОИСК + ФИЛЬТРЫ */}
      <div className="catalog-controls">
        <input
          className="search-input"
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select 
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="phone">📱 Смартфоны</option>
          <option value="laptop">💻 Ноутбуки</option>
          <option value="tablet">📱 Планшеты</option>
          <option value="audio">🎧 Аудио</option>
          <option value="watch">⌚ Часы</option>
          <option value="console">🎮 Консоли</option>
          <option value="video">🖥️ Видеокарты</option>
        </select>

        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="price-asc"> По цене ↑</option>
          <option value="price-desc"> По цене ↓</option>
          <option value="name">🔤 По названию</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const fallback = img.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="image-fallback">📱</div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                {product.price.toLocaleString()} ₽
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                В корзину 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};