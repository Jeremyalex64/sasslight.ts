import Link from "next/link";
import NavBrand from "./NavBrand";
import { brand } from "@/lib/brand";

export default function Footer() {
	return (
		<footer className={brand.surfaces.footer}>
			<div className={`${brand.layout.container} py-12`}>
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="sm:col-span-2 lg:col-span-1">
						<NavBrand size="footer" />
						<p className={`mt-4 max-w-xs text-sm leading-relaxed ${brand.colors.body}`}>
							Curated JVZoo affiliate products to help you find the best deals, tools, and
							resources for your business.
						</p>
					</div>

					<div>
						<h4 className={`font-semibold ${brand.colors.gold}`}>Quick Links</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link href="/about" className={`${brand.colors.body} ${brand.colors.goldHover}`}>
									About
								</Link>
							</li>
							<li>
								<Link href="/blog" className={`${brand.colors.body} ${brand.colors.goldHover}`}>
									Blog
								</Link>
							</li>
							<li>
								<Link href="/contact" className={`${brand.colors.body} ${brand.colors.goldHover}`}>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className={`font-semibold ${brand.colors.gold}`}>Legal</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									href="/terms-and-conditions"
									className={`${brand.colors.body} ${brand.colors.goldHover}`}
								>
									Terms &amp; Conditions
								</Link>
							</li>
							<li>
								<Link
									href="/privacy-policy"
									className={`${brand.colors.body} ${brand.colors.goldHover}`}
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className={`font-semibold ${brand.colors.gold}`}>Affiliate Disclosure</h4>
						<p className={`mt-4 text-sm leading-relaxed ${brand.colors.body}`}>
							This site contains affiliate links. We may earn a commission when you purchase through
							our links at no extra cost to you.
						</p>
					</div>
				</div>

				<div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
					&copy; {new Date().getFullYear()} SASSLIGHT. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
