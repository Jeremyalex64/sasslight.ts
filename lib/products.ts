export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  price: string;
  createdAt: string;
}

const PRODUCTS_KEY = "products.json";

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
    // Use R2 for storage (more reliable with OpenNext)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r2 = (globalThis as any).env?.CACHE_BUCKET;
    console.log("R2 binding check:", !!r2);
    if (!r2) {
      console.warn("R2 binding not found, using in-memory storage");
      return getInMemoryProducts();
    }
    const object = await r2.get(PRODUCTS_KEY);
    if (!object) {
      return [];
    }
    const text = await object.text();
    console.log("Products from R2:", text);
    return JSON.parse(text);
  } catch (error) {
    console.error("Error reading products:", error);
    return getInMemoryProducts();
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    // Use R2 for storage (more reliable with OpenNext)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r2 = (globalThis as any).env?.CACHE_BUCKET;
    console.log("R2 binding check for save:", !!r2);
    if (!r2) {
      console.warn("R2 binding not found for save, using in-memory storage");
      setInMemoryProducts(products);
      return;
    }
    await r2.put(PRODUCTS_KEY, JSON.stringify(products), {
      httpMetadata: {
        contentType: "application/json",
      },
    });
    console.log("Products saved to R2");
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
