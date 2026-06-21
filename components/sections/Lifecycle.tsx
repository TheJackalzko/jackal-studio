'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'

const STAGES = [
  {
    num: '01',
    name: 'Conception',
    desc: 'Cadrage du besoin réel, loin des specs de surface. On écoute le problème avant de parler solution. Architecture, choix technique, portée du projet.',
    color: '#3EFFC0',
    size: 1,
  },
  {
    num: '02',
    name: 'Gestation',
    desc: 'Design et développement en parallèle, itérations courtes. Chaque semaine, quelque chose de concret à voir et à tester. Aucune surprise au moment de livrer.',
    color: '#5df5d0',
    size: 1.25,
  },
  {
    num: '03',
    name: 'Naissance',
    desc: 'Mise en ligne, tests avec les premiers utilisateurs réels. La bête vit pour la première fois. On reste là pendant les premières 24 heures.',
    color: '#FF7A68',
    size: 1.55,
  },
  {
    num: '04',
    name: 'Croissance',
    desc: "Maintenance, évolutions, montée en charge. L'organisme s'adapte à ses conditions réelles. Les retours des utilisateurs guident les prochaines itérations.",
    color: '#ff9987',
    size: 1.85,
  },
]

export default function Lifecycle() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="lifecycle"
      data-section="lifecycle"
      className="py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-plasma/50 mb-6"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            CYCLE DE VIE — DU CAHIER DES CHARGES À LA CROISSANCE
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
              Un projet, c'est{' '}
              <span className="text-gradient-tissu">quatre temps</span>.
            </BreathingHeading>
          </motion.div>
        </div>

        {/* Organic timeline — curved SVG path with nodes */}
        <div className="relative">
          {/* SVG curve connecting the stages */}
          <svg
            className="hidden md:block absolute inset-0 w-full pointer-events-none"
            style={{ height: '340px', overflow: 'visible' }}
            viewBox="0 0 1100 340"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3EFFC0" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#FF7A68" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF7A68" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 80 280 C 200 260, 280 80, 380 120 C 480 160, 520 40, 660 80 C 780 115, 820 20, 950 60 C 1010 78, 1050 100, 1100 100"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={
                prefersReduced
                  ? { strokeDasharray: 'none' }
                  : {
                      pathLength: pathProgress,
                      strokeDasharray: 1,
                      strokeDashoffset: 0,
                    }
              }
            />
          </svg>

          {/* Stage cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {STAGES.map((stage, i) => {
              const nodeSize = stage.size

              return (
                <motion.div
                  key={stage.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex flex-col"
                  style={{
                    marginTop: `${[0, -80, -160, -240][i]}px`,
                    // Only apply vertical offset on desktop via padding-top hack
                  }}
                >
                  {/* Node circle (grows with each stage) */}
                  <div className="mb-6 flex items-center gap-4">
                    <motion.div
                      animate={prefersReduced ? {} : {
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      }}
                      style={{
                        width: `${28 + i * 10}px`,
                        height: `${28 + i * 10}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${stage.color} 0%, ${stage.color}40 60%, transparent 100%)`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="text-[0.6rem] tracking-widest"
                      style={{
                        color: stage.color,
                        opacity: 0.5,
                        fontFamily: 'var(--font-jetbrains), monospace',
                      }}
                    >
                      {stage.num}
                    </span>
                  </div>

                  <h3
                    className="font-fraunces text-2xl text-membrane mb-4 leading-tight"
                    style={{
                      fontVariationSettings: `'wght' 400, 'SOFT' 30, 'opsz' 36`,
                      color: stage.color,
                    }}
                  >
                    {stage.name}
                  </h3>

                  <p
                    className="text-membrane/50 text-sm leading-relaxed"
                    style={{ fontFamily: 'Switzer, system-ui, sans-serif' }}
                  >
                    {stage.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
