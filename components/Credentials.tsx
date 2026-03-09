'use client'

import { motion } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'

/* ── Ícones SVG inline para cada credencial ── */
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4" />
    <path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
    <path d="M6 3h12v6a6 6 0 0 1-12 0V3z" />
  </svg>
)

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export default function Credentials() {
  const years    = useCounter(38)
  const reviews  = useCounter(1400)
  const capacity = useCounter(500)

  const items = [
    { ref: years.ref,    Icon: StarIcon,   big: `${years.count}`,   unit: 'anos',         sub: 'Tradição em frutos do mar' },
    { ref: reviews.ref,  Icon: TrophyIcon, big: `+${reviews.count.toLocaleString('pt-BR')}`, unit: 'avaliações', sub: 'Tripadvisor · Top 10%' },
    { ref: capacity.ref, Icon: UsersIcon,  big: `+${capacity.count}`, unit: 'lugares',    sub: 'Um dos maiores da orla' },
    { ref: null,         Icon: ClockIcon,  big: '11h30',             unit: '– 00h30',      sub: 'Todos os dias da semana' },
    { ref: null,         Icon: MapPinIcon, big: 'Av. Atlântica',     unit: '2554',         sub: 'Balneário Camboriú — SC' },
  ]

  return (
    <section
      id="credentials"
      style={{
        background: 'var(--navy-deep)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* shimmer sweep */}
      <motion.div
        animate={{ x: ['-100%', '220%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '25%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.035), transparent)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
        {items.map(({ ref, Icon, big, unit, sub }, i) => (
          <motion.div
            key={i}
            ref={ref as React.RefObject<HTMLDivElement> | null}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '22px 28px',
              borderRight: i < 4 ? '1px solid rgba(201,168,76,0.09)' : 'none',
              position: 'relative',
            }}
          >
            {/* Icon box */}
            <div style={{
              width: 38, height: 38, flexShrink: 0,
              display: 'grid', placeItems: 'center',
              border: '1px solid rgba(201,168,76,0.22)',
              background: 'rgba(201,168,76,0.05)',
              color: 'var(--gold)',
            }}>
              <Icon />
            </div>

            <div>
              {/* Value */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, lineHeight: 1 }}>
                <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)' }}>
                  {big}
                </span>
                <span style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.58rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {unit}
                </span>
              </div>
              {/* Label */}
              <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.36)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4, fontFamily: 'var(--font-montserrat), sans-serif' }}>
                {sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
