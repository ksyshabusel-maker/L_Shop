const fs = require('fs');
const path = require('path');

export class ProductService {
  private productsPath: string;

  constructor() {
    this.productsPath = path.join(__dirname, '../data/products.json');
  }

  private readProducts(): any[] {
    try {
      const data = fs.readFileSync(this.productsPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  getProducts(query: any): any[] {
    let products = this.readProducts();

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      products = products.filter((p: any) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (query.category) {
      products = products.filter((p: any) => p.category === query.category);
    }

    if (query.inStock === 'true') {
      products = products.filter((p: any) => p.inStock === true);
    }

    if (query.sort === 'price_asc') {
      products.sort((a: any, b: any) => a.price - b.price);
    } else if (query.sort === 'price_desc') {
      products.sort((a: any, b: any) => b.price - a.price);
    }

    return products;
  }

  getProductById(id: string): any | null {
    const products = this.readProducts();
    return products.find((p: any) => p.id === id) || null;
  }
}

export default ProductService;