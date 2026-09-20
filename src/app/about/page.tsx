import type { Metadata } from "next";
import NavBrand from "../../components/NavBrand";

export const metadata: Metadata = {
  title: "About — SASSLIGHT",
  description:
    "Learn about SASSLIGHT and our mission to curate the best JVZoo affiliate products.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-zinc-800 bg-black px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <NavBrand size="lg" />
          <h1 className="mt-8 text-3xl font-bold text-white sm:text-4xl">
            About SASSLIGHT
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Your trusted source for curated JVZoo affiliate products and honest
            recommendations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-8 text-zinc-600 leading-relaxed dark:text-zinc-400">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-amber-600">Who We Are</h2>
            <p className="mt-3">
              SASSLIGHT is an affiliate marketing platform dedicated to helping
              entrepreneurs, marketers, and online business owners discover
              high-quality JVZoo products. We carefully review and curate offers
              so you can spend less time searching and more time growing your
              business.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-amber-600">What We Do</h2>
            <p className="mt-3">
              Our team evaluates products, reviews sales pages, and only
              recommends tools we believe deliver real value. Every product
              featured on SASSLIGHT comes with an honest description and a
              direct affiliate link through JVZoo.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-amber-600">
              Our Mission
            </h2>
            <p className="mt-3">
              To connect our audience with products that solve real problems —
              while maintaining full transparency about our affiliate
              relationships. We believe trust is the foundation of successful
              affiliate marketing.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-400">
              Affiliate Disclosure
            </h2>
            <p className="mt-3 text-amber-900/80 dark:text-amber-200/80">
              SASSLIGHT participates in the JVZoo affiliate program. When you
              click a product link and make a purchase, we may earn a commission
              at no additional cost to you. This helps us keep the site running
              and continue providing valuable content to our community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
