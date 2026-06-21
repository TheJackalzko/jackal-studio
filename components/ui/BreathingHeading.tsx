'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  baseWeight?: number
  baseOpsz?: number
  baseSoft?: number
}

export default function BreathingHeading({
  children,
  className = '',
  as: Tag = 'h2',
  baseWeight = 400,
  baseOpsz = 72,
  baseSoft = 40,
}: Props) {
  const prefersReduced = useReducedMotion()
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)
  const elRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReduced || !elRef.current) return

    const el = elRef.current
    const PERIOD = 4000 // ms

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const t = (now - startRef.current) / PERIOD
      // Non-linear breathing: slow exhale, brief pause, quicker inhale
      const phase = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2

      const wght = baseWeight + phase * 160
      const soft = baseSoft + phase * 38
      const opsz = baseOpsz + phase * 16

      el.style.fontVariationSettings = `'wght' ${wght.toFixed(1)}, 'SOFT' ${soft.toFixed(1)}, 'opsz' ${opsz.toFixed(1)}`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [prefersReduced, baseWeight, baseOpsz, baseSoft])

  return (
    <Tag
      ref={elRef as React.RefObject<HTMLHeadingElement>}
      className={`font-fraunces ${className}`}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}, 'SOFT' ${baseSoft}, 'opsz' ${baseOpsz}`,
        willChange: 'font-variation-settings',
      }}
    >
      {children}
    </Tag>
  )
}
