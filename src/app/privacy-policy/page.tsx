import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy — SASSLIGHT",
	description: "Privacy policy for the SASSLIGHT website.",
};

export default function PrivacyPage() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
			<h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Privacy Policy</h1>
			<p className="mt-2 text-sm text-zinc-500">Last updated: July 1, 2026</p>

			<div className="mt-10 space-y-8 text-zinc-600 leading-relaxed dark:text-zinc-400">
				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">1. Introduction</h2>
					<p className="mt-3">
						SASSLIGHT (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This
						Privacy Policy explains how we collect, use, and protect information when you visit our
						website.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						2. Information We Collect
					</h2>
					<p className="mt-3">We may collect the following types of information:</p>
					<ul className="mt-3 list-disc space-y-2 pl-6">
						<li>
							<strong>Contact information</strong> — such as your name and email address when you
							submit our contact form.
						</li>
						<li>
							<strong>Usage data</strong> — such as pages visited, time spent on the Site, browser
							type, and referring URLs, collected through cookies and analytics tools.
						</li>
						<li>
							<strong>Affiliate tracking data</strong> — when you click affiliate links, third-party
							platforms like JVZoo may collect data according to their own privacy policies.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						3. How We Use Your Information
					</h2>
					<p className="mt-3">We use collected information to:</p>
					<ul className="mt-3 list-disc space-y-2 pl-6">
						<li>Respond to your inquiries and contact form submissions</li>
						<li>Improve the Site and user experience</li>
						<li>Analyze traffic and usage patterns</li>
						<li>Track affiliate referrals and commissions</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						4. Cookies &amp; Tracking
					</h2>
					<p className="mt-3">
						We use cookies and similar technologies to enhance your browsing experience and analyze
						site traffic. Affiliate links may also place cookies to track referrals. You can control
						cookie preferences through your browser settings, though disabling cookies may affect
						certain site functionality.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						5. Third-Party Services
					</h2>
					<p className="mt-3">
						Our Site links to third-party websites and services, including JVZoo product pages. We
						are not responsible for the privacy practices of these external sites. We encourage you
						to review their privacy policies before providing any personal information.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">6. Data Security</h2>
					<p className="mt-3">
						We implement reasonable security measures to protect your information. However, no method
						of transmission over the Internet is 100% secure, and we cannot guarantee absolute
						security.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">7. Your Rights</h2>
					<p className="mt-3">
						Depending on your location, you may have the right to access, correct, or delete your
						personal data. To exercise these rights, contact us at{" "}
						<a href="mailto:support@sasslight.com" className="text-amber-600 hover:text-amber-500">
							support@sasslight.com
						</a>
						.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						8. Changes to This Policy
					</h2>
					<p className="mt-3">
						We may update this Privacy Policy from time to time. Changes will be posted on this page
						with an updated revision date. We encourage you to review this policy periodically.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">9. Contact Us</h2>
					<p className="mt-3">
						If you have questions about this Privacy Policy, please contact us at{" "}
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
