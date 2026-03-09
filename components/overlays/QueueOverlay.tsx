'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type QueueOverlayProps = {
  open: boolean
  onClose: () => void
}

export default function QueueOverlay({ open, onClose }: QueueOverlayProps) {
  const [screen, setScreen] = useState<'join' | 'status'>('join')
  const [ahead, setAhead] = useState(3)
  const [number, setNumber] = useState(7)

  useEffect(() => {
    if (screen !== 'status') return
    const interval = setInterval(() => {
      setAhead((prev) => (prev > 0 ? prev - 1 : 0))
    }, 15000)
    return () => clearInterval(interval)
  }, [screen])

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5 }} style={{ background: 'var(--navy-deep)', color: 'white', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '20px 24px', borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'var(--navy-deep)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem' }}>Fila Virtual — O Pharol</div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 820, paddingBlock: 40 }}>
            {screen === 'join' ? (
              <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Fila Virtual</span>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', marginTop: 0 }}>Entre na fila</h2>
                <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)' }}>Reserve seu lugar sem esperar na porta. Você receberá aviso quando sua mesa estiver pronta.</p>
                <div style={{ display: 'grid', gap: 14, marginBottom: 22 }}>
                  <input placeholder="Seu nome" style={inputStyle} />
                  <input placeholder="(47) 99999-9999" style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                    {['1', '2', '3', '4', '5', '6', '7', '8+'].map((p) => (
                      <button key={p} style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '8px 10px', cursor: 'pointer' }}>{p}</button>
                    ))}
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => { setNumber(Math.floor(Math.random() * 5) + 5); setAhead(Math.floor(Math.random() * 4) + 1); setScreen('status') }}>
                  Entrar na Fila
                </button>
              </div>
            ) : (
              <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Sua Posição na Fila</span>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)', padding: 30, marginTop: 16 }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '5rem', lineHeight: 1 }}>{number}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)' }}>Seu número</div>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '3rem', marginTop: 18 }}>{ahead > 0 ? ahead : '🎉'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)' }}>grupos à sua frente</div>
                  <div style={{ marginTop: 10 }}>Tempo estimado: <strong style={{ color: 'var(--gold)' }}>~25 minutos</strong></div>
                  <div style={{ marginTop: 14, height: 8, background: 'rgba(255,255,255,0.2)' }}>
                    <motion.div style={{ height: '100%', background: 'var(--gold)' }} animate={{ width: ['10%', '85%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
                  </div>
                </div>
                <button className="btn-secondary" style={{ width: '100%', marginTop: 14 }} onClick={() => setScreen('join')}>Sair da fila</button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
