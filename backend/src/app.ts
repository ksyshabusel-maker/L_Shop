const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const products = [
  { id: '1', title: 'Ноутбук Apple MacBook Air 13', description: 'M1, 8GB RAM, 256GB SSD', price: 99900, category: 'ноутбуки', inStock: true },
  { id: '2', title: 'Смартфон iPhone 15', description: '128GB, черный', price: 79900, category: 'смартфоны', inStock: true },
  { id: '3', title: 'Наушники Sony WH-1000XM5', description: 'Беспроводные, шумоподавление', price: 34900, category: 'аксессуары', inStock: true }
];


app.get('/api/products', (req: any, res: any) => {
  let result = [...products];

  if (req.query.search) {
    const searchLower = req.query.search.toLowerCase();
    result = result.filter((p: any) => 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }

  if (req.query.category) {
    result = result.filter((p: any) => p.category === req.query.category);
  }

  if (req.query.inStock === 'true') {
    result = result.filter((p: any) => p.inStock === true);
  }

  if (req.query.sort === 'price_asc') {
    result.sort((a: any, b: any) => a.price - b.price);
  } else if (req.query.sort === 'price_desc') {
    result.sort((a: any, b: any) => b.price - a.price);
  }

  res.json(result);
});


app.get('/api/products/:id', (req: any, res: any) => {
  const product = products.find((p: any) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Товар не найден' });
    return;
  }
  res.json(product);
});


app.post('/api/delivery/order', (req: any, res: any) => {
  const userId = req.cookies.userId;
  
  if (!userId) {
    res.status(401).json({ error: 'Не авторизован' });
    return;
  }

  const { address, phone, email } = req.body;
  
  if (!address || !phone || !email) {
    res.status(400).json({ error: 'Все поля обязательны' });
    return;
  }

  res.json({ orderId: Date.now().toString(), message: 'Заказ оформлен' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});