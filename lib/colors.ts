export const palette = {
  abysse: '#0A0F0D',
  membrane: '#F2EDE3',
  plasma: '#3EFFC0',
  tissu: '#FF7A68',
  synapse: '#8B5CF6',
  encre: '#14201C',
} as const

export type ColorName = keyof typeof palette

export type RGB = [number, number, number]

export const rgbPalette: Record<ColorName, RGB> = {
  abysse: [10, 15, 13],
  membrane: [242, 237, 227],
  plasma: [62, 255, 192],
  tissu: [255, 122, 104],
  synapse: [139, 92, 246],
  encre: [20, 32, 28],
}

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [0, 0, 0]
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

export function lerpColor(a: RGB, b: RGB, t: number): RGB {
  const ct = Math.max(0, Math.min(1, t))
  return [
    Math.round(a[0] + (b[0] - a[0]) * ct),
    Math.round(a[1] + (b[1] - a[1]) * ct),
    Math.round(a[2] + (b[2] - a[2]) * ct),
  ]
}

export function rgbToString(rgb: RGB): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

export function rgbToHex(rgb: RGB): string {
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('')
}

export const SECTION_COLORS: Record<string, RGB> = {
  hero: rgbPalette.plasma,
  manifesto: rgbPalette.plasma,
  organs: rgbPalette.plasma,
  'organs-cerveau': rgbPalette.synapse,
  lifecycle: rgbPalette.plasma,
  'dna-stack': rgbPalette.plasma,
  projects: rgbPalette.plasma,
  contact: rgbPalette.tissu,
  footer: rgbPalette.plasma,
}
