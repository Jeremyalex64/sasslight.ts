import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import NavBrand from "../../components/NavBrand";

export const metadata: Metadata = {
  title: "Contact — SASSLIGHT",
  description: "Get in touch with the SASSLIGHT team.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-zinc-800 bg-black px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <NavBrand size="lg" />
          <h1 className="mt-8 text-3xl font-bold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Have a question, partnership inquiry, or product suggestion?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Send a Message
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-amber-600">Email</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                support@sasslight.com
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-amber-600">Response Time</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                We typically respond within 24–48 business hours.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-amber-600">Partnerships</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Interested in having your JVZoo product featured? Reach out with
                product details and your affiliate offer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
