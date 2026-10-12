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

// Lazy-loaded in-memory storage
let _inMemoryProducts: Product[] | null = null;

function getInMemoryProducts(): Product[] {
  if (_inMemoryProducts === null) {
    _inMemoryProducts = [];
  }
  return _inMemoryProducts;
}

function setInMemoryProducts(products: Product[]): void {
  _inMemoryProducts = products;
}

export async function getProducts(): Promise<Product[]> {
  try {
    // Check if we're in Cloudflare Workers environment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kv = (globalThis as any).env?.PRODUCTS_KV;
    if (!kv) {
      return getInMemoryProducts();
    }
    const products = await kv.get(PRODUCTS_KEY, "json");
    return products || [];
  } catch (error) {
    console.error("Error reading products:", error);
    return getInMemoryProducts();
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    // Check if we're in Cloudflare Workers environment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kv = (globalThis as any).env?.PRODUCTS_KV;
    if (!kv) {
      setInMemoryProducts(products);
      return;
    }
    await kv.put(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);
    setInMemoryProducts(products);
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
