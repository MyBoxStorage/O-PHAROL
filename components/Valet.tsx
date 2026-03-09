'use client'

import { motion } from 'framer-motion'

const CarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
    <rect x="5" y="17" width="14" height="2" rx="1"/>
    <path d="M5 7l1.5-4h11L19 7"/>
    <circle cx="7.5" cy="19" r="1.5"/>
    <circle cx="16.5" cy="19" r="1.5"/>
  </svg>
)

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="M21 2L13 10"/>
    <path d="M16 6l-1.5 1.5"/>
    <path d="M21 2l-2 2"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

const ClockOutlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
)

export default function Valet() {
  return (
    <section
      style={{
        background: 'var(--navy-mid)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Decorative diagonal overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 50%, rgba(201,168,76,0.02) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'center',
          padding: '48px 0',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}>

          {/* Left: texto */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52,
                border: '1px solid rgba(201,168,76,0.35)',
                background: 'rgba(201,168,76,0.07)',
                display: 'grid', placeItems: 'center',
                color: 'var(--gold)', flexShrink: 0,
              }}>
                <CarIcon />
              </div>
              <div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', fontFamily: 'var(--font-montserrat), sans-serif', marginBottom: 3 }}>Conveniência Premium</div>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.45rem', color: 'var(--white)', lineHeight: 1.1 }}>Valet Parking <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>disponível</em></div>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.08rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: '0 0 20px', maxWidth: 480 }}>
              Chegue com tranquilidade. Nossa equipe cuida do seu veículo enquanto você aprecia cada momento da experiência O Pharol.
            </p>

            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { Icon: ShieldIcon, label: 'Veículo segurado durante a visita' },
                { Icon: ClockOutlineIcon, label: 'Disponível em todos os horários' },
                { Icon: KeyIcon, label: 'Entrega rápida na saída' },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--gold)', opacity: 0.8 }}><Icon /></span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-montserrat), sans-serif' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: placa decorativa */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ flexShrink: 0 }}
          >
            <div style={{
              border: '2px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.04)',
              padding: '28px 36px',
              textAlign: 'center',
              position: 'relative',
            }}>
              {/* Corner accents */}
              {[{ top: 6, left: 6 }, { top: 6, right: 6 }, { bottom: 6, left: 6 }, { bottom: 6, right: 6 }].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', width: 10, height: 10, border: '1px solid var(--gold)', opacity: 0.4, ...pos }} />
              ))}

              <div style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '3.2rem', color: 'var(--gold)', lineHeight: 1, marginBottom: 4 }}>Valet</div>
              <div style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Serviço Exclusivo</div>
              <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)', margin: '0 auto 14px' }} />
              <div style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>Av. Atlântica, 2554</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
