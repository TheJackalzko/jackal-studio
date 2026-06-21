// Layered sine-based smooth noise for organic blob movement
// Produces natural-looking drift without a full Perlin implementation

export function smoothNoise(t: number, ox: number, oy: number): { x: number; y: number } {
  const x =
    Math.sin(t * 0.31 + ox) * 0.42 +
    Math.sin(t * 0.73 + ox * 1.37 + oy * 0.21) * 0.31 +
    Math.sin(t * 0.19 + oy * 0.83) * 0.27

  const y =
    Math.cos(t * 0.41 + oy) * 0.42 +
    Math.cos(t * 0.53 + ox * 0.91 + oy * 1.13) * 0.31 +
    Math.cos(t * 0.27 + oy * 1.27 + ox * 0.44) * 0.27

  return { x, y }
}

// Easing for scroll velocity spring
export function easeOutSpring(t: number): number {
  const c4 = (2 * Math.PI) / 3
  if (t === 0) return 0
  if (t === 1) return 1
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

// Map a value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

// Lerp with clamping
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}
