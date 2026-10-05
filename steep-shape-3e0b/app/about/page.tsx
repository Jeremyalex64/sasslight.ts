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

export const metadata: Metadata = {
  title: "About Us - Sasslight",
  description:
    "Learn about Sasslight and our mission to provide the best affiliate products and exclusive deals.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            About Sasslight
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600">
                At Sasslight, we are dedicated to connecting you with the best
                digital products and software solutions. Our platform curates
                high-quality affiliate products that help businesses and
                individuals succeed in the digital landscape.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What We Do
              </h2>
              <p className="text-gray-600">
                We partner with leading software vendors and digital product
                creators to bring you exclusive deals and trusted
                recommendations. Our team carefully evaluates each product to
                ensure it meets our quality standards before featuring it on our
                platform.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Values
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Quality:</strong> We only recommend products we
                  believe in
                </li>
                <li>
                  <strong>Transparency:</strong> We clearly disclose our
                  affiliate relationships
                </li>
                <li>
                  <strong>Trust:</strong> Your satisfaction is our top priority
                </li>
                <li>
                  <strong>Innovation:</strong> We stay ahead of digital trends
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600">
                With years of experience in the digital products space, our team
                has the expertise to guide you to the right solutions. We save
                you time by doing the research and provide honest reviews to
                help you make informed decisions.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600">
                Have questions or want to learn more? We'd love to hear from
                you. Visit our contact page to reach out to our team.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
