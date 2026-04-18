import { readJson, writeJson } from "../../utils/fileDb";
import { Product, Cart, CartResponse, CartResponseItem } from "../../shared/types"; 

const CARTS_PATH = "data/carts.json";
const PRODUCTS_PATH = "data/products.json";

async function getAll() {
  return readJson<Cart[]>(CARTS_PATH);
}

async function saveAll(carts: Cart[]) {
  await writeJson(CARTS_PATH, carts);
}

function mapCart(cart: Cart, products: Product[]): CartResponse {
  const items: CartResponseItem[] = cart.items
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity
      };
    })
    .filter((i): i is CartResponseItem => i !== null);

  const total = items.reduce((sum, i) => {
    return sum + i.price * i.quantity;
  }, 0);

  return { items, total };
}
export async function getCart(userId: string) {
  const carts = await getAll();
  let products: Product[] = [];

try {
  products = await readJson<Product[]>(PRODUCTS_PATH);
} catch {
  products = [];
}

  const cart = carts.find(c => c.userId === userId);

  if (!cart) return { items: [], total: 0 };

  return mapCart(cart, products);
}

export async function addToCart(userId: string, productId: string, quantity: number) {
  const carts = await getAll();

  let cart = carts.find(c => c.userId === userId);

  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }

  const item = cart.items.find(i => i.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await saveAll(carts);
}

export async function updateCartItem(userId: string, productId: string, quantity: number) {
  const carts = await getAll();

  const cart = carts.find(c => c.userId === userId);
  if (!cart) return;

  const item = cart.items.find(i => i.productId === productId);
  if (!item) return;

  if (quantity <= 0) {
    cart.items = cart.items.filter(i => i.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  await saveAll(carts);
}

export async function removeCartItem(userId: string, productId: string) {
  const carts = await getAll();

  const cart = carts.find(c => c.userId === userId);
  if (!cart) return;

  cart.items = cart.items.filter(i => i.productId !== productId);

  await saveAll(carts);
}

export async function clearCart(userId: string) {
  const carts = await getAll();

  const cart = carts.find(c => c.userId === userId);
  if (!cart) return;

  cart.items = [];

  await saveAll(carts);
}