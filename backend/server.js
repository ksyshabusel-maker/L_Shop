// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs").promises;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cors")());

// Базовый массив товаров (для старта храним тут)
let products = [];

// Функция загрузки данных из JSON-файла
async function loadProducts() {
  try {
    const rawdata = await fs.readFile("./products.json", "utf8");
    products = JSON.parse(rawdata);
  } catch (err) {
    console.error(err);
  }
}

// Читаем данные при старте сервера
loadProducts();

// Роуты API
app.get("/products", async (req, res) => {
  let result = products.slice();

  // Фильтрация по категориям
  if (req.query.category) {
    result = result.filter((item) => item.category.includes(req.query.category));
  }

  // Поиск по названию и описанию
  if (req.query.search) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(req.query.search.toLowerCase()) ||
      item.description.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Фильтрация по доступности
  if (req.query.available === "true") {
    result = result.filter((item) => item.available === true);
  }

  // Сортировка по цене
  if (req.query.sort === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  res.json(result);
});

// Сервер слушает запросы
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});