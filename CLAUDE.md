# Jackal Studio — site web

Agence web et IA basée à Mâcon (Bourgogne, France). Vend en B2B à des
TPE/PME locales et des cabinets comptables. Ce document résume le brief
complet du projet ; s'y référer avant toute décision de structure, de
design ou de contenu.

## Stack

- Next.js (App Router, TypeScript), rendu statique par défaut (SSG).
  Pas de client components sauf besoin d'interactivité réel (chatbot,
  formulaires, reveals au scroll).
- Tailwind CSS avec design tokens custom. **Jamais de couleurs
  arbitraires dans le JSX** (pas de `bg-[#...]`), toujours passer par
  les tokens.
- Animations en CSS d'abord. Motion (Framer Motion successeur) en
  dynamic import uniquement si un besoin ne peut pas être fait en CSS.
- Polices self-hostées en `.woff2`, `font-display: swap`. Pas de
  requête runtime vers un CDN de polices.
- Aucune dépendance UI lourde : pas de shadcn/ui complet, pas de
  librairie de composants. On écrit les composants à la main, au cas
  par cas.
- Objectifs de performance : LCP < 2s, CLS < 0.05, zéro JS bloquant au
  first paint.

## Notes d'implémentation (versions installées)

Projet initialisé avec **Next.js 16** (App Router, Turbopack par
défaut) et **Tailwind CSS v4**. Ces versions changent certaines
conventions par rapport aux habitudes Next 14/15 ou Tailwind v3 — à
respecter dans tout le code écrit sur ce projet :

- **Tailwind v4 est CSS-first** : pas de `tailwind.config.js/ts`. Les
  tokens (couleurs, fonts, échelle typographique) sont déclarés dans
  `app/globals.css` via un bloc `@theme`. Une variable `--color-gold`
  dans `@theme` génère directement les utilitaires `bg-gold`,
  `text-gold`, `border-gold`, etc. — c'est ce mécanisme qui tient lieu
  de "design tokens custom".
- **`params` et `searchParams` sont asynchrones** dans `page.tsx`,
  `layout.tsx`, `route.tsx`, `opengraph-image`, `sitemap`, etc. —
  toujours `await` (`const { slug } = await params`). Utiliser les
  helpers de types générés (`PageProps<'/route'>`, `LayoutProps`,
  `RouteContext`) plutôt que des types `params` manuels.
- **Pas de `middleware.ts`** : le fichier/export s'appelle désormais
  `proxy.ts` / `proxy()`. On n'en a a priori pas besoin ici — le
  rate-limit de `/api/chat` se fait directement dans le route handler.
- **`next/font/google`** self-hoste déjà les fichiers au build (aucune
  requête au runtime vers Google) : c'est la méthode retenue pour
  Inter et Instrument Serif, elle satisfait l'exigence "self-hosté" du
  brief sans gérer les fichiers de police à la main. Si des coupes
  très spécifiques sont nécessaires plus tard, bascule possible vers
  `next/font/local` avec des `.woff2` committés dans `app/fonts/`.
- **`next/image`** : `images.qualities` par défaut vaut `[75]` en v16
  (une seule qualité). Ne pas passer de prop `quality` sans avoir
  élargi ce tableau dans `next.config.ts`.
- Rendu statique par défaut : ne pas activer `cacheComponents` (PPR)
  sans raison — le site n'a pas de données dynamiques par requête, la
  génération statique standard suffit.

## Design system

### Couleurs (tokens Tailwind)

| Token    | Valeur                  | Usage                              |
|----------|--------------------------|-------------------------------------|
| `ink`    | `#0B0B0D`                | fond sombre principal               |
| `paper`  | `#FAF8F5`                | fond clair                          |
| `gold`   | `#C9A227`                | accent, **max 5% de la surface**    |
| `silver` | `#8E8E93`                | texte secondaire, bordures          |
| `line`   | `rgba(255,255,255,0.08)` | séparateurs sur fond sombre         |

### Typographie

- **Display** (titres) : serif contrastée — Instrument Serif.
- **Corps** : Inter, 17px de base, line-height 1.7.
- Échelle : `72 / 56 / 40 / 28 / 20 / 17 / 14`. Écarts volontairement
  très marqués entre les niveaux — pas de gradation molle.

### Espacement / grille

