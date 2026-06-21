'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const rawX = useRef(-200)
  const rawY = useRef(-200)

  const x = useSpring(-200, { stiffness: 520, damping: 38, mass: 0.6 })
  const y = useSpring(-200, { stiffness: 520, damping: 38, mass: 0.6 })

  // Slower trailing ring
  const rx = useSpring(-200, { stiffness: 140, damping: 28, mass: 1 })
  const ry = useSpring(-200, { stiffness: 140, damping: 28, mass: 1 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.current = e.clientX
      rawY.current = e.clientY
      x.set(e.clientX)
      y.set(e.clientY)
      rx.set(e.clientX)
      ry.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      setHovering(isInteractive)
    }

    const handleDown = () => setClicking(true)
    const handleUp = () => setClicking(false)

    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('mouseup', handleUp)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [visible, x, y, rx, ry])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Outer ring — slow trailing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hovering ? 0.5 : 0.22, scale: hovering ? 2.2 : 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              left: rx,
              top: ry,
              translateX: '-50%',
              translateY: '-50%',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgb(var(--cytoplasm-r), var(--cytoplasm-g), var(--cytoplasm-b))',
              pointerEvents: 'none',
              zIndex: 9998,
              mixBlendMode: 'screen',
            }}
          />

          {/* Inner dot — fast, crisp */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: clicking ? 0.5 : hovering ? 1.6 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: x,
              top: y,
              translateX: '-50%',
              translateY: '-50%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: `rgb(var(--cytoplasm-r, 62), var(--cytoplasm-g, 255), var(--cytoplasm-b, 192))`,
              pointerEvents: 'none',
              zIndex: 9999,
              mixBlendMode: 'screen',
              boxShadow: `0 0 12px 4px rgba(var(--cytoplasm-r, 62), var(--cytoplasm-g, 255), var(--cytoplasm-b, 192), 0.6)`,
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
