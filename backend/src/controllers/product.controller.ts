const ProductService = require('../services/product.service');

class ProductController {
  private productService: any;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = (req: any, res: any) => {
    try {
      const query = {
        search: req.query.search,
        sort: req.query.sort,
        category: req.query.category,
        inStock: req.query.inStock
      };
      const products = this.productService.getProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении товаров' });
    }
  };

  getProductById = (req: any, res: any) => {
    try {
      const { id } = req.params;
      const product = this.productService.getProductById(id);
      if (!product) {
        res.status(404).json({ error: 'Товар не найден' });
        return;
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении товара' });
    }
  };
}

module.exports = ProductController;