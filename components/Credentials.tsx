'use client'

import { motion } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'

export default function Credentials() {
  const years = useCounter(38)
  const reviews = useCounter(1400)
  const capacity = useCounter(500)

  const items = [
    {
      ref: years.ref,
      icon: '✦',
      value: `${years.count}`,
      suffix: 'anos',
      label: 'Tradição em frutos do mar',
    },
    {
      ref: reviews.ref,
      icon: '★★★★★',
      value: `+${reviews.count.toLocaleString('pt-BR')}`,
      suffix: 'avaliações',
      label: 'Tripadvisor · Top 10%',
    },
    {
      ref: capacity.ref,
      icon: '◈',
      value: `+${capacity.count}`,
      suffix: 'lugares',
      label: 'Um dos maiores da orla',
    },
    {
      ref: null,
      icon: '◷',
      value: '11h30',
      suffix: '— 00h30',
      label: 'Todos os dias da semana',
    },
    {
      ref: null,
      icon: '◎',
      value: 'Av. Atlântica',
      suffix: '2554',
      label: 'Balneário Camboriú — SC',
    },
  ]

  return (
    <section
      id="credentials"
      style={{
        background: 'var(--navy-deep)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle shimmer line */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.04), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="credentials-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            ref={item.ref as React.RefObject<HTMLDivElement> | null}
            className="cred-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                flexShrink: 0,
                fontSize: '0.7rem',
                color: 'var(--gold)',
                letterSpacing: '0.05em',
              }}
            >
              {item.icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.suffix}
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: 3,
                }}
              >
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
