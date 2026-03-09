'use client'

import { useCounter } from '@/hooks/useCounter'

export default function Credentials() {
  const years = useCounter(38)
  const reviews = useCounter(1400)

  const textStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
  }

  const strongStyle: React.CSSProperties = {
    display: 'block',
    color: 'var(--gold)',
    fontFamily: 'var(--font-playfair), serif',
    fontSize: '0.95rem',
  }

  return (
    <section id="credentials" style={{ background: 'var(--navy-deep)', padding: '22px 40px', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="credentials-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={years.ref as React.RefObject<HTMLDivElement>} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ color: 'var(--gold)' }}>★</span>
          <div style={textStyle}><strong style={strongStyle}>{years.count} anos</strong>Tradição em frutos do mar</div>
        </div>

        <div ref={reviews.ref as React.RefObject<HTMLDivElement>} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ color: 'var(--gold)' }}>🏆</span>
          <div>
            <div style={{ display: 'flex', gap: 2, color: 'var(--gold)' }}>★★★★★</div>
            <div style={textStyle}><strong style={strongStyle}>+{reviews.count.toLocaleString('pt-BR')} avaliações</strong>Tripadvisor</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: 'var(--gold)' }}>👥</span><div style={textStyle}><strong style={strongStyle}>+500 lugares</strong>Um dos maiores da orla</div></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: 'var(--gold)' }}>🕐</span><div style={textStyle}><strong style={strongStyle}>Todos os dias</strong>11h30 — 00h30</div></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: 'var(--gold)' }}>📍</span><div style={textStyle}><strong style={strongStyle}>Av. Atlântica, 2554</strong>Balneário Camboriú — SC</div></div>
      </div>
    </section>
  )
}
