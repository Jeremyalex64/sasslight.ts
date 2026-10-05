import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("Upstash Redis credentials not configured");
    return null;
  }

  return new Redis({ url, token });
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  price: string;
  createdAt: string;
}

const PRODUCTS_KEY = "products";

export async function getProducts(): Promise<Product[]> {
  try {
    const redis = getRedis();
    if (!redis) return [];
    const products = await redis.get<Product[]>(PRODUCTS_KEY);
    return products || [];
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    const redis = getRedis();
    if (!redis) throw new Error("Redis not configured");
    await redis.set(PRODUCTS_KEY, products);
  } catch (error) {
    console.error("Error saving products:", error);
    throw error;
  }
}

export async function addProduct(
  product: Omit<Product, "id" | "createdAt">,
): Promise<Product> {
  const products = await getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  await saveProducts(products);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await saveProducts(filtered);
  return true;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>,
): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  await saveProducts(products);
  return products[index];
}
