import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const productsFile = path.join(dataDir, "products.json");

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  price: string;
  createdAt: string;
}

export function getProducts(): Product[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(productsFile)) {
      fs.writeFileSync(productsFile, "[]");
      return [];
    }
    const data = fs.readFileSync(productsFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error("Error saving products:", error);
    throw error;
  }
}

export function addProduct(
  product: Omit<Product, "id" | "createdAt">,
): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

export function updateProduct(
  id: string,
  updates: Partial<Product>,
): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}
