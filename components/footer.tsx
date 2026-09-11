import Link from "next/link";
import { Container } from "@/components/container";
import { expertises, siteConfig } from "@/lib/site";

const companyLinks = [
  { href: "/methode", label: "Méthode" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="grid grid-cols-1 gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-display text-20 text-paper">
            {siteConfig.name}
          </span>
          <p className="mt-4 max-w-xs text-14 text-silver">
            Agence web et IA à {siteConfig.locality}. Sites, e-commerce et
            applications sur mesure pour les TPE, PME et cabinets
            comptables.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <h2 className="text-14 text-silver">Expertises</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {expertises.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/expertises/${item.slug}`}
                  className="text-14 text-paper transition-colors duration-[250ms] ease-out hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 md:col-start-9">
          <h2 className="text-14 text-silver">Agence</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-14 text-paper transition-colors duration-[250ms] ease-out hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 md:col-start-11">
          <h2 className="text-14 text-silver">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <Link
                href="/contact"
                className="text-14 text-paper transition-colors duration-[250ms] ease-out hover:text-gold"
              >
                Nous écrire
              </Link>
            </li>
            <li className="text-14 text-silver">{siteConfig.locality}</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-8 text-14 text-silver md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {siteConfig.name}. Tous droits réservés.
        </p>
        <Link
          href="/mentions-legales"
          className="transition-colors duration-[250ms] ease-out hover:text-paper"
        >
          Mentions légales
        </Link>
      </Container>
    </footer>
  );
}
