export const siteConfig = {
  name: "Jackal Studio",
  url: "https://studiojackal.com",
  description:
    "Agence web et IA à Mâcon. Sites vitrine, e-commerce, chatbots et applications sur mesure pour TPE, PME et cabinets comptables.",
  locality: "Mâcon",
  region: "Bourgogne-Franche-Comté",
  country: "FR",
} as const;

export const navLinks = [
  { href: "/#expertises", label: "Expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/methode", label: "Méthode" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
] as const;

export const expertises = [
  {
    slug: "site-vitrine",
    label: "Site vitrine",
    description:
      "Un site rapide et clair qui présente votre activité et génère des demandes de contact.",
  },
  {
    slug: "site-e-commerce",
    label: "E-commerce",
    description: "Une boutique en ligne qui vend, du catalogue au paiement.",
  },
  {
    slug: "chatbot-ia",
    label: "Chatbot IA",
    description:
      "Un assistant qui répond à vos visiteurs et qualifie vos prospects 24h/24.",
  },
  {
    slug: "application-sur-mesure",
    label: "Application sur mesure",
    description: "Un outil métier construit pour vos processus, pas l'inverse.",
  },
  {
    slug: "maintenance-hebergement",
    label: "Maintenance & hébergement",
    description:
      "Hébergement, mises à jour et sécurité pris en charge en continu.",
  },
] as const;

export const pricingTiers = [
  {
    name: "Site vitrine",
    price: "499 €",
    period: "/ trimestre",
    description: "Site institutionnel, hébergement et maintenance inclus.",
  },
  {
    name: "E-commerce",
    price: "1 499 €",
    period: "/ trimestre",
    description: "Boutique en ligne complète, catalogue et paiement inclus.",
  },
  {
    name: "Application sur mesure",
    price: "3 000 €",
    period: "/ trimestre",
    description: "Outil métier développé et maintenu sur mesure.",
  },
] as const;

export const caseStudies = [
  {
    slug: "teemolo",
    name: "Teemolo",
    summary:
      "Générateur de factures conformes au droit français, avec export PDF.",
  },
  {
    slug: "copilote-fec",
    name: "Copilote FEC",
    summary:
      "SaaS d'analyse de Fichiers d'Écritures Comptables en marque blanche pour cabinets d'expertise comptable.",
  },
] as const;
