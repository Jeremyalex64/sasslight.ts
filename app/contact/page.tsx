import { Metadata } from "next";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: true,
  loading: () => <nav className="h-16 bg-white shadow-sm" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-gray-900" />,
});

const ContactForm = dynamic(() => import("../components/ContactForm"), {
  loading: () => (
    <div className="text-center py-12">
      <p className="text-gray-500">Loading form...</p>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Contact Us - Sasslight",
  description:
    "Get in touch with the Sasslight team. We'd love to hear from you about our affiliate products and services.",
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
