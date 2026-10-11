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

// In-memory storage for local development
let inMemoryProducts: Product[] = [];

export async function getProducts(): Promise<Product[]> {
  try {
    // Check if we're in Cloudflare Workers environment
    // @ts-expect-error - Cloudflare KV binding
    const kv = typeof env !== "undefined" ? env?.PRODUCTS_KV : null;
    if (!kv) {
      console.warn(
        "Cloudflare KV binding not configured, using in-memory storage",
      );
      return inMemoryProducts;
    }
    const products = await kv.get(PRODUCTS_KEY, "json");
    return products || [];
  } catch (error) {
    console.error("Error reading products:", error);
    return inMemoryProducts;
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    // Check if we're in Cloudflare Workers environment
    // @ts-expect-error - Cloudflare KV binding
    const kv = typeof env !== "undefined" ? env?.PRODUCTS_KV : null;
    if (!kv) {
      console.warn("Cloudflare KV not configured, using in-memory storage");
      inMemoryProducts = products;
      return;
    }
    await kv.put(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);
    inMemoryProducts = products;
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
