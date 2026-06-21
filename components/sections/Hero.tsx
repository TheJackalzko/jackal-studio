'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [absorbed, setAbsorbed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleAbsorb = () => {
    setAbsorbed(true)
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      setAbsorbed(false)
    }, 900)
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Pulse blob behind the main content — the "heartbeat" */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1, 1.1, 1],
              opacity: [0.06, 0.1, 0.06, 0.09, 0.06],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: [0.215, 0.61, 0.355, 1],
              times: [0, 0.14, 0.28, 0.42, 1],
            }}
            style={{
              width: 'min(70vw, 600px)',
              height: 'min(70vw, 600px)',
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
              background: 'radial-gradient(ellipse, rgba(62, 255, 192, 0.7) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="eyebrow text-plasma/70 mb-8">
          JACKAL STUDIO — LABORATOIRE NUMÉRIQUE, MÂCON
        </motion.p>

        {/* Main title */}
        <motion.div variants={fadeUp} className="mb-8">
          <BreathingHeading
            as="h1"
            baseWeight={300}
            baseOpsz={108}
            baseSoft={55}
            className="text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-membrane"
          >
            On fait naître des{' '}
            <span className="text-gradient-plasma">organismes</span>
            {' '}numériques.
          </BreathingHeading>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-membrane/60 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
          style={{ fontFamily: 'Switzer, system-ui, sans-serif' }}
        >
          Applications mobiles, web, sites internet, intelligence conversationnelle —
          conçus comme des organismes vivants, pas comme des outils qu'on referme.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 flex-wrap">
          <AnimatePresence mode="wait">
            {!absorbed ? (
              <motion.button
                key="cta"
                onClick={handleAbsorb}
                whileHover={prefersReduced ? {} : {
                  scale: 1.04,
                  boxShadow: '0 0 40px rgba(62, 255, 192, 0.35), 0 0 80px rgba(62, 255, 192, 0.12)',
                }}
                whileTap={prefersReduced ? {} : { scale: 0.94 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  borderRadius: '50%',
                  transition: { duration: 0.45, ease: [0.36, 0, 0.66, -0.56] },
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                style={{
                  fontFamily: 'Switzer, system-ui, sans-serif',
                  borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                }}
                className="inline-flex items-center gap-3 px-9 py-4 bg-plasma text-abysse text-sm font-semibold tracking-wide transition-colors"
              >
                Initier un projet
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            ) : (
              <motion.div
                key="absorbing"
                initial={{ scale: 0, opacity: 0, borderRadius: '50%' }}
                animate={{
                  scale: [0, 1.4, 0.8, 1.6],
                  opacity: [0, 1, 0.8, 0],
                  borderRadius: '50%',
                }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                style={{
                  width: 60,
                  height: 60,
                  background: 'radial-gradient(circle, rgba(62,255,192,0.9) 0%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>

          <motion.a
            variants={fadeUp}
            href="#organs"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('organs')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="eyebrow text-membrane/40 hover:text-plasma transition-colors duration-300 underline-offset-4"
            whileHover={{ opacity: 1 }}
          >
            Explorer les organes →
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-plasma/50 to-transparent"
        />
        <span className="eyebrow text-membrane/25 text-[0.55rem]">SCROLL</span>
      </motion.div>
    </section>
  )
}
