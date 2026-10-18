import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  price: string;
  categories: string[];
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

// Initialize S3 client for R2
function getS3Client() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accountId =
    (globalThis as any).env?.CLOUDFLARE_ACCOUNT_ID ||
    process.env.CLOUDFLARE_ACCOUNT_ID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessKeyId =
    (globalThis as any).env?.R2_API_ACCESS_KEY_ID ||
    process.env.R2_API_ACCESS_KEY_ID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secretAccessKey =
    (globalThis as any).env?.R2_API_SECRET_ACCESS_KEY ||
    process.env.R2_API_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.warn("R2 credentials not found, using in-memory storage");
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function getProducts(): Promise<Product[]> {
  try {
    const s3 = getS3Client();
    if (!s3) {
      return getInMemoryProducts();
    }

    const command = new GetObjectCommand({
      Bucket: "sasslight2",
      Key: PRODUCTS_KEY,
    });

    const response = await s3.send(command);
    const text = await response.Body?.transformToString();
    console.log("Products from R2:", text);
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Error reading products:", error);
    return getInMemoryProducts();
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    const s3 = getS3Client();
    if (!s3) {
      setInMemoryProducts(products);
      return;
    }

    const command = new PutObjectCommand({
      Bucket: "sasslight2",
      Key: PRODUCTS_KEY,
      Body: JSON.stringify(products),
      ContentType: "application/json",
    });

    await s3.send(command);
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
