import Link from "next/link";
import NavBrand from "./NavBrand";
import LogoutButton from "./LogoutButton";
import MobileNav from "./MobileNav";
import { brand } from "@/lib/brand";
import { getSession } from "@/lib/auth";

const navLinks = [
  {
    href: "/",
    label: "Home",
    ariaLabel: "Sasslight Home - Affiliate Marketing Store",
  },
  {
    href: "/about",
    label: "About",
    ariaLabel: "Learn about Sasslight and our mission",
  },
  {
    href: "/blog",
    label: "Blog",
    ariaLabel: "Read our affiliate marketing blog and insights",
  },
  {
    href: "/contact",
    label: "Contact",
    ariaLabel: "Contact Sasslight support team",
  },
];

export default async function Header() {
  const session = await getSession();

  return (
    <header className={`relative ${brand.surfaces.header}`}>
      <div
        className={`${brand.layout.container} flex ${brand.nav.barHeight} max-w-6xl items-center justify-between gap-3`}
      >
        <div className="min-w-0 flex-1 md:flex-none">
          <NavBrand size={brand.nav.logoSize} priority />
        </div>

        <nav className={`hidden items-center md:flex ${brand.nav.gap}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={brand.nav.link}
              aria-label={link.ariaLabel}
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <>
              <Link
                href="/admin"
                className={brand.nav.link}
                aria-label="Access admin dashboard to manage products"
              >
                Admin
              </Link>
              <LogoutButton />
            </>
          )}
        </nav>

        <MobileNav links={navLinks} isLoggedIn={!!session} />
      </div>
    </header>
  );
}
