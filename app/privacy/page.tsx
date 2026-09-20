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
  title: "Privacy Policy - Sasslight",
  description:
    "Read Sasslight's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-3">
                We collect information you provide directly, such as when you
                create an account, contact us, or interact with our services.
                This may include your name, email address, and other contact
                information.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, and other contact details you provide when
                  communicating with us
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our
                  website, including pages visited, time spent, and click
                  patterns
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, and device identifiers
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> Data collected through
                  cookies and similar tracking technologies
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-3">
                We use the information we collect to provide, maintain, and
                improve our services, to communicate with you, and to comply
                with legal obligations.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  To provide and maintain our affiliate marketing platform
                </li>
                <li>
                  To process transactions and send you related information
                </li>
                <li>To send you technical notices and support messages</li>
                <li>
                  To respond to your comments, questions, and customer service
                  requests
                </li>
                <li>
                  To monitor and analyze trends, usage, and activities in
                  connection with our services
                </li>
                <li>
                  To detect, prevent, and address technical issues and fraud
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 mb-3">
                We do not sell your personal information. We may share your
                information with third-party service providers who assist us in
                operating our website.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Service Providers:</strong> We may share information
                  with trusted third parties who perform services on our behalf
                  (e.g., hosting, analytics, customer support)
                </li>
                <li>
                  <strong>Affiliate Partners:</strong> When you click on
                  affiliate links, we may share limited information with the
                  respective product vendors
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required by law or to protect our rights,
                  property, or safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of assets, user information may be
                  transferred
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Cookies
              </h2>
              <p className="text-gray-600 mb-3">
                We use cookies and similar technologies to collect information
                about your browsing activities. You can control cookie settings
                through your browser preferences.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function properly
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors use our website
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to track visitors
                  across websites to display relevant advertisements
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-600 mb-3">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration, or
                disclosure.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and databases with access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection practices</li>
                <li>
                  Limited access to personal information on a need-to-know basis
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-600 mb-3">
                You have the right to access, correct, or delete your personal
                information. Contact us to exercise these rights.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of the personal data
                  we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  data (subject to legal requirements)
                </li>
                <li>
                  <strong>Opt-out:</strong> Opt-out of marketing communications
                  at any time
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another service
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your
                  personal data
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 mb-3">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this
                page.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  We will notify users of significant changes via email or
                  website notice
                </li>
                <li>
                  The date of the last revision will be indicated at the top of
                  this policy
                </li>
                <li>
                  Continued use of the website after changes constitutes
                  acceptance
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 mb-3">
                If you have any questions about this Privacy Policy, please
                contact us through our contact page.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Email: privacy@sasslight.com</li>
                <li>Contact Form: Available on our Contact page</li>
                <li>
                  Response Time: We typically respond within 5 business days
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
