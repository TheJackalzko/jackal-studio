'use client'

import { motion, useReducedMotion } from 'framer-motion'

const LINKS = [
  { label: 'Mentions légales', href: '#' },
  { label: 'admin@studiojackal.com', href: 'mailto:admin@studiojackal.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Footer() {
  const prefersReduced = useReducedMotion()

  return (
    <footer
      id="footer"
      data-section="footer"
      className="relative py-20 px-6 md:px-12"
      style={{ background: '#0A0F0D' }}
    >
      {/* Final pulse — last heartbeat */}
      <div className="flex justify-center mb-14">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={prefersReduced ? {} : {
              scale: [1, 1.4, 1, 1.25, 1],
              opacity: [0.4, 0.08, 0.35, 0.06, 0.4],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.215, 0.61, 0.355, 1],
              times: [0, 0.14, 0.28, 0.42, 1],
            }}
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(62, 255, 192, 0.7) 0%, transparent 70%)',
            }}
          />
          <motion.div
            animate={prefersReduced ? {} : {
              scale: [1, 1.2, 1, 1.12, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.215, 0.61, 0.355, 1],
              times: [0, 0.14, 0.28, 0.42, 1],
            }}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#3EFFC0',
              boxShadow: '0 0 20px rgba(62, 255, 192, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Logo / studio name */}
      <div className="text-center mb-12">
        <p
          className="font-fraunces text-membrane/20 text-xs tracking-[0.3em] uppercase mb-2"
          style={{ fontVariationSettings: `'wght' 300, 'SOFT' 20, 'opsz' 12` }}
        >
          Jackal Studio
        </p>
        <p
          className="text-membrane/12 text-[0.55rem] tracking-[0.25em]"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          LABORATOIRE NUMÉRIQUE — MÂCON
        </p>
      </div>

      {/* Links */}
      <nav aria-label="Liens footer">
        <ul className="flex flex-wrap items-center justify-center gap-8">
          {LINKS.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <a
                href={link.href}
                className="text-membrane/25 text-xs tracking-wider hover:text-plasma transition-colors duration-300"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Year */}
      <div className="mt-10 text-center">
        <p
          className="text-membrane/10 text-[0.55rem] tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          © {new Date().getFullYear()} JACKAL STUDIO — TOUS DROITS RÉSERVÉS
        </p>
      </div>
    </footer>
  )
}
