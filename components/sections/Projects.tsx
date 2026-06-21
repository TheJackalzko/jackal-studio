'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'

interface Project {
  name: string
  slug: string
  organ: string
  organColor: string
  tagline: string
  result: string
  year: string
  status: 'live' | 'coming'
  radius: string
}

const PROJECTS: Project[] = [
  {
    name: 'Vulpes Zerda',
    slug: 'vulpes-zerda',
    organ: 'Le Cerveau',
    organColor: '#8B5CF6',
    tagline: 'Intelligence conversationnelle métier',
    result: 'Assistant IA sur-mesure intégré dans un flux métier existant — réduction du temps de traitement de 60%.',
    year: '2024',
    status: 'live',
    radius: '55% 45% 60% 40% / 45% 55% 50% 50%',
  },
  {
    name: 'Z Système',
    slug: 'z-systeme',
    organ: 'Le Cœur',
    organColor: '#FF7A68',
    tagline: 'Application web de gestion',
    result: 'Dashboard opérationnel remplaçant trois outils séparés. Adoption complète en moins de deux semaines.',
    year: '2025',
    status: 'live',
    radius: '45% 55% 40% 60% / 60% 40% 55% 45%',
  },
  {
    name: 'Z Entreprises',
    slug: 'z-entreprises',
    organ: 'Le Cœur + La Peau',
    organColor: '#3EFFC0',
    tagline: 'Plateforme SaaS B2B',
    result: 'En gestation.',
    year: '2025',
    status: 'coming',
    radius: '60% 40% 55% 45% / 50% 60% 40% 50%',
  },
]

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section id="projects" data-section="projects" className="py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow text-plasma/50 mb-6"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            NAISSANCES — PROJETS LIVRÉS
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
              baseSoft={30}
              className="text-[clamp(2rem,4.5vw,3.8rem)] leading-tight text-membrane max-w-2xl"
            >
              Chaque projet,{' '}
              <span className="text-gradient-plasma">une naissance.</span>
            </BreathingHeading>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 50px ${project.organColor}20, 0 0 100px ${project.organColor}08`,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              className="relative p-8"
              style={{
                borderRadius: project.radius,
                border: `1px solid ${project.organColor}25`,
                background: `linear-gradient(145deg, ${project.organColor}09, ${project.organColor}03)`,
                opacity: project.status === 'coming' ? 0.7 : 1,
              }}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-[0.6rem] tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    color: project.organColor,
                    background: `${project.organColor}15`,
                    border: `1px solid ${project.organColor}30`,
                    fontFamily: 'var(--font-jetbrains), monospace',
                  }}
                >
                  {project.status === 'live' ? '● LIVE' : '○ EN GESTATION'}
                </span>
                <span
                  className="eyebrow text-membrane/25"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {project.year}
                </span>
              </div>

              {/* Organ tag */}
              <p
                className="eyebrow mb-3"
                style={{
                  color: project.organColor,
                  opacity: 0.65,
                  fontFamily: 'var(--font-jetbrains), monospace',
                }}
              >
                {project.organ}
              </p>

              {/* Project name */}
              <h3
                className="font-fraunces text-3xl md:text-4xl text-membrane mb-2 leading-tight"
                style={{
                  fontVariationSettings: `'wght' 300, 'SOFT' 40, 'opsz' 48`,
                }}
              >
                {project.name}
              </h3>

              {/* Tagline */}
              <p
                className="text-membrane/45 text-sm mb-6"
                style={{ fontFamily: 'Switzer, sans-serif' }}
              >
                {project.tagline}
              </p>

              {/* Result */}
              <p
                className="text-membrane/70 text-sm leading-relaxed border-t border-membrane/8 pt-6"
                style={{ fontFamily: 'Switzer, sans-serif' }}
              >
                {project.result}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
