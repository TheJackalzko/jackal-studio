import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { caseStudies, expertises, pricingTiers, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agence web et IA à Mâcon",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <Container>
          <h1 className="max-w-3xl font-display text-40 leading-[1.1] text-ink md:text-72">
            Sites internet, e-commerce et intelligence artificielle pour les
            entreprises de Mâcon.
          </h1>
          <p className="mt-8 max-w-xl text-20 text-silver">
            Jackal Studio conçoit, héberge et maintient des sites et des
            applications pour les TPE, PME et cabinets comptables de
            Bourgogne. Un seul interlocuteur, un abonnement trimestriel,
            aucune facture surprise.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="border border-gold bg-gold/5 px-6 py-3.5 text-17 text-ink transition-colors duration-[250ms] ease-out hover:bg-gold/15"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="px-6 py-3.5 text-17 text-ink underline decoration-silver/40 underline-offset-4 transition-colors duration-[250ms] ease-out hover:decoration-ink"
            >
              Voir nos réalisations
            </Link>
          </div>
        </Container>
      </section>

      {/* Expertises */}
      <section id="expertises" className="border-t border-silver/15 py-20 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-40 text-ink">Nos expertises</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 md:grid-cols-2">
            {expertises.map((item, index) => {
              const isWide =
                index === expertises.length - 1 &&
                expertises.length % 2 !== 0;
              return (
              <Reveal
                key={item.slug}
                delay={index * 60}
                className={isWide ? "md:col-span-2" : ""}
              >
                <Link
                  href={`/expertises/${item.slug}`}
                  className={`group flex h-full flex-col justify-between bg-paper p-8 transition-colors duration-[250ms] ease-out hover:bg-ink ${isWide ? "md:flex-row md:items-center md:justify-between md:gap-8" : ""}`}
                >
                  <div>
                    <h3 className="text-28 text-ink transition-colors duration-[250ms] ease-out group-hover:text-paper">
                      {item.label}
                    </h3>
                    <p className="mt-4 text-17 text-silver transition-colors duration-[250ms] ease-out group-hover:text-silver">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`mt-8 text-14 text-silver transition-colors duration-[250ms] ease-out group-hover:text-gold ${isWide ? "md:mt-0 md:shrink-0" : ""}`}
                  >
                    En savoir plus →
                  </span>
                </Link>
              </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pourquoi Jackal Studio */}
      <section className="border-t border-line bg-ink py-20 text-paper md:py-32">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl font-display text-40 text-paper">
              Une agence locale, une méthode de production.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Basés à Mâcon",
                text: "On connaît le tissu économique local : commerçants, artisans, cabinets comptables.",
              },
              {
                title: "Un abonnement, pas un devis figé",
                text: "Hébergement, maintenance et évolutions inclus, sur un engagement de 12 mois.",
              },
              {
                title: "Du code, pas du no-code fragile",
                text: "Sites et applications développés sur mesure, pensés pour durer.",
              },
              {
                title: "IA appliquée à un besoin réel",
                text: "Chatbots et outils métier conçus pour un usage précis, pas pour l'effet vitrine.",
              },
            ].map((point, index) => (
              <Reveal key={point.title} delay={index * 60}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-20 text-paper">{point.title}</h3>
                  <p className="mt-3 text-17 text-silver">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Réalisations */}
      <section className="border-t border-silver/15 py-20 md:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-display text-40 text-ink">Réalisations</h2>
            </Reveal>
            <Reveal>
              <Link
                href="/realisations"
                className="text-14 text-silver underline decoration-silver/40 underline-offset-4 transition-colors duration-[250ms] ease-out hover:text-ink hover:decoration-ink"
              >
                Toutes les réalisations
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={index * 60}>
                <Link
                  href={`/realisations/${study.slug}`}
                  className="group block border border-silver/15 p-8 transition-colors duration-[250ms] ease-out hover:border-gold"
                >
                  <h3 className="font-display text-28 text-ink">
                    {study.name}
                  </h3>
                  <p className="mt-4 text-17 text-silver">{study.summary}</p>
                  <span className="mt-8 block text-14 text-silver transition-colors duration-[250ms] ease-out group-hover:text-gold">
                    Voir l&apos;étude de cas →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Tarifs */}
      <section className="border-t border-silver/15 py-20 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-40 text-ink">Tarifs</h2>
          </Reveal>
          <Reveal>
            <p className="mt-4 max-w-xl text-17 text-silver">
              Abonnement trimestriel, engagement 12 mois. Hébergement,
              maintenance et mises à jour inclus.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 60}>
                <div className="flex h-full flex-col justify-between border border-silver/15 p-8">
                  <div>
                    <h3 className="text-20 text-ink">{tier.name}</h3>
                    <p className="mt-6 font-display text-40 text-ink">
                      {tier.price}
                      <span className="ml-2 text-14 text-silver">
                        {tier.period}
                      </span>
                    </p>
                    <p className="mt-4 text-17 text-silver">
                      {tier.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/tarifs"
              className="mt-10 inline-block border border-gold bg-gold/5 px-6 py-3.5 text-17 text-ink transition-colors duration-[250ms] ease-out hover:bg-gold/15"
            >
              Voir le détail des offres
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* CTA final */}
      <section className="border-t border-silver/15 py-20 md:py-32">
        <Container>
          <Reveal className="border border-silver/15 px-8 py-16 text-center md:px-16">
            <h2 className="font-display text-40 text-ink">
              Parlons de votre projet.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-17 text-silver">
              Décrivez-nous votre activité et vos objectifs. Nous revenons
              vers vous avec un périmètre et un prix clairs.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-gold bg-gold/5 px-6 py-3.5 text-17 text-ink transition-colors duration-[250ms] ease-out hover:bg-gold/15"
            >
              Demander un devis
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
