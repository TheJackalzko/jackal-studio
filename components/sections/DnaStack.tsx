'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'

interface Tech {
  name: string
  color: string
  side: 'left' | 'right'
  organ: string
}

const TECHS: Tech[] = [
  { name: 'Next.js',      color: '#F2EDE3', side: 'left',  organ: 'Cœur' },
  { name: 'React Native', color: '#3EFFC0', side: 'right', organ: 'Système Nerveux' },
  { name: 'TypeScript',   color: '#3EFFC0', side: 'left',  organ: 'Tous' },
  { name: 'Python',       color: '#FF7A68', side: 'right', organ: 'Cœur + Cerveau' },
  { name: 'Claude API',   color: '#8B5CF6', side: 'left',  organ: 'Cerveau' },
  { name: 'Tailwind CSS', color: '#3EFFC0', side: 'right', organ: 'Peau' },
  { name: 'Claude Code',  color: '#8B5CF6', side: 'left',  organ: 'Workflow' },
  { name: 'Expo',         color: '#FF7A68', side: 'right', organ: 'Système Nerveux' },
  { name: 'Framer Motion',color: '#3EFFC0', side: 'left',  organ: 'Peau' },
  { name: 'PostgreSQL',   color: '#FF7A68', side: 'right', organ: 'Cœur' },
]

const HEIGHT = 520
const PAIR_SPACING = HEIGHT / (TECHS.length - 1)

function sineY(index: number, total: number, amplitude = 60): number {
  return Math.sin((index / (total - 1)) * Math.PI * 2) * amplitude
}

export default function DnaStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [-3, 3])

  const svgWidth = 520
  const cx = svgWidth / 2

  // Left helix: sine wave
  const leftPoints = TECHS.map((_, i) => ({
    x: cx - 60 + sineY(i, TECHS.length, 70),
    y: (i / (TECHS.length - 1)) * HEIGHT,
  }))

  // Right helix: offset sine
  const rightPoints = TECHS.map((_, i) => ({
    x: cx + 60 - sineY(i, TECHS.length, 70),
    y: (i / (TECHS.length - 1)) * HEIGHT,
  }))

  const leftPath = leftPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

  const rightPath = rightPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      id="dna-stack"
      data-section="dna-stack"
      className="py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-plasma/50 mb-6"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            ADN TECHNIQUE — LA STACK
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BreathingHeading
              as="h2"
              baseWeight={300}
              baseOpsz={72}
              baseSoft={30}
              className="text-[clamp(2rem,4.5vw,3.8rem)] leading-tight text-membrane max-w-2xl"
            >
              Des technologies choisies,{' '}
              <span className="text-gradient-plasma">pas collectionnées.</span>
            </BreathingHeading>
          </motion.div>
        </div>

        {/* Double helix + tech labels */}
        <div className="flex justify-center">
          <motion.div
            style={{ rotate, transformOrigin: 'center' }}
            className="relative"
          >
            <svg
              width={svgWidth}
              height={HEIGHT + 40}
              viewBox={`0 0 ${svgWidth} ${HEIGHT + 40}`}
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="helixGradL" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3EFFC0" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF7A68" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="helixGradR" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A68" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3EFFC0" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Connecting rungs */}
              {TECHS.map((_, i) => {
                const lp = leftPoints[i]
                const rp = rightPoints[i]
                return (
                  <motion.line
                    key={i}
                    x1={lp.x}
                    y1={lp.y}
                    x2={rp.x}
                    y2={rp.y}
                    stroke="rgba(62, 255, 192, 0.12)"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  />
                )
              })}

              {/* Left helix strand */}
              <motion.path
                d={leftPath}
                fill="none"
                stroke="url(#helixGradL)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
              />

              {/* Right helix strand */}
              <motion.path
                d={rightPath}
                fill="none"
                stroke="url(#helixGradR)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.35 }}
              />

              {/* Tech nodes + labels */}
              {TECHS.map((tech, i) => {
                const point = tech.side === 'left' ? leftPoints[i] : rightPoints[i]
                const labelX = tech.side === 'left' ? point.x - 16 : point.x + 16
                const anchor = tech.side === 'left' ? 'end' : 'start'

                return (
                  <motion.g
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4, type: 'spring', stiffness: 300 }}
                    style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                  >
                    {/* Node circle */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={5}
                      fill={tech.color}
                      opacity={0.9}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={9}
                      fill={tech.color}
                      opacity={0.15}
                    />

                    {/* Tech name */}
                    <text
                      x={labelX}
                      y={point.y + 4}
                      textAnchor={anchor}
                      fill={tech.color}
                      fontSize="11"
                      fontFamily="var(--font-jetbrains), JetBrains Mono, monospace"
                      opacity={0.85}
                      letterSpacing="0.08em"
                    >
                      {tech.name}
                    </text>

                    {/* Organ association */}
                    <text
                      x={labelX}
                      y={point.y + 17}
                      textAnchor={anchor}
                      fill={tech.color}
                      fontSize="8"
                      fontFamily="var(--font-jetbrains), JetBrains Mono, monospace"
                      opacity={0.35}
                      letterSpacing="0.1em"
                    >
                      {tech.organ.toUpperCase()}
                    </text>
                  </motion.g>
                )
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
