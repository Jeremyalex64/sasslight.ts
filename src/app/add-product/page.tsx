import type { Metadata } from "next";
import AdminProductForm from "../../components/AdminProductForm";

export const metadata: Metadata = {
  title: "Add Product — SassLight Admin",
};

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Add JVZoo Product
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Fill in the product details and your JVZoo affiliate link.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <AdminProductForm />
      </div>
    </div>
  );
}
