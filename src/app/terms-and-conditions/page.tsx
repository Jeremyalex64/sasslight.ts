import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms & Conditions — SASSLIGHT",
	description: "Terms and conditions for using the SASSLIGHT website.",
};

export default function TermsPage() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
			<h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Terms &amp; Conditions</h1>
			<p className="mt-2 text-sm text-zinc-500">Last updated: July 1, 2026</p>

			<div className="mt-10 space-y-8 text-zinc-600 leading-relaxed dark:text-zinc-400">
				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						1. Acceptance of Terms
					</h2>
					<p className="mt-3">
						By accessing and using the SASSLIGHT website (&quot;the Site&quot;), you agree to be bound
						by these Terms and Conditions. If you do not agree with any part of these terms, please
						do not use the Site.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						2. Use of the Website
					</h2>
					<p className="mt-3">
						SASSLIGHT provides information about third-party products and services through affiliate
						links, primarily via the JVZoo platform. You may browse the Site for personal,
						non-commercial use. You agree not to misuse the Site, attempt unauthorized access, or
						interfere with its normal operation.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						3. Affiliate Links &amp; Third-Party Products
					</h2>
					<p className="mt-3">
						The Site contains affiliate links to third-party products and services. When you click
						these links and make a purchase, SASSLIGHT may earn a commission at no additional cost to
						you. We are not the seller of these products — all purchases are handled by third-party
						vendors through JVZoo or other platforms. Product descriptions, pricing, and availability
						are provided by the respective vendors and may change without notice.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						4. Disclaimer of Warranties
					</h2>
					<p className="mt-3">
						The Site and its content are provided &quot;as is&quot; without warranties of any kind,
						either express or implied. SASSLIGHT does not guarantee the accuracy, completeness, or
						usefulness of any information on the Site. We are not responsible for the quality,
						performance, or results of any third-party products promoted on the Site.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						5. Limitation of Liability
					</h2>
					<p className="mt-3">
						To the fullest extent permitted by law, SASSLIGHT shall not be liable for any direct,
						indirect, incidental, special, or consequential damages arising from your use of the
						Site or any products purchased through affiliate links. Your sole remedy for dissatisfaction
						with a product is to contact the product vendor directly.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						6. Intellectual Property
					</h2>
					<p className="mt-3">
						All content on the Site — including text, graphics, logos, and design — is the property of
						SASSLIGHT and is protected by applicable copyright and trademark laws. You may not
						reproduce, distribute, or create derivative works without our prior written consent.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						7. Changes to Terms
					</h2>
					<p className="mt-3">
						We reserve the right to modify these Terms and Conditions at any time. Changes will be
						posted on this page with an updated revision date. Continued use of the Site after
						changes constitutes acceptance of the revised terms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">8. Contact</h2>
					<p className="mt-3">
						If you have questions about these Terms and Conditions, please contact us at{" "}
						<a href="mailto:support@sasslight.com" className="text-amber-600 hover:text-amber-500">
							support@sasslight.com
						</a>
						.
					</p>
				</section>
			</div>
		</div>
	);
}
