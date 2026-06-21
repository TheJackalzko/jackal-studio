'use client'

import { useEffect, useRef, useCallback } from 'react'
import { smoothNoise, lerp } from '@/lib/noise'
import { lerpColor, SECTION_COLORS, type RGB } from '@/lib/colors'

interface Blob {
  // Position as fraction of canvas (0..1)
  fx: number
  fy: number
  // Pixel positions (computed)
  x: number
  y: number
  // Base radius as fraction of min(W, H)
  rFactor: number
  r: number
  // Noise offsets for unique drift per blob
  noiseOx: number
  noiseOy: number
  // How much this blob responds to cursor (0..1)
  cursorAffinity: number
  // Color (RGB)
  color: RGB
}

const BLOB_DEFS: Array<Omit<Blob, 'x' | 'y' | 'r' | 'color'>> = [
  { fx: 0.35, fy: 0.40, rFactor: 0.21, noiseOx: 0,  noiseOy: 10, cursorAffinity: 0.92 },
  { fx: 0.68, fy: 0.50, rFactor: 0.17, noiseOx: 20, noiseOy: 3,  cursorAffinity: 0.28 },
  { fx: 0.50, fy: 0.68, rFactor: 0.23, noiseOx: 5,  noiseOy: 18, cursorAffinity: 0.10 },
  { fx: 0.14, fy: 0.72, rFactor: 0.14, noiseOx: 14, noiseOy: 7,  cursorAffinity: 0.05 },
  { fx: 0.82, fy: 0.28, rFactor: 0.16, noiseOx: 8,  noiseOy: 22, cursorAffinity: 0.05 },
  { fx: 0.58, fy: 0.15, rFactor: 0.11, noiseOx: 25, noiseOy: 9,  cursorAffinity: 0.04 },
]

const NOISE_SPEED = 0.00028
const SCROLL_DECAY = 0.88
const COLOR_LERP_SPEED = 0.025

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

export default function CytoplasmCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<Blob[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const scrollVelRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)
  const currentColorRef = useRef<RGB>([62, 255, 192])
  const targetColorRef = useRef<RGB>([62, 255, 192])
  const prefersReducedRef = useRef(false)

  const initBlobs = useCallback((W: number, H: number) => {
    const mobile = isMobile()
    const count = mobile ? 3 : BLOB_DEFS.length
    const minDim = Math.min(W, H)

    blobsRef.current = BLOB_DEFS.slice(0, count).map((def, i) => ({
      ...def,
      x: def.fx * W,
      y: def.fy * H,
      r: def.rFactor * minDim,
      color: [62, 255, 192] as RGB,
    }))

    blobsRef.current.forEach((b, i) => {
      b.color = i === 0
        ? [62, 255, 192]
        : i === 1
        ? [62, 200, 255]
        : [62, 255, 192]
    })
  }, [])

  const draw = useCallback((W: number, H: number, t: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, W, H)

    const blobs = blobsRef.current
    const mouse = mouseRef.current
    const mobile = isMobile()

    // Lerp current color toward target
    currentColorRef.current = lerpColor(
      currentColorRef.current,
      targetColorRef.current,
      COLOR_LERP_SPEED
    )
    const [cr, cg, cb] = currentColorRef.current

    // Update CSS variable for other components to read
    document.documentElement.style.setProperty('--cytoplasm-r', String(cr))
    document.documentElement.style.setProperty('--cytoplasm-g', String(cg))
    document.documentElement.style.setProperty('--cytoplasm-b', String(cb))

    // Scroll velocity stretch factor
    const velFactor = mobile ? 0 : scrollVelRef.current * 0.0015
    scrollVelRef.current *= SCROLL_DECAY

    blobs.forEach((blob) => {
      const noise = smoothNoise(t * NOISE_SPEED, blob.noiseOx, blob.noiseOy)

      // Base drift (noise amplitude ~12% of min dim)
      const driftAmp = Math.min(W, H) * 0.12
      const noiseX = noise.x * driftAmp
      const noiseY = noise.y * driftAmp

      // Cursor attraction for the primary blob
      let targetX = blob.fx * W + noiseX
      let targetY = blob.fy * H + noiseY

      if (blob.cursorAffinity > 0.5 && mouse.x > -999) {
        const dx = mouse.x - targetX
        const dy = mouse.y - targetY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = W * 0.45
        if (dist < maxDist) {
          const pull = blob.cursorAffinity * (1 - dist / maxDist)
          targetX += dx * pull * 0.35
          targetY += dy * pull * 0.35
        }
      }

      // Smooth position with lerp (spring-like)
      blob.x = lerp(blob.x, targetX, 0.04)
      blob.y = lerp(blob.y, targetY, 0.04)

      // Stretch in scroll direction (squash and stretch)
      const stretchY = 1 + Math.abs(velFactor) * 0.6
      const stretchX = 1 / Math.max(stretchY, 0.5)
      const rx = blob.r * stretchX
      const ry = blob.r * stretchY

      // Color from current cytoplasm color
      const alpha = 0.85
      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, Math.max(rx, ry)
      )
      gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${alpha})`)
      gradient.addColorStop(0.55, `rgba(${Math.round(cr * 0.7)}, ${Math.round(cg * 0.7)}, ${Math.round(cb * 0.9)}, ${alpha * 0.6})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`)

      ctx.save()
      ctx.translate(blob.x, blob.y)
      ctx.scale(stretchX, stretchY)
      ctx.translate(-blob.x, -blob.y)

      ctx.beginPath()
      ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    })
  }, [])

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H
    initBlobs(W, H)

    const handleResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      initBlobs(W, H)
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current
      scrollVelRef.current = delta
      lastScrollYRef.current = currentY

      // Determine active section for color
      const sections = document.querySelectorAll('[data-section]')
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= H * 0.4 && rect.bottom >= H * 0.4) {
          const sectionId = el.getAttribute('data-section') || 'hero'
          const color = SECTION_COLORS[sectionId] || SECTION_COLORS.hero
          targetColorRef.current = color
        }
      })
    }

    // IntersectionObserver for section color changes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section') || 'hero'
            const color = SECTION_COLORS[sectionId] || SECTION_COLORS.hero
            targetColorRef.current = color
          }
        })
      },
      { threshold: 0.35 }
    )

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    let lastTime = 0
    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime
      lastTime = timestamp

      if (!prefersReducedRef.current) {
        timeRef.current += delta
        draw(W, H, timeRef.current)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [initBlobs, draw])

  return (
    /* Goo wrapper: the CSS filter creates the organic merge between blobs */
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: '#000000',
        filter: 'blur(36px) contrast(22)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
