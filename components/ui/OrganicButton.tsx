'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef } from 'react'

type Variant = 'plasma' | 'tissu' | 'ghost' | 'synapse'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
  href?: string
  onAbsorb?: () => void
}

const VARIANT_STYLES: Record<Variant, string> = {
  plasma:
    'bg-plasma text-abysse hover:bg-opacity-90',
  tissu:
    'bg-tissu text-abysse hover:bg-opacity-90',
  ghost:
    'bg-transparent border border-plasma/40 text-plasma hover:border-plasma hover:bg-plasma/8',
  synapse:
    'bg-synapse text-membrane hover:bg-opacity-90',
}

const VARIANT_SHADOW: Record<Variant, string> = {
  plasma: '0 0 24px rgba(62, 255, 192, 0.3), 0 0 60px rgba(62, 255, 192, 0.1)',
  tissu: '0 0 24px rgba(255, 122, 104, 0.3), 0 0 60px rgba(255, 122, 104, 0.1)',
  ghost: '0 0 24px rgba(62, 255, 192, 0.15)',
  synapse: '0 0 24px rgba(139, 92, 246, 0.35), 0 0 60px rgba(139, 92, 246, 0.15)',
}

const OrganicButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'plasma', children, className = '', onAbsorb, ...props }, ref) => {
    const prefersReduced = useReducedMotion()

    return (
      <motion.button
        ref={ref}
        whileHover={prefersReduced ? {} : {
          scale: 1.04,
          boxShadow: VARIANT_SHADOW[variant],
          borderRadius: '45% 55% 50% 50% / 55% 45% 55% 45%',
        }}
        whileTap={prefersReduced ? {} : {
          scale: 0.94,
          borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={(e) => {
          if (onAbsorb) {
            e.preventDefault()
            onAbsorb()
          }
          if (props.onClick) props.onClick(e as React.MouseEvent<HTMLButtonElement>)
        }}
        className={`
          inline-flex items-center gap-3 px-8 py-4
          font-switzer text-sm font-semibold tracking-wide
          transition-colors duration-200
          radius-organic-1
          ${VARIANT_STYLES[variant]}
          ${className}
        `}
        style={{
          fontFamily: 'Switzer, system-ui, sans-serif',
        }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    )
  }
)

OrganicButton.displayName = 'OrganicButton'
export default OrganicButton