- Sections : `py-32` en desktop, `py-20` en mobile.
- Grille 12 colonnes, `max-width: 1280px`.
- Le blanc (l'espace vide) est le marqueur premium du site : être
  généreux, ne jamais compresser par réflexe.

### Motion

- Durée standard : 250ms, easing `ease-out`.
- Reveals au scroll : subtils, `opacity` + `translateY(12px)`. Rien de
  plus.
- Interdits : parallax, curseur custom, preloader.

### Règle générale

Sobriété avant tout. **Si un effet attire l'attention sur lui-même, on
l'enlève.**

## Arborescence des routes

```
/                                    Accueil
/expertises/site-vitrine
/expertises/site-e-commerce
/expertises/chatbot-ia
/expertises/application-sur-mesure
/expertises/maintenance-hebergement
/realisations
/realisations/[slug]
/methode
/tarifs
/contact
/mentions-legales
/blog
/blog/[slug]                         MDX, structure prête même vide
```

### Silos programmatiques (templates réutilisables)

Deux familles de pages générées depuis un fichier de données (pas de
duplication manuelle) :

- `/[service]-[ville]` — ex. `creation-site-internet-macon`
- `/[service]-[metier]` — ex. `site-internet-salon-de-coiffure`

Le contenu (service, ville ou métier, variables texte) vit dans un
fichier de données (JSON/TS) lu par un template commun. Remplissage
ultérieur par l'utilisateur.

## Structure imposée des pages expertise (`/expertises/*`)

1. H1 exact et descriptif.
2. Réponse directe en 2-3 phrases juste sous le H1 — c'est le bloc cité
   par les moteurs IA (SGE, Perplexity, etc.), doit être autonome et
   factuel.
3. Ce qui est inclus (liste concrète).
4. Pour qui c'est.
5. Déroulé en 4 étapes datées.
6. Prix.
7. FAQ de 5 questions (alimente le JSON-LD `FAQPage`).
8. CTA.

## Tarifs (page `/tarifs`)

Abonnement trimestriel, engagement 12 mois, tarifs première année :

| Offre                  | Prix               |
|-------------------------|---------------------|
| Site vitrine            | 499 € / trimestre   |
| E-commerce              | 1 499 € / trimestre |
| Application sur mesure  | 3 000 € / trimestre |

Inclut hébergement, maintenance, mises à jour, évolutions. **Le site
reste la propriété de Jackal Studio pendant la durée de l'abonnement.**

## SEO

- JSON-LD :
  - `Organization` + `ProfessionalService` sur le layout racine.
  - `Service` sur chaque page expertise.
  - `FAQPage` sur chaque bloc FAQ.
  - `BreadcrumbList` sur toutes les pages.
- Metadata Next.js complète par page : `title` unique < 60 caractères,
  `description` < 155 caractères, `canonical`, OpenGraph.
- `sitemap.xml` et `robots.txt` générés dynamiquement (route handlers
  Next.js).
- Images en AVIF/WebP via `next/image`, `alt` descriptifs obligatoires.
- Un seul `<h1>` par page, hiérarchie `Hn` stricte (pas de saut de
  niveau).
- Maillage interne : chaque page expertise renvoie vers 2 autres pages
  expertise + vers les réalisations pertinentes.

## Chatbot

Composant maison, aucun service tiers (pas d'Intercom/Crisp/etc.).

- Chargé en dynamic import uniquement après `requestIdleCallback` ou au
  premier clic sur le bouton flottant. Impact nul sur le LCP.
- UI : bulle discrète en bas à droite, bordure `gold` 1px, fond `ink`.
- Rôle : répondre sur les prestations et les tarifs, qualifier le
  visiteur (type de projet / budget / délai), puis proposer de laisser
  un email.
- Backend : route API Next.js (`/api/chat`) qui appelle un LLM avec un
  system prompt contenant le catalogue de services et les tarifs. Clé
  API en variable d'environnement (`.env.local`, jamais commit).
  Rate-limit par IP.
- Log des questions posées (fichier ou table) pour exploitation SEO
  ultérieure (identification de sujets/FAQ manquants).

## Réalisations à intégrer

Traitées comme de vraies études de cas : **problème → solution → stack
→ résultat**.

- **Teemolo** — générateur de factures conformes au droit français avec
  export PDF.
- **Copilote FEC** — SaaS d'analyse de Fichiers d'Écritures Comptables
  (FEC) en marque blanche pour cabinets d'expertise comptable.

## Ton éditorial

Français, affirmé, précis, zéro jargon marketing. Interdits :
« solutions innovantes », « transformation digitale », et toute formule
du même registre. Phrases courtes, faits, chiffres. Le « nous » est
employé (voix de l'agence).

## Méthode de travail sur ce projet

On avance étape par étape, une page/un bloc à la fois, avec un point de
validation après chaque étape terminée — ne pas tout générer d'un coup.

Ordre prévu :
1. CLAUDE.md (ce fichier).
2. Init du projet Next.js + design system (tokens Tailwind, fonts,
   `globals.css`).
3. Homepage.
4. Puis le reste de l'arborescence, page par page.
