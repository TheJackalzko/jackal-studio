'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'

interface Organ {
  id: string
  section: string
  title: string
  subtitle: string
  description: string
  stack: string
  color: string
  glowColor: string
  radius: string
  // Grid position (desktop)
  col: string
  row: string
}

const ORGANS: Organ[] = [
  {
    id: 'nerveux',
    section: 'organs',
    title: 'Le Système Nerveux',
    subtitle: 'Applications mobiles',
    description:
      "Une app qui voyage avec l'utilisateur, toujours connectée, toujours réactive. Elle ne dort jamais, anticipe les usages, et devient indispensable en quelques jours.",
    stack: 'React Native / Expo — iOS & Android',
    color: '#3EFFC0',
    glowColor: 'rgba(62, 255, 192, 0.15)',
    radius: '55% 45% 60% 40% / 45% 55% 50% 50%',
    col: 'col-start-1 col-end-7',
    row: 'row-start-1 row-end-3',
  },
  {
    id: 'coeur',
    section: 'organs',
    title: 'Le Cœur',
    subtitle: 'Applications web',
    description:
      "Le moteur d'une activité. Dashboards, SaaS, outils internes — ce qui fait tourner une organisation sans qu'on ait à y penser. Robuste, rapide, évolutif.",
    stack: 'Next.js — React — Python — TypeScript',
    color: '#FF7A68',
    glowColor: 'rgba(255, 122, 104, 0.15)',
    radius: '45% 55% 40% 60% / 60% 40% 55% 45%',
    col: 'col-start-5 col-end-13',
    row: 'row-start-2 row-end-4',
  },
  {
    id: 'peau',
    section: 'organs',
    title: 'La Peau',
    subtitle: 'Sites internet',
    description:
      "La première impression. Une surface qui donne envie de rester, qui incarne l'identité d'une marque et convertit les visiteurs en contacts. Vitrine, e-commerce, présence.",
    stack: 'Next.js — Tailwind — headless CMS',
    color: '#F2EDE3',
    glowColor: 'rgba(242, 237, 227, 0.1)',
    radius: '60% 40% 55% 45% / 50% 60% 40% 50%',
    col: 'col-start-1 col-end-8',
    row: 'row-start-3 row-end-5',
  },
  {
    id: 'cerveau',
    section: 'organs-cerveau',
    title: 'Le Cerveau',
    subtitle: 'Chatbots intelligents',
    description:
      'Une intelligence conversationnelle sur-mesure. Elle comprend le métier du client, parle comme un expert formé, et répond mieux à chaque échange.',
    stack: 'Claude API — Python — RAG — LLM fine-tuning',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.2)',
    radius: '40% 60% 45% 55% / 55% 45% 60% 40%',
    col: 'col-start-7 col-end-13',
    row: 'row-start-4 row-end-6',
  },
]

function OrganCell({ organ, index }: { organ: Organ; index: number }) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const cellRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cellRef, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={cellRef}
      data-section={organ.section}
      initial={{ opacity: 0, scale: 0.88, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-8 md:p-10 ${organ.col} ${organ.row}`}
      style={{
        borderRadius: organ.radius,
        border: `1px solid ${organ.color}22`,
        background: hovered
          ? `linear-gradient(145deg, ${organ.color}12, ${organ.color}06)`
          : `linear-gradient(145deg, ${organ.color}08, transparent)`,
        boxShadow: hovered
          ? `0 0 50px ${organ.glowColor}, 0 0 100px ${organ.glowColor}`
          : `0 0 20px ${organ.glowColor}`,
        transition: prefersReduced
          ? 'none'
          : 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered && !prefersReduced ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* Organ indicator */}
      <div
        className="w-2 h-2 rounded-full mb-6"
        style={{
          background: organ.color,
          boxShadow: `0 0 12px ${organ.color}`,
        }}
      />

      {/* Subtitle / label */}
      <p
        className="eyebrow mb-3"
        style={{
          color: organ.color,
          opacity: 0.7,
          fontFamily: 'var(--font-jetbrains), monospace',
        }}
      >
        {organ.subtitle}
      </p>

      {/* Title */}
      <h3
        className="font-fraunces text-2xl md:text-3xl text-membrane mb-4 leading-tight"
        style={{
          fontVariationSettings: `'wght' 400, 'SOFT' 35, 'opsz' 48`,
        }}
      >
        {organ.title}
      </h3>

      {/* Description */}
      <p
        className="text-membrane/55 text-sm md:text-base leading-relaxed mb-6"
        style={{ fontFamily: 'Switzer, system-ui, sans-serif' }}
      >
        {organ.description}
      </p>

      {/* Stack */}
      <p
        className="text-[0.65rem] tracking-widest uppercase"
        style={{
          color: organ.color,
          opacity: 0.5,
          fontFamily: 'var(--font-jetbrains), monospace',
        }}
      >
        {organ.stack}
      </p>

      {/* Hover connector hint */}
      <AnimatePresence>
        {hovered && !prefersReduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-3 -right-3 text-[0.6rem] tracking-wider uppercase"
            style={{
              color: organ.color,
              fontFamily: 'var(--font-jetbrains), monospace',
            }}
          >
            ↗ COMBINE
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Organs() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section id="organs" className="relative py-24 md:py-36 px-6 md:px-12">
      {/* Section header */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow text-plasma/50 mb-6"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          LES ORGANES — QUATRE SERVICES, UN ÊTRE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <BreathingHeading
            as="h2"
            baseWeight={300}
            baseOpsz={72}
            baseSoft={35}
            className="text-[clamp(2.2rem,5vw,4rem)] leading-tight text-membrane max-w-3xl"
          >
            Pas quatre prestations séparées.{' '}
            <span className="text-gradient-plasma">Un être complet.</span>
          </BreathingHeading>
        </motion.div>
      </div>

      {/* Organ cells — asymmetric grid */}
      <div className="max-w-6xl mx-auto">
        {/* Desktop: CSS grid with intentional gaps */}
        <div className="hidden md:grid grid-cols-12 grid-rows-5 gap-5 min-h-[700px]">
          {ORGANS.map((organ, i) => (
            <OrganCell key={organ.id} organ={organ} index={i} />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-5">
          {ORGANS.map((organ, i) => (
            <motion.div
              key={organ.id}
              data-section={organ.section}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-7"
              style={{
                borderRadius: organ.radius,
                border: `1px solid ${organ.color}22`,
                background: `linear-gradient(145deg, ${organ.color}09, transparent)`,
                boxShadow: `0 0 30px ${organ.glowColor}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-5"
                style={{ background: organ.color, boxShadow: `0 0 10px ${organ.color}` }}
              />
              <p
                className="eyebrow mb-2"
                style={{ color: organ.color, opacity: 0.7, fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {organ.subtitle}
              </p>
              <h3
                className="font-fraunces text-2xl text-membrane mb-3 leading-tight"
                style={{ fontVariationSettings: `'wght' 400, 'SOFT' 35, 'opsz' 48` }}
              >
                {organ.title}
              </h3>
              <p className="text-membrane/55 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Switzer, sans-serif' }}>
                {organ.description}
              </p>
              <p
                className="text-[0.6rem] tracking-widest uppercase"
                style={{ color: organ.color, opacity: 0.5, fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {organ.stack}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
