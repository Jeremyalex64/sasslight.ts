import { getCloudflareContext } from "@opennextjs/cloudflare";
import { promises as fs } from "fs";
import path from "path";
import type { Product, ProductInput } from "./types";

const STORAGE_KEY = "products";
const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function readFromFile(): Promise<Product[]> {
	try {
		const data = await fs.readFile(DATA_FILE, "utf-8");
		return JSON.parse(data) as Product[];
	} catch {
		return [];
	}
}

async function writeToFile(products: Product[]) {
	await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
	await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
}

async function readFromKV(): Promise<Product[] | null> {
	try {
		const { env } = await getCloudflareContext({ async: true });
		const kv = (env as { PRODUCTS_KV?: KVNamespace }).PRODUCTS_KV;
		if (!kv) return null;

		const data = await kv.get(STORAGE_KEY);
		if (!data) return [];
		return JSON.parse(data) as Product[];
	} catch {
		return null;
	}
}

async function writeToKV(products: Product[]): Promise<boolean> {
	try {
		const { env } = await getCloudflareContext({ async: true });
		const kv = (env as { PRODUCTS_KV?: KVNamespace }).PRODUCTS_KV;
		if (!kv) return false;

		await kv.put(STORAGE_KEY, JSON.stringify(products));
		return true;
	} catch {
		return false;
	}
}

async function getProducts(): Promise<Product[]> {
	const kvProducts = await readFromKV();
	if (kvProducts !== null) return kvProducts;
	return readFromFile();
}

async function saveProducts(products: Product[]) {
	const savedToKV = await writeToKV(products);
	if (!savedToKV) {
		await writeToFile(products);
	}
}

export async function getAllProducts(): Promise<Product[]> {
	const products = await getProducts();
	return products.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);
}

export async function getProductById(id: string): Promise<Product | undefined> {
	const products = await getProducts();
	return products.find((p) => p.id === id);
}

export async function addProduct(input: ProductInput): Promise<Product> {
	const products = await getProducts();
	const product: Product = {
		id: crypto.randomUUID(),
		...input,
		createdAt: new Date().toISOString(),
	};
	products.push(product);
	await saveProducts(products);
	return product;
}

export async function removeProduct(id: string): Promise<boolean> {
	const products = await getProducts();
	const filtered = products.filter((p) => p.id !== id);
	if (filtered.length === products.length) return false;
	await saveProducts(filtered);
	return true;
}
