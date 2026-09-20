import { getAllProducts } from "../lib/products";
import ProductGrid from "../components/ProductGrid";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <section className="bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-400 sm:text-5xl">
            Curated JVZoo Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Hand-picked affiliate offers to help you find the best tools,
            courses, and software for your business.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Featured Products
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
