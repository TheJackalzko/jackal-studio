'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import BreathingHeading from '@/components/ui/BreathingHeading'
import MembraneDivider from '@/components/ui/MembraneDivider'

type OrganType = 'mobile' | 'web' | 'site' | 'ia' | null

interface OrganOption {
  id: OrganType
  label: string
  name: string
  color: string
  radius: string
}

const ORGAN_OPTIONS: OrganOption[] = [
  {
    id: 'mobile',
    label: 'Système Nerveux',
    name: 'App Mobile',
    color: '#3EFFC0',
    radius: '55% 45% 60% 40% / 45% 55% 50% 50%',
  },
  {
    id: 'web',
    label: 'Le Cœur',
    name: 'App Web',
    color: '#FF7A68',
    radius: '45% 55% 40% 60% / 60% 40% 55% 45%',
  },
  {
    id: 'site',
    label: 'La Peau',
    name: 'Site Internet',
    color: '#F2EDE3',
    radius: '60% 40% 55% 45% / 50% 60% 40% 50%',
  },
  {
    id: 'ia',
    label: 'Le Cerveau',
    name: 'Chatbot IA',
    color: '#8B5CF6',
    radius: '40% 60% 45% 55% / 55% 45% 60% 40%',
  },
]

export default function Contact() {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganType>(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  const activeOrgan = ORGAN_OPTIONS.find(o => o.id === selectedOrgan)

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
    >
      <MembraneDivider fromDark={true} />

      <div className="section-membrane py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <p
              className="eyebrow text-encre/35 mb-6"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              INITIER UN ORGANISME
            </p>

            <BreathingHeading
              as="h2"
              baseWeight={300}
              baseOpsz={72}
              baseSoft={30}
              className="text-[clamp(2.2rem,5vw,4rem)] leading-tight text-encre"
            >
              Parlez-nous de votre{' '}
              <span className="text-gradient-tissu">futur organisme.</span>
            </BreathingHeading>

            <p
              className="text-encre/55 mt-6 text-lg max-w-xl leading-relaxed"
              style={{ fontFamily: 'Switzer, sans-serif' }}
            >
              Pas de formulaire de qualification en 12 étapes. Décrivez-nous le problème, on revient dans les 48h.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full mb-8 flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 122, 104, 0.4) 0%, transparent 70%)',
                    border: '1px solid rgba(255, 122, 104, 0.4)',
                  }}
                >
                  <span style={{ color: '#FF7A68', fontSize: 24 }}>✓</span>
                </motion.div>
                <h3
                  className="font-fraunces text-3xl text-encre mb-4"
                  style={{ fontVariationSettings: `'wght' 400, 'SOFT' 40, 'opsz' 48` }}
                >
                  Message reçu.
                </h3>
                <p className="text-encre/55" style={{ fontFamily: 'Switzer, sans-serif' }}>
                  On revient vers vous dans les 48h. L'organisme se prépare à naître.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                {/* Organ selector */}
                <div>
                  <label
                    className="eyebrow text-encre/45 block mb-4"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    QUEL ORGANE VOUS MANQUE ?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ORGAN_OPTIONS.map((opt) => {
                      const selected = selectedOrgan === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOrgan(selected ? null : opt.id)}
                          className="p-4 text-left transition-all duration-300"
                          style={{
                            borderRadius: opt.radius,
                            border: `1.5px solid ${selected ? opt.color : opt.color + '35'}`,
                            background: selected ? `${opt.color}15` : 'transparent',
                            boxShadow: selected
                              ? `0 0 20px ${opt.color}25`
                              : 'none',
                          }}
                        >
                          <p
                            className="text-[0.58rem] tracking-widest uppercase mb-1"
                            style={{
                              color: opt.color,
                              opacity: selected ? 0.8 : 0.45,
                              fontFamily: 'var(--font-jetbrains), monospace',
                            }}
                          >
                            {opt.label}
                          </p>
                          <p
                            className="text-sm font-medium"
                            style={{
                              color: selected ? opt.color : '#14201C',
                              fontFamily: 'Switzer, sans-serif',
                            }}
                          >
                            {opt.name}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name + email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { field: 'name', label: 'VOTRE NOM', type: 'text', placeholder: 'Alice Martin' },
                    { field: 'email', label: 'E-MAIL', type: 'email', placeholder: 'alice@entreprise.fr' },
                  ].map(({ field, label, type, placeholder }) => (
                    <div key={field}>
                      <label
                        className="eyebrow text-encre/40 block mb-3"
                        style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[field as 'name' | 'email']}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [field]: e.target.value }))
                        }
                        className="w-full px-5 py-4 bg-transparent border-b border-encre/20 text-encre placeholder-encre/30 focus:border-tissu focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'Switzer, sans-serif' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="eyebrow text-encre/40 block mb-3"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    LE PROBLÈME À RÉSOUDRE
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Décrivez votre besoin, votre contexte, vos contraintes..."
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-5 py-4 bg-transparent border border-encre/15 text-encre placeholder-encre/30 focus:border-tissu focus:outline-none transition-colors duration-300 resize-none"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      borderRadius: '20px 30px 25px 20px / 25px 20px 30px 25px',
                    }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-6">
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.04,
                      boxShadow: '0 0 30px rgba(255, 122, 104, 0.3), 0 0 60px rgba(255, 122, 104, 0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="inline-flex items-center gap-3 px-9 py-4 bg-tissu text-abysse text-sm font-semibold tracking-wide"
                    style={{
                      borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                      fontFamily: 'Switzer, sans-serif',
                    }}
                  >
                    Faire naître l'organisme
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>

                  <p
                    className="text-encre/40 text-xs"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    RÉPONSE SOUS 48H
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <MembraneDivider fromDark={false} flip={true} />
    </section>
  )
}
