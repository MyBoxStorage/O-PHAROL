'use client'

import { motion } from 'framer-motion'

/* ── Ícones SVG temáticos ── */
const LobsterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 3C8 3 5 6 5 10c0 3 2 5.5 5 6.5V20h4v-3.5c3-1 5-3.5 5-6.5 0-4-3-7-7-7z" />
    <path d="M9 6c-2-1-4 0-4 2" />
    <path d="M15 6c2-1 4 0 4 2" />
    <path d="M7 15c-2 1-3 3-2 5" />
    <path d="M17 15c2 1 3 3 2 5" />
  </svg>
)

const WaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2 12c1.5-3 3-4.5 6-4.5S11.5 9 15 9s4.5-1.5 6-4.5" />
    <path d="M2 18c1.5-3 3-4.5 6-4.5S11.5 15 15 15s4.5-1.5 6-4.5" />
  </svg>
)

const MusicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const features = [
  { Icon: LobsterIcon, label: 'Frutos do Mar', desc: 'Ingredientes frescos, selecionados diariamente' },
  { Icon: WaveIcon,    label: 'Vista para o Mar', desc: 'Varanda privilegiada na Av. Atlântica' },
  { Icon: MusicIcon,   label: 'Música ao Vivo', desc: 'Ambiente sofisticado e acolhedor' },
  { Icon: AwardIcon,   label: "Travellers' Choice", desc: 'Top 10% Tripadvisor — +1.400 avaliações' },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle dot pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%231B2B6B'/%3E%3C/svg%3E\")", pointerEvents: 'none' }} />

      <div className="container about-grid" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── VIDEO COLUMN ── */}
        <motion.div
          className="about-video-wrap"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Offset decorative frame */}
          <div style={{ position: 'absolute', top: -20, left: -20, right: 20, bottom: 20, border: '1px solid rgba(201,168,76,0.22)', zIndex: 0, pointerEvents: 'none' }} />

          {/* Video container */}
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', zIndex: 1, boxShadow: '-8px 16px 64px rgba(13,24,56,0.2)' }}>
            <video autoPlay muted loop playsInline
              src="https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,24,56,0.28) 0%, transparent 55%)', pointerEvents: 'none' }} />
          </div>

          {/* Corner marks */}
          {([
            { top: -20, left: -20 },
            { top: -20, right: -20 },
            { bottom: 20, left: -20 },
            { bottom: 20, right: -20 },
          ] as React.CSSProperties[]).map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', width: 18, height: 18, zIndex: 2,
              borderTop: i < 2 ? '2px solid var(--gold)' : undefined,
              borderBottom: i >= 2 ? '2px solid var(--gold)' : undefined,
              borderLeft: i % 2 === 0 ? '2px solid var(--gold)' : undefined,
              borderRight: i % 2 === 1 ? '2px solid var(--gold)' : undefined,
              ...pos,
            }} />
          ))}

          {/* Badge 38 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 180 }}
            style={{
              position: 'absolute', bottom: -24, right: -24, zIndex: 3,
              background: 'var(--navy)',
              padding: '22px 26px',
              boxShadow: '0 20px 56px rgba(13,24,56,0.5), inset 0 0 0 1px rgba(201,168,76,0.2)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontWeight: 900, fontSize: '2.8rem', lineHeight: 1 }}>38</div>
            <div style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>Anos</div>
          </motion.div>
        </motion.div>

        {/* ── TEXT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '2.8rem', color: 'var(--gold)', display: 'block', lineHeight: 1.1 }}
          >
            O Pharol
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
            style={{ margin: '6px 0 0', fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)', color: 'var(--navy)', lineHeight: 1.1, fontWeight: 400 }}
          >
            Uma experiência{' '}
            <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>única</em>{' '}
            à beira-mar
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ width: 52, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', margin: '20px 0 22px', transformOrigin: 'left' }}
          />

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.32 }}
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.16rem', lineHeight: 1.9, color: 'var(--text-mid)', marginBottom: 12 }}>
            Situado no coração da Avenida Atlântica, O Pharol ilumina o cenário gastronômico de Balneário Camboriú desde 1986. Como um farol que guia os navegantes ao porto seguro, nosso restaurante conduz cada hóspede a uma jornada inesquecível.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.38 }}
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.16rem', lineHeight: 1.9, color: 'var(--text-mid)', marginBottom: 32 }}>
            Especialistas em frutos do mar frescos, combinamos a riqueza do oceano com técnicas clássicas da culinária brasileira litorânea, criando pratos que contam a história de nossa terra e do nosso mar.
          </motion.p>

          {/* Features */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 36 }}>
            {features.map(({ Icon, label, desc }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.03)' }}
                style={{ display: 'flex', gap: 12, padding: '14px 16px', border: '1px solid rgba(201,168,76,0.14)', transition: 'all 0.3s', cursor: 'default' }}
              >
                <div style={{ width: 34, height: 34, flexShrink: 0, display: 'grid', placeItems: 'center', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
                  <Icon />
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 700, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--text-mid)', fontSize: '0.94rem', lineHeight: 1.4 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a href="#menu"
            whileHover={{ gap: '16px' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(27,43,107,0.5)', color: 'var(--navy)', padding: '13px 28px', fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)' }}
          >
            Explorar o Cardápio
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
