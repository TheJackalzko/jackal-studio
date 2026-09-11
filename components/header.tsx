import Link from "next/link";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-silver/15 bg-paper/95 backdrop-blur-sm">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-20 leading-none text-ink">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-14 text-silver transition-colors duration-[250ms] ease-out hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden border border-gold px-5 py-2.5 text-14 text-ink transition-colors duration-[250ms] ease-out hover:bg-gold/10 md:block"
        >
          Contact
        </Link>

        <MobileNav />
      </Container>
    </header>
  );
}
