'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MembraneDivider from '@/components/ui/MembraneDivider'
import BreathingHeading from '@/components/ui/BreathingHeading'

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section id="manifesto" data-section="manifesto">
      <MembraneDivider fromDark={true} />

      <div className="section-membrane py-24 md:py-36">
        <div
          ref={ref}
          className="max-w-4xl mx-auto px-6 md:px-12"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-encre/40 mb-10"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            MANIFESTE — POURQUOI « ORGANISME »
          </motion.p>

          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border-l-2 border-tissu pl-8 mb-14"
          >
            <BreathingHeading
              as="h2"
              baseWeight={300}
              baseOpsz={72}
              baseSoft={30}
              className="text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-encre"
            >
              Un organisme naît, apprend, s'adapte.{' '}
              <span style={{ color: '#FF7A68' }}>Un outil, non.</span>
            </BreathingHeading>
          </motion.div>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7 text-encre/80 text-lg leading-[1.85]"
            style={{ fontFamily: 'Switzer, system-ui, sans-serif' }}
          >
            <p>
              Jackal Studio est né d'une conviction simple et un peu têtue : les meilleurs produits numériques ne ressemblent pas à des logiciels. Ils ressemblent à des extensions de leur utilisateur — ils anticipent, ils réagissent, ils s'améliorent. Ils font partie du quotidien sans qu'on ait besoin de les apprivoiser à chaque session.
            </p>
            <p>
              Le fondateur a un profil qu'on croise rarement dans ce métier : une formation en comptabilité et gestion (DCG), suivie d'un virage complet vers le développement IA. Ce n'est pas un accident — c'est précisément cette double culture qui permet de comprendre un problème métier avant d'écrire une seule ligne de code. L'outil ne précède jamais le besoin, ici.
            </p>
            <p>
              Jackal Studio est une structure volontairement petite, basée à Mâcon en Auvergne-Rhône-Alpes. Pas d'équipe de vente, pas de chef de projet intermédiaire entre le client et le code. Le fondateur conçoit, développe et livre. La stack — Python, React, Next.js, TypeScript, Claude Code — a été choisie pour sa cohérence et son expressivité, pas pour impressionner une fiche commerciale. Chaque projet que nous livrons doit être capable de vivre sans nous.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-14 flex items-center gap-5"
          >
            <div
              className="w-10 h-10 radius-organic-2 flex items-center justify-center text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #3EFFC0 0%, #00d4a8 100%)',
                color: '#0A0F0D',
                fontFamily: 'var(--font-jetbrains), monospace',
              }}
            >
              JS
            </div>
            <div>
              <p className="text-encre text-sm font-semibold" style={{ fontFamily: 'Switzer, sans-serif' }}>
                Jackal Studio
              </p>
              <p className="text-encre/40 text-xs" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                MÂCON — AUVERGNE-RHÔNE-ALPES
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <MembraneDivider fromDark={false} flip={true} />
    </section>
  )
}
