import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CytoplasmCanvas from '@/components/cytoplasm/CytoplasmCanvas'
import CustomCursor from '@/components/cytoplasm/CustomCursor'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  // Variable font — no weight specified; axes selects the non-standard SOFT axis
  axes: ['SOFT'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Jackal Studio — Laboratoire Numérique',
  description:
    'Applications mobiles, web, sites internet, intelligence conversationnelle — conçus comme des organismes vivants, pas comme des outils qu\'on referme.',
  keywords: [
    'développement application mobile',
    'développement web',
    'chatbot IA',
    'agence digitale Mâcon Lyon',
    'Next.js React Python',
  ],
  openGraph: {
    title: 'Jackal Studio — Laboratoire Numérique',
    description: 'On fait naître des organismes numériques.',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CytoplasmCanvas />
        <CustomCursor />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
